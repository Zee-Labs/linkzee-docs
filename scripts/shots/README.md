# Screenshots automatizados da doc

Pipeline Playwright que loga na conta demo (Studio Aurora, sandbox), troca o
idioma da conta, captura cada tela de `screens.mjs` com destaques e converte
para WebP em `../../images/<seção>/<nome>-<locale>.webp`.

```bash
npm install && npx playwright install chromium
DEMO_FILE=/caminho/demo-out.json npm run shots           # tudo (5 idiomas)
DEMO_FILE=... LOCALES=pt-BR SCREENS=scheduling-today npm run shots  # filtro
```

`demo-out.json` (`{ token, slug }`) NUNCA é commitado. Runbook completo da
conta demo (criação, seeds, rotação do token): vault do repo principal →
`docs/infra/docs-screenshots.md`.
