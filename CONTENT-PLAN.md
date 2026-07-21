# Plano da Documentação do Usuário — Linkzee (Mintlify)

> Documento de planejamento (não publicado — está no `.mintignore`). Guia a
> construção da doc do **usuário final** do Linkzee, espelhando o padrão do
> Postzee (`postzee-docs`). **Regra de ouro: nada de arquitetura, código ou
> detalhe interno de desenvolvimento** — só como o usuário usa o produto.

## 1. Como o Postzee resolveu (o padrão que vamos seguir)

- **Mintlify** com um único `docs.json` (schema novo), tema `mint`, 3 cores.
- **5 idiomas** via `navigation.languages[]`: **inglês na raiz (default)**, e
  `pt-BR/ es/ fr/ de/` como **pastas espelho** (todo caminho de página prefixado
  com o código do idioma). Cada idioma tem a **árvore de navegação inteira**
  (tabs → groups → pages) repetida, só com os **rótulos traduzidos**; os nomes
  de arquivo são idênticos em todos os idiomas.
- **Tradução 100%**: toda página existe nos 5 idiomas (~69 páginas por idioma).
- **3 tabs** no topo: `Learn` · `Integrations` · `API Reference`.
- **Frontmatter minimalista**: só `title` + `icon` (Font Awesome) + `description`
  (nas páginas de abertura de seção). Seção = pasta; índice da seção = página
  `overview.mdx`; arquivos em `kebab-case`.
- **Componentes**: `CardGroup`/`Card`, `Note`, `Warning`, `Accordion`/
  `AccordionGroup`, `Steps`/`Step`, tabelas Markdown e blocos de código.
  **Sem** `Tabs`, `Frame` ou screenshots — visual limpo, texto + tabela + código.
- **API Reference escrita à mão em MDX** (bloco método+rota → `curl` de Request →
  tabela de parâmetros → JSON de Response). **Sem OpenAPI** no Postzee.
- **Assets compartilhados na raiz** (`/logo`, `/images`, `/favicon.svg`); nunca
  duplicados por idioma.

## 2. Marca e configuração (`docs.json`)

| Campo | Valor |
|---|---|
| `name` | `Linkzee Docs` |
| `theme` | `mint` |
| `colors` | primary `#16A34A`, light `#07C983`, dark `#15803D` (verde da marca — já no starter) |
| `logo` | `/logo/light.svg` + `/logo/dark.svg` (já existem no repo) |
| `favicon` | `/favicon.svg` (já existe) |
| `navbar.links` | Suporte → `mailto:support@linkz.ee` |
| `navbar.primary` | botão **Painel** → `https://linkz.ee/dashboard` |
| `navigation.global.anchors` | "API Reference" (interno) + "Site" → `https://linkz.ee` |
| `seo.metatags` | og:site_name, og:image (`/images/og-image.jpg`), author `Zee Labs LLC`, keywords |
| `footer.socials` | website `https://linkz.ee` (+ redes quando houver) |

**Decisão de idioma padrão (a confirmar):** recomendo **pt-BR como default na
raiz** (público-alvo são afiliados brasileiros e o app já nasce em pt-BR), com
`en/ es/ fr/ de/` como pastas espelho. *Alternativa:* seguir o Postzee à risca
(inglês na raiz). Só muda qual idioma fica sem prefixo — a estrutura é idêntica.

## 3. Arquitetura da informação (mapa de páginas)

Espelha a profundidade do Postzee, adaptado ao Linkzee. **~66 páginas por idioma
× 5 = ~330 arquivos `.mdx`.** Ícones Font Awesome sugeridos entre parênteses.

### Tab "Aprender" (Learn)

**Primeiros passos** (`get-started/`)
- `introduction` — o que é o Linkzee, pra quem, o que dá pra fazer (hand-wave)
- `quickstart` — do zero à bio publicada em poucos passos (`Steps`) (rocket)
- `create-account` — cadastro por e-mail/senha, login com Google, ativação por e-mail (user-plus)
- `your-username` — escolher a URL `linkz.ee/seu-nome`, regras do slug (link)

**Sua página** (`your-page/`) — o editor de Conteúdo (objeto central)
- `overview` — a tela Conteúdo, agrupamento links × vitrine, auto-save, preview (table-cells)
- `links` — adicionar/editar/reordenar links, título inline, on/off, cliques (link)
- `collections` — agrupar links em coleções (folder)
- `social-networks` — redes sociais, posição topo/rodapé (share-nodes)
- `header` — texto ou logo, nome, bio (0/160) (heading)

**Vitrine de produtos** (`products/`) — o diferencial
- `overview` — vitrine de afiliado (Shopee, Amazon, Mercado Livre) (store)
- `adding-products` — colar link do marketplace e auto-preencher nome/imagem/preço (plus)
- `pricing-promotions` — preço, selo de promoção, produto em destaque (tag)
- `scarcity-counter` — contador de escassez (tempo relativo) (hourglass-half)
- `categories` — organizar produtos por categoria (layer-group)

**Design e temas** (`design/`)
- `overview` — como o Design funciona (tema + customização curada) (palette)
- `themes` — galeria de temas prontos (swatchbook)
- `customizing` — Header, Wallpaper, Buttons, Text, Colors (sliders)
- `best-practices` — combinações que convertem, legibilidade (wand-magic-sparkles)

**Agenda** (`scheduling/`) — a maior seção nova
- `overview` — ativar, os 3 modos (solo/equipe/vagas) (calendar)
- `services` — cadastrar serviços (duração, preço, buffer, cor) (list-check)
- `business-hours` — horário de funcionamento (clock)
- `team` — equipe: atendentes, horários e serviços próprios (users)
- `blocks` — bloqueios (feriado/férias/atestado) (ban)
- `google-calendar` — conectar Google Agenda + Google Meet (calendar-plus)
- `team-google-calendar` — cada atendente conecta a própria agenda (opt-in) (user-clock)
- `reminders` — lembrete de confirmação (horas antes, WhatsApp/e-mail) (bell)
- `reschedule-cancel` — reagendar e cancelar (dono e visitante) (calendar-check)
- `booking-link` — link direto de agendamento compartilhável (share)
- `ai-scheduling` — a Ana (assistente) agenda, remarca e cancela pelo chat (robot)

**Assistente de IA** (`ai-assistant/`)
- `overview` — o assistente de vendas na bio (robot)
- `persona` — configurar tom, abertura, personalidade, fatos da loja (id-card)
- `lead-capture` — capturar contatos (nome/WhatsApp/e-mail/@) (address-book)
- `knowledge-base` — enviar PDFs para a base de conhecimento (file-pdf)
- `voice-input` — ditar por voz (microphone)

**Desempenho** (`analytics/`)
- `overview` — métricas da bio, cliques, filtros, período (chart-line)

**Conta e configurações** (`account/`)
- `account` — idioma, região/fuso, país/estado/cidade, aparência, acessibilidade (gear)
- `password-security` — trocar senha, recuperação de senha (lock)
- `public-page-seo` — título e descrição da página pública, imagem OG automática (magnifying-glass)
- `tracking` — Meta Pixel + Conversions API, GTM, UTM (chart-simple)
- `deactivate-account` — desativar a conta (circle-xmark)

**Boas práticas** (`best-practices/`)
- `growing-clicks` — como ganhar mais cliques na bio (arrow-trend-up)
- `optimizing-bio` — organização, ordem, CTA (list-ol)
- `affiliate-tips` — dicas para afiliados de marketplace (money-bill-trend-up)
- `scheduling-tips` — tirar o máximo da Agenda (calendar-star)

**Solução de problemas** (`troubleshooting/`)
- `common-issues` — problemas comuns (Sintoma/Causa/Solução) (triangle-exclamation)
- `account-access` — acesso à conta, ativação, senha (key)
- `google-connection` — conexão com Google (login e agenda) (google)
- `publishing-seo` — página não aparece / SEO (globe)

**FAQ** (`faq.mdx`) — `AccordionGroup` (circle-question)

### Tab "Integrações" (Integrations)

**API pública** (`integrations/api/`)
- `overview` — o que dá pra automatizar com a API (plug)
- `api-keys` — criar chave `lzk_`, escopos leitura/escrita, guardar com segurança (key)

**MCP (agentes de IA)** (`integrations/mcp/`)
- `overview` — o que é MCP e por que usar (robot)
- `claude` — conectar no Claude / Claude Code / claude.ai (comment)
- `chatgpt-and-others` — ChatGPT, Cursor, outros agentes (plug)
- `tools-reference` — todas as ferramentas (produtos, conteúdo, design, agenda, assistente) (screwdriver-wrench)

### Tab "Referência da API" (API Reference)

**Visão geral** (`api-reference/`)
- `authentication` — `Authorization: Bearer lzk_...`, base URL, erros (lock)
- `rate-limits` — limites de requisição (gauge)

**Endpoints** (`api-reference/`)
- `store` — dados da loja (perfil, tema, redes, SEO, pixels) (store)
- `products` — produtos (CRUD) (box)
- `categories` — categorias (layer-group)
- `links-collections` — links e coleções da bio (link)
- `content` — árvore de conteúdo e reordenação (table-cells)
- `agenda` — serviços, equipe, bloqueios, agendamentos, disponibilidade, Google (calendar)
- `leads` — leads capturados + export CSV (address-book)
- `uploads` — envio de imagens (image)
- `knowledge` — PDFs da base de conhecimento (file-pdf)

> **API Reference — decisão:** escrever **à mão em MDX** (padrão Postzee), usando
> o OpenAPI público (`/openapi/v1.json`) só como *fonte* dos campos. Vantagens:
> linguagem amigável, traduzível, e escondemos rotas internas/legadas (ex.: o
> reorder de produtos marcado como legado). *Alternativa:* apontar o Mintlify
> para o `openapi/v1.json` e auto-gerar — mais rápido, porém técnico, em pt e
> difícil de traduzir. **Recomendo o MDX à mão.**

## 4. Estrutura de pastas (resultado)

```
docs.json
favicon.svg
logo/{light,dark}.svg
images/og-image.jpg
snippets/            (componentes reutilizáveis, ex.: vídeo do YouTube)
get-started/  your-page/  products/  design/  scheduling/
ai-assistant/  analytics/  account/  best-practices/  troubleshooting/
integrations/{api,mcp}/   api-reference/   faq.mdx

<lang>/…   espelho idêntico para pt-BR, es, fr, de (todos os arquivos acima,
            com o mesmo nome, conteúdo traduzido). Só o idioma default fica na raiz.
```

## 5. Padrão de escrita (obrigatório)

- **Voz ativa, segunda pessoa** ("você"), uma ideia por frase.
- **Rótulos de UI em negrito**: clique em **Agenda**, abra **Design**.
- **Procedimentos** em `Steps`/lista numerada; **avisos** em `Note`/`Warning`.
- **Troubleshooting**: tríade **Sintoma / Causa / Solução** por item.
- **Sem jargão técnico, sem arquitetura, sem nomes de código/arquivo internos.**
  Falamos de telas e botões, não de services/schemas/endpoints internos. (A
  única exceção legítima são as tabs API/MCP, que documentam recursos que o
  próprio usuário usa para automatizar.)
- Frontmatter: `title` + `icon` sempre; `description` nas páginas `overview`.
- Cross-links entre páginas com `CardGroup`/`Card` no fim das seções.

## 6. Plano de execução (fases)

1. **Fase 0 — Fundação.** Reescrever `docs.json` (marca, SEO, navbar, 5 idiomas
   com as 3 tabs e todos os grupos/páginas), limpar o starter (`index`/
   `quickstart` genéricos), criar `og-image`, `.mintignore` deste plano.
   Entregável: site sobe em `mintlify dev` com a navegação completa (páginas
   ainda vazias/placeholder).
2. **Fase 1 — Conteúdo no idioma-fonte.** Escrever as ~66 páginas no idioma
   default (pt-BR recomendado). É o grosso do trabalho de redação.
3. **Fase 2 — Traduções.** Traduzir as ~66 páginas para os outros 4 idiomas
   (≈264 páginas), mantendo nomes de arquivo e estrutura; traduzir rótulos de
   tabs/grupos no `docs.json`.
4. **Fase 3 — Polimento.** Revisão de links quebrados (`mintlify broken-links`),
   consistência de termos entre idiomas, FAQ e troubleshooting a partir de
   dúvidas reais, cross-links, og-image e SEO.

**Sugestão de execução das fases 1–2:** por serem muitas páginas repetitivas e
traduções, dá para orquestrar com **múltiplos agentes em paralelo** (escrever
seções independentes / traduzir página a página) — reduz muito o tempo. Isso
consome bastante processamento, então só faço sob seu OK explícito. Sem isso,
sigo sequencial por seção.

## 7. Decisões a confirmar antes de construir

1. **Idioma default (raiz):** pt-BR (recomendado) ou inglês (padrão Postzee)?
2. **API Reference:** MDX à mão (recomendado) ou auto-gerado do OpenAPI?
3. **Execução:** posso usar orquestração multi-agente (mais rápido, mais custo)
   ou prefere sequencial?
4. **Escopo do 1º lote:** construir tudo de uma vez, ou começar por um MVP
   (Primeiros passos + Sua página + Vitrine + Agenda) e expandir?
