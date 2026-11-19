"""
Detecta o xlsx mais recente de cada tipo (ADP, RM),
cria/atualiza o GitHub Release correspondente,
e escreve latest.json com download_url.
"""

import os
import json
import re
import subprocess
from pathlib import Path
from datetime import date

REPO = os.environ["GITHUB_REPOSITORY"]


def parse_adp(name):
    """UNCC_..._Merge_5_7.xlsx  →  (5, 7)"""
    m = re.search(r"Merge_(\d+)_(\d+)\.xlsx$", name, re.IGNORECASE)
    return (int(m.group(1)), int(m.group(2))) if m else None


def parse_rm(name):
    """RM_STORMX_2026_v6.1.xlsx  →  (6, 1)"""
    m = re.search(r"v(\d+)\.(\d+)\.xlsx$", name, re.IGNORECASE)
    return (int(m.group(1)), int(m.group(2))) if m else None


PARSERS = {"ADP": parse_adp, "RM": parse_rm}


def gen_index_html(year_dir, tipo_label, parse_ver):
    xlsx_files = sorted(
        [f for f in year_dir.glob("*.xlsx") if parse_ver(f.name)],
        key=lambda f: parse_ver(f.name),
        reverse=True,
    )
    if not xlsx_files:
        return
    rows = ""
    for f in xlsx_files:
        v = parse_ver(f.name)
        rows += (
            f'<li>'
            f'<a href="{f.name}" download>{f.name}</a>'
            f'<span class="ver">v{v[0]}.{v[1]}</span>'
            f"</li>\n"
        )
    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{tipo_label} — {year_dir.name}</title>
<style>
  body{{font-family:system-ui,sans-serif;max-width:640px;margin:2rem auto;padding:0 1rem}}
  h1{{font-size:1.25rem}}
  ul{{list-style:none;padding:0}}
  li{{padding:.5rem 0;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}}
  a{{text-decoration:none;color:#2563eb}}
  a:hover{{text-decoration:underline}}
  .ver{{font-size:.8em;color:#888}}
  .back{{display:inline-block;margin-bottom:1rem;font-size:.9rem;color:#666;text-decoration:none}}
</style>
</head>
<body>
<a class="back" href="../">← {tipo_label}</a>
<h1>{tipo_label} — {year_dir.name}</h1>
<ul>
{rows}</ul>
</body>
</html>"""
    (year_dir / "index.html").write_text(html, encoding="utf-8")


for tipo in ["ADP", "RM"]:
    base = Path(f"Arquivos/{tipo}")
    if not base.exists():
        continue

    parse_ver = PARSERS[tipo]
    tipo_label = "ADP StormX" if tipo == "ADP" else "RM Camphouse"

    # Pastas de ano (somente numéricas)
    year_dirs = sorted(
        [d for d in base.iterdir() if d.is_dir() and d.name.isdigit()],
        key=lambda d: int(d.name),
        reverse=True,
    )
    years = [d.name for d in year_dirs]

    # Atualiza years.json
    (base / "years.json").write_text(json.dumps(years) + "\n", encoding="utf-8")

    # Encontra o xlsx mais recente
    best = None
    best_ver = (-1, -1)
    best_year = -1

    for year_dir in year_dirs:
        for f in sorted(year_dir.glob("*.xlsx")):
            ver = parse_ver(f.name)
            if ver is None:
                continue
            yr = int(year_dir.name)
            if yr > best_year or (yr == best_year and ver > best_ver):
                best, best_ver, best_year = f, ver, yr

    if best is None:
        print(f"[{tipo}] Nenhum arquivo .xlsx encontrado")
        continue

    version_str = f"{best_ver[0]}.{best_ver[1]}"
    tag = f"{tipo.lower()}-v{version_str}"
    filename = best.name
    rel_path = f"{best_year}/{filename}"
    download_url = f"https://github.com/{REPO}/releases/download/{tag}/{filename}"

    # Data do último commit do arquivo (não a data de hoje)
    git_date = subprocess.run(
        ["git", "log", "-1", "--format=%cs", str(best)],
        capture_output=True, text=True
    ).stdout.strip()
    file_date = git_date if git_date else date.today().isoformat()

    print(f"[{tipo}] Versão mais recente: {filename}  →  tag: {tag}")

    # Cria Release (ou faz upload do asset se já existir sem ele)
    exists = subprocess.run(["gh", "release", "view", tag], capture_output=True)
    if exists.returncode != 0:
        print(f"[{tipo}] Criando release {tag}...")
        subprocess.run(
            [
                "gh", "release", "create", tag,
                "--title", f"{tipo} v{version_str}",
                "--notes", f"Versão {version_str} do {tipo} StormX — {date.today().isoformat()}",
                str(best),
            ],
            check=True,
        )
    else:
        assets_out = subprocess.run(
            ["gh", "release", "view", tag, "--json", "assets", "-q", ".assets[].name"],
            capture_output=True,
            text=True,
        ).stdout.strip().split("\n")
        if filename not in assets_out:
            print(f"[{tipo}] Fazendo upload do asset {filename}...")
            subprocess.run(
                ["gh", "release", "upload", tag, str(best), "--clobber"],
                check=True,
            )
        else:
            print(f"[{tipo}] Asset já existe no release {tag}")

    # Escreve latest.json com download_url
    latest = {
        "filename": filename,
        "path": rel_path,
        "version": version_str,
        "updated": file_date,
        "download_url": download_url,
    }
    (base / "latest.json").write_text(json.dumps(latest, indent=2) + "\n", encoding="utf-8")
    print(f"[{tipo}] latest.json → {download_url}")

    # Regenera index.html de cada pasta de ano
    for year_dir in year_dirs:
        gen_index_html(year_dir, tipo_label, parse_ver)
    print(f"[{tipo}] index.html das pastas de ano atualizados")
