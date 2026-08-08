/** Catálogo de telas — cada entrada gera <section>/<name>-<locale>.webp. */
export const SCREENS = [
  {
    name: 'scheduling-today',
    section: 'scheduling',
    url: '/dashboard/scheduling',
    settleMs: 2500,
    waitCount: { sel: 'main .MuiCard-root', min: 2 },
    // 1 = card "Próximo atendimento" · 2 = botão Novo agendamento
    highlights: [
      { selector: 'main .MuiCard-root', nth: 0, badge: 1 },
      { selector: 'main .MuiButton-contained', nth: 0, badge: 2 },
    ],
  },
  {
    name: 'scheduling-earnings',
    section: 'scheduling',
    url: '/dashboard/scheduling',
    steps: [{ waitMs: 2000 }, { clickRole: { role: 'tab', nth: 2 } }, { waitMs: 2500 }],
    waitCount: { sel: 'main .MuiCard-root', min: 5 },
    // 1 = cards de totais · 2 = gráfico diário
    highlights: [
      { selector: 'main .MuiGrid-container', nth: 0, badge: 1 },
      { selector: 'main .MuiCard-root', nth: 4, badge: 2 },
    ],
  },
  {
    name: 'scheduling-services',
    section: 'scheduling',
    url: '/dashboard/scheduling',
    steps: [{ waitMs: 2000 }, { clickRole: { role: 'tab', nth: 3 } }, { waitMs: 1800 }],
    waitCount: { sel: 'main .MuiCard-root', min: 5 },
    // Card do serviço (toggle + editar + excluir)
    highlights: [{ selector: 'main .MuiCard-root', nth: 0 }],
  },
  {
    name: 'my-linkzee',
    section: 'your-page',
    url: '/dashboard/links',
    settleMs: 2500,
    // Botão "+ Adicionar" — o coração da página
    highlights: [{ selector: 'main .MuiButton-contained', nth: 0 }],
  },
  {
    name: 'public-bio',
    section: 'your-page',
    url: '/{slug}',
    auth: false,
    viewport: { width: 390, height: 844 },
    settleMs: 2500,
    highlights: [],
  },
  {
    name: 'booking-wizard',
    section: 'scheduling',
    url: '/{slug}?agenda=1',
    auth: false,
    viewport: { width: 390, height: 844 },
    // 1º card de serviço por ESTRUTURA (o nome muda por idioma — clickText quebrava)
    steps: [{ waitMs: 1800 }, { clickSel: 'div[role=dialog] button.p-4[class*=ring-1]' }, { waitMs: 1800 }],
    highlights: [],
  },
  {
    name: 'design-themes',
    section: 'design',
    url: '/dashboard/design',
    settleMs: 2500,
    highlights: [],
  },
  {
    name: 'performance',
    section: 'analytics',
    url: '/dashboard/performance',
    settleMs: 3000,
    highlights: [],
  },
  {
    name: 'scheduling-settings',
    section: 'scheduling',
    url: '/dashboard/scheduling',
    steps: [{ waitMs: 2000 }, { clickRole: { role: 'tab', nth: 4 } }, { waitMs: 2200 }],
    waitCount: { sel: 'main .MuiCard-root', min: 3 },
    highlights: [],
  },
  {
    name: 'booking-wizard-services',
    section: 'scheduling',
    url: '/{slug}?agenda=1',
    auth: false,
    viewport: { width: 390, height: 844 },
    settleMs: 2600,
    highlights: [],
  },
  {
    name: 'products',
    section: 'products',
    url: '/dashboard/products',
    settleMs: 2600,
    highlights: [],
  },
  {
    name: 'analytics',
    section: 'analytics',
    url: '/dashboard/analytics',
    settleMs: 3200,
    highlights: [],
  },
  {
    name: 'plan',
    section: 'billing',
    url: '/dashboard/plan',
    settleMs: 2600,
    highlights: [],
  },
  {
    name: 'settings',
    section: 'account',
    url: '/dashboard/settings',
    settleMs: 2400,
    highlights: [],
  },
];
