#!/usr/bin/env python3
"""
Gera os HTMLs da pasta a partir dos .md (fonte única).
Uso:  pip install markdown  &&  python3 gerar_html.py
"""
import os, re, markdown

AQUI = os.path.dirname(os.path.abspath(__file__))

HEAD = r"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>@@TITLE@@</title>
<style>
  :root { --bg:#0f1117; --surface:#1a1d27; --surface2:#22263a; --border:#2e3248; --accent:#5b6af0; --text:#e8eaf0; --muted:#8890aa; --green:#4ade80; --red:#f87171; --yellow:#fbbf24; --code:#12141e; }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
  header{background:linear-gradient(135deg,#1a1d27,#12141e);border-bottom:1px solid var(--border);padding:44px 24px 32px;text-align:center}
  h1{font-size:clamp(22px,4vw,34px);font-weight:800;letter-spacing:-.02em}
  h1 span{color:var(--accent)}
  .sub{color:var(--muted);margin-top:8px;font-size:14px}
  .back{display:inline-block;margin:16px 0 0;font-size:13px;color:var(--accent);text-decoration:none}
  .container{max-width:900px;margin:0 auto;padding:36px 20px 80px}
  section{margin-bottom:44px}
  h2{font-size:19px;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid var(--border)}
  h3{font-size:15px;margin:18px 0 8px;color:#aab3ff}
  p{margin-bottom:10px;font-size:14.5px}
  .note{background:var(--surface);border-left:3px solid var(--accent);padding:12px 16px;border-radius:0 8px 8px 0;font-size:14px;margin:12px 0}
  .warn{border-left-color:var(--yellow)}
  table{width:100%;border-collapse:collapse;font-size:13.5px;margin:10px 0;background:var(--surface);border-radius:8px;overflow:hidden;display:block;overflow-x:auto}
  th,td{padding:9px 12px;text-align:left;border-bottom:1px solid var(--border);white-space:nowrap}
  th{background:var(--surface2);font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}
  tr.tot td{font-weight:800;color:var(--green)}
  .ok{color:var(--green)} .bad{color:var(--red)}
  pre{background:var(--code);border:1px solid var(--border);border-radius:8px;padding:14px 16px;overflow-x:auto;font-size:12.5px;line-height:1.55;margin:10px 0}
  code{font-family:Consolas,'Courier New',monospace}
  p code,td code,li code{background:var(--code);padding:1px 6px;border-radius:4px;font-size:12.5px}
  ul.check{list-style:none}
  ul.check li{padding:6px 0;font-size:14px}
  ul.check li::before{content:"☐ ";color:var(--accent)}
  a{color:var(--accent)}
  footer{text-align:center;color:var(--muted);font-size:12px;padding:24px}
  blockquote{background:var(--surface);border-left:3px solid var(--accent);padding:4px 16px;border-radius:0 8px 8px 0;margin:12px 0}
  blockquote p{margin:8px 0}
  ul,ol{margin:0 0 12px 22px;font-size:14.5px}
  li{margin:4px 0}
  hr{border:0;border-top:1px solid var(--border);margin:24px 0}
  pre code{background:none;padding:0}
</style>
</head>
<body>
"""

HEADER = """<header>
  <h1>@@H1@@</h1>
  <p class="sub">@@SUB@@</p>
  <a class="back" href="@@BACKHREF@@">@@BACKTXT@@</a>
</header>
"""

PAGINAS = [
    dict(md="guia-unidades.md", html="index.html",
         title="Jira → Dashboard | Unidades Pai/Filho sem Duplicidade",
         h1="Jira → Dashboard: <span>Unidades Pai/Filho</span>",
         sub="Como somar sem duplicidade · BigQuery / Sheets → Looker Studio · Out/26",
         backhref="../index.html", backtxt="&larr; Voltar aos Treinamentos"),
    dict(md="passo-a-passo-jira-sheets.md", html="passo-a-passo-jira-sheets.html",
         title="Passo a passo | Jira → Sheets → Looker Studio",
         h1="Passo a passo: <span>Jira → Sheets → Looker</span>",
         sub="Extração, rollup e conexão com o Looker Studio · sem BigQuery · Out/26",
         backhref="index.html", backtxt="&larr; Voltar ao guia"),
]

def converter(md_texto):
    corpo = re.sub(r"^# .*\n", "", md_texto, count=1)
    html = markdown.markdown(corpo, extensions=["tables", "fenced_code"])
    html = html.replace("<h2>", "<section><h2>").replace("<hr />", "")
    partes = html.split("<section>")
    html = partes[0] + "".join("<section>" + p + "</section>" for p in partes[1:])
    html = html.replace("<li>[ ] ", "<li>☐ ")
    html = html.replace('href="passo-a-passo-jira-sheets.md"', 'href="passo-a-passo-jira-sheets.html"')
    return html

for p in PAGINAS:
    with open(os.path.join(AQUI, p["md"]), encoding="utf-8") as f:
        corpo = converter(f.read())
    topo = HEAD.replace("@@TITLE@@", p["title"])
    cab = (HEADER.replace("@@H1@@", p["h1"]).replace("@@SUB@@", p["sub"])
                 .replace("@@BACKHREF@@", p["backhref"]).replace("@@BACKTXT@@", p["backtxt"]))
    pagina = (topo + cab + '<div class="container">\n' + corpo + "\n</div>\n"
              "<footer>NC Tool &copy; 2026 · Unilever BR &times; Grasp</footer>\n</body>\n</html>\n")
    with open(os.path.join(AQUI, p["html"]), "w", encoding="utf-8") as f:
        f.write(pagina)
    print("gerado:", p["html"], "|", pagina.count("<section>"), "seções")
