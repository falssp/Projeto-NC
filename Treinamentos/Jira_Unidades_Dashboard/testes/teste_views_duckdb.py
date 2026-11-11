"""
Valida a lógica das views SQL (simples e multi-nível) contra exemplos/resultados_esperados.csv.
Uso:  pip install duckdb  &&  python3 teste_views_duckdb.py
Obs.: roda em DuckDB (não BigQuery); a lógica SQL é a mesma das views em ../sql/.
NÃO incluir dado com ciclo de parentesco: a recursão não termina (testado, travou).
"""
import csv, os, duckdb

AQUI = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(AQUI, "..", "exemplos")

con = duckdb.connect()
con.execute(f"""CREATE TABLE base AS
  SELECT issue_key, NULLIF(parent_key,'') AS parent_key, TRY_CAST(NULLIF(unidades,'') AS DOUBLE) AS unidades
  FROM read_csv('{os.path.join(EX, "dados_teste.csv")}', header=true, all_varchar=true)""")

SIMPLES = """
WITH soma_filhos AS (
  SELECT parent_key, SUM(unidades) AS uf FROM base
  WHERE parent_key IS NOT NULL AND unidades IS NOT NULL GROUP BY parent_key)
SELECT b.issue_key, COALESCE(b.unidades, sf.uf, 0) AS exib, b.unidades AS tot
FROM base b LEFT JOIN soma_filhos sf ON sf.parent_key = b.issue_key"""

MULTI = """
WITH RECURSIVE arvore AS (
  SELECT issue_key AS raiz, issue_key AS d FROM base
  UNION ALL
  SELECT a.raiz, b.issue_key FROM arvore a JOIN base b ON b.parent_key = a.d),
soma AS (
  SELECT a.raiz, SUM(x.unidades) AS ud FROM arvore a JOIN base x ON x.issue_key = a.d
  WHERE a.d <> a.raiz GROUP BY a.raiz)
SELECT b.issue_key, COALESCE(b.unidades, s.ud, 0) AS exib, b.unidades AS tot
FROM base b LEFT JOIN soma s ON s.raiz = b.issue_key"""

simples = {r[0]: (r[1], r[2]) for r in con.execute(SIMPLES).fetchall()}
multi = {r[0]: (r[1], r[2]) for r in con.execute(MULTI).fetchall()}

def num(x):
    return None if x in ("", None) else float(x)

erros, total = 0, 0.0
with open(os.path.join(EX, "resultados_esperados.csv"), encoding="utf-8") as f:
    for row in csv.DictReader(f):
        k = row["issue_key"]
        if k == "TOTAL":
            esperado_total = float(row["unidades_total"])
            continue
        checks = [("simples", simples[k][0], num(row["exib_view_simples"])),
                  ("multi", multi[k][0], num(row["exib_view_multinivel"])),
                  ("total", simples[k][1], num(row["unidades_total"]))]
        for nome, obtido, esperado in checks:
            if obtido != esperado:
                erros += 1
                print(f"FALHA {k} [{nome}]: obtido={obtido} esperado={esperado}")
        total += simples[k][1] or 0

if total != esperado_total:
    erros += 1
    print(f"FALHA total geral: obtido={total} esperado={esperado_total}")

print("OK: todas as verificações passaram" if erros == 0 else f"{erros} falha(s)")
raise SystemExit(1 if erros else 0)
