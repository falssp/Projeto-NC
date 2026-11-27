"""
Valida as fórmulas do Sheets (2 níveis e 3 níveis) contra exemplos/resultados_esperados.csv,
calculando-as no LibreOffice (headless). O Google Sheets deve se comportar igual; validar na 1ª vez.
Uso:  pip install openpyxl  &&  python3 teste_formulas_sheets.py     (requer 'soffice' no PATH)
"""
import csv, os, subprocess, tempfile
from openpyxl import Workbook

AQUI = os.path.dirname(os.path.abspath(__file__))
EX = os.path.join(AQUI, "..", "exemplos")

dados = []
with open(os.path.join(EX, "dados_teste.csv"), encoding="utf-8") as f:
    for r in csv.DictReader(f):
        u = r["unidades"]
        dados.append((r["issue_key"], r["parent_key"] or None, None if u == "" else float(u)))
n = len(dados) + 1  # última linha

wb = Workbook(); ws = wb.active
ws.append(["issue_key", "parent_key", "unidades", "D_exib_2niveis", "E_total", "F_avo_key", "D_exib_3niveis"])
for i, (k, p, u) in enumerate(dados, start=2):
    ws.append([k, p, u,
        f'=IF(C{i}<>"",C{i},SUMIF($B$2:$B${n},A{i},$C$2:$C${n}))',
        f'=IF(C{i}<>"",C{i},"")',
        f'=IFERROR(VLOOKUP(B{i},$A$2:$B${n},2,FALSE),"")',
        f'=IF(C{i}<>"",C{i},SUMIF($B$2:$B${n},A{i},$C$2:$C${n})+SUMIF($F$2:$F${n},A{i},$C$2:$C${n}))'])

with tempfile.TemporaryDirectory() as tmp:
    xlsx = os.path.join(tmp, "t.xlsx"); wb.save(xlsx)
    subprocess.run(["soffice", "--headless", "--convert-to", "csv", "--outdir", tmp, xlsx],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)
    with open(os.path.join(tmp, "t.csv"), encoding="utf-8") as f:
        calc = {r["issue_key"]: r for r in csv.DictReader(f)}

def num(x):
    return None if x in ("", None) else float(x)

erros, total = 0, 0.0
with open(os.path.join(EX, "resultados_esperados.csv"), encoding="utf-8") as f:
    for row in csv.DictReader(f):
        k = row["issue_key"]
        if k == "TOTAL":
            esperado_total = float(row["unidades_total"]); continue
        c = calc[k]
        # 2 níveis deve bater com a view simples; 3 níveis com a multi-nível; E com unidades_total
        for nome, obtido, esperado in (("2 niveis", num(c["D_exib_2niveis"]), num(row["exib_view_simples"])),
                                        ("3 niveis", num(c["D_exib_3niveis"]), num(row["exib_view_multinivel"])),
                                        ("total", num(c["E_total"]), num(row["unidades_total"]))):
            if obtido != esperado:
                erros += 1; print(f"FALHA {k} [{nome}]: obtido={obtido} esperado={esperado}")
        total += num(c["E_total"]) or 0

if total != esperado_total:
    erros += 1; print(f"FALHA total geral: obtido={total} esperado={esperado_total}")
print("OK: todas as verificações passaram" if erros == 0 else f"{erros} falha(s)")
raise SystemExit(1 if erros else 0)
