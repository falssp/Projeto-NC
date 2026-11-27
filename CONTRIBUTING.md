# Guia de Contribuição — Projeto NC

Obrigado por contribuir! Este guia explica como criar, manter e publicar ferramentas no Projeto NC.

---

## Filosofia do projeto

- **Offline-first**: toda ferramenta deve funcionar sem internet após o carregamento inicial
- **Zero dependências**: um único arquivo HTML autocontido por ferramenta — sem npm, sem CDNs externos, sem APIs
- **AdOps-centric**: foco em resolver problemas reais do dia a dia de operações de mídia digital
- **Consistência visual**: todas as ferramentas seguem o mesmo sistema de design

---

## Criando uma nova ferramenta

### 1. Estrutura mínima

```
ferramentas/
└── nome-da-ferramenta/
    └── index.html          ← único arquivo necessário
```

O nome da pasta deve ser em **kebab-case** e descritivo: `freq-calculator`, `naming-convention`, `checklist-golive`.

### 2. Template base

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Nome da Ferramenta | NC Tool</title>
<style>
:root {
  --navy:   #0D2137;
  --navy2:  #1A3F63;
  --accent: #38BDF8;
  --bg:     #F0F4F8;
  --surface:#ffffff;
  --border: #DDE3EC;
  --text:   #0D2137;
  --mid:    #4A5568;
  --light:  #8B9BBF;
}
/* ... seus estilos ... */
</style>
</head>
<body>

<!-- HEADER OBRIGATÓRIO (sticky, 56px) -->
<header style="background:var(--navy);padding:0 24px;position:sticky;top:0;z-index:100">
  <div style="display:flex;align-items:center;height:56px">
    <div style="color:#fff;font-size:15px;font-weight:700">
      Nome da <span style="color:var(--accent)">Ferramenta</span>
    </div>
  </div>
</header>

<!-- CONTEÚDO PRINCIPAL -->
<div style="max-width:960px;margin:0 auto;padding:24px">
  <!-- ... -->
  
  <!-- LINK DE VOLTA (footer) -->
  <footer style="text-align:center;color:var(--light);font-size:11px;padding:16px">
    <a href="https://falssp.github.io/Projeto-NC/" style="color:var(--accent);text-decoration:none">← Projeto NC</a>
  </footer>
</div>

<script>
// Toda a lógica aqui
</script>
</body>
</html>
```

### 3. Padrões de layout

**Ferramenta de cálculo** (recomendado para a maioria):
```
┌─────────────────────────────────────────────┐
│ HEADER (56px sticky)                        │
├──────────────┬──────────────────────────────┤
│ SIDEBAR      │ PAINEL DE RESULTADOS         │
│ (300-340px)  │ (flex-grow)                  │
│              │                              │
│ inputs       │ cards de resultado           │
│ selects      │ tabelas                      │
│ btn calcular │ charts                       │
│              │                              │
│ position:    │                              │
│ sticky       │                              │
└──────────────┴──────────────────────────────┘
```

**Ferramenta de listagem/glossário** (conteúdo único):
```
┌─────────────────────────────────────────────┐
│ HEADER (56px sticky)                        │
├─────────────────────────────────────────────┤
│ SEARCH/FILTROS                              │
├─────────────────────────────────────────────┤
│ LISTA DE ITENS (max-width: 900px)           │
└─────────────────────────────────────────────┘
```

### 4. Padrões de código JS

```javascript
// Dados em objeto/const no topo
const CONFIG = {
  canais: { meta: {...}, google: {...} },
  benchmarks: { cpm: { min: 5, avg: 12 } }
};

// Funções principais bem nomeadas
function calc() { /* cálculo principal */ }
function render() { /* atualiza a UI */ }
function exportTxt() { /* download */ }

// Export para .txt
function exportTxt() {
  const content = `Relatório\n${'='.repeat(40)}\n...`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'arquivo.txt';
  a.click();
}

// Export para .csv
function exportCSV() {
  const rows = [['Col1', 'Col2'], ['Val1', 'Val2']];
  const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  // ...
}
```

---

## Adicionando o card no índice

Após criar a ferramenta, adicione o card em `ferramentas/index.html`:

```html
<div class="card cat-adops">
  <div class="card-head">
    <div class="icon">🎯</div>  <!-- emoji representativo -->
    <div>
      <div class="card-title">Nome da Ferramenta</div>
      <div class="card-type">Offline</div>
    </div>
  </div>
  <p class="card-desc">
    Descrição clara e objetiva de o que a ferramenta faz e para que serve.
    Mencione as principais funcionalidades em 2-3 linhas.
  </p>
  <a class="btn" href="nome-da-ferramenta/" target="_blank">Abrir</a>
</div>
```

**Categorias de card disponíveis:**
- `cat-adops` — ferramentas de operações de mídia (maioria)
- `cat-naming` — ferramentas de naming e taxonomia
- `cat-data` — ferramentas de dados e mensuração

---

## Git workflow

### Push normal (sem conflito)

```bash
git add ferramentas/nome-da-ferramenta/index.html
git add ferramentas/index.html
git commit -m "feat: adiciona ferramenta nome-da-ferramenta

- Descrição do que foi adicionado
- Funcionalidade principal
- Export .txt/.csv (se tiver)"
git push origin main
```

### Resolução de conflito (alguém fez push antes)

```bash
# Push rejeitado? Faça:
git fetch origin main
git rebase origin/main

# Se houver conflito em ferramentas/index.html:
# 1. Abra o arquivo e procure <<<<<<< HEAD
# 2. Mantenha TODOS os cards (remote + seus)
# 3. Remova os marcadores de conflito (<<<, ===, >>>)

git add ferramentas/index.html
GIT_EDITOR=true git rebase --continue
git push origin main
```

> ⚠️ **Regra de ouro**: em qualquer conflito no `index.html`, **nunca descarte cards do remote**. Sempre mantenha todos os cards de ambos os lados.

### Mensagens de commit

Use o padrão:
```
tipo: descrição curta

- detalhe 1
- detalhe 2
```

**Tipos:**
- `feat:` — nova ferramenta ou funcionalidade
- `fix:` — correção de bug
- `refactor:` — refatoração sem mudança de comportamento
- `docs:` — atualização de documentação
- `style:` — ajuste visual/CSS

---

## Checklist antes do push

- [ ] A ferramenta funciona offline (sem internet após carregamento)
- [ ] Tem header sticky de 56px com o design padrão
- [ ] Tem link "← Projeto NC" no footer
- [ ] Não tem dependências externas (CDN, APIs, fontes do Google)
- [ ] O card foi adicionado em `ferramentas/index.html`
- [ ] Testado em Chrome e Firefox
- [ ] Responsivo em mobile (mínimo 375px de largura)

---

## Dúvidas?

Abra uma issue ou consulte o [README principal](README.md).
