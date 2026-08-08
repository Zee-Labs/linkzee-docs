/**
 * Pipeline de screenshots da documentação (Mintlify) — Linkzee.
 *
 * O que faz: loga na conta DEMO (Studio Aurora) injetando o JWT no
 * sessionStorage (sem Turnstile), troca o idioma da conta via API, captura
 * cada tela do catálogo (screens.mjs) com DESTAQUES injetados por CSS, e
 * converte para WebP em ../../images/<section>/<name>-<locale>.webp.
 *
 * Rodar:  DEMO_FILE=/caminho/demo-out.json npm run shots
 *         (opcional: LOCALES=pt-BR  SCREENS=today,earnings  para filtrar)
 *
 * demo-out.json = { token, slug } — token vira o cookie httpOnly da API;
 * (vault: docs/infra/docs-screenshots.md no repo principal). NUNCA commitar.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { execSync } from 'node:child_process';
import { SCREENS } from './screens.mjs';
import { localizeContent } from './content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB = process.env.WEB_BASE ?? 'https://dev.linkz.ee';
const API = process.env.API_BASE ?? 'https://api-dev.linkz.ee';
const DEMO = JSON.parse(fs.readFileSync(process.env.DEMO_FILE ?? `${__dirname}/demo-out.json`, 'utf8'));
const LOCALES = (process.env.LOCALES ?? 'pt-BR,en,es,fr,de').split(',');
const ONLY = process.env.SCREENS ? new Set(process.env.SCREENS.split(',')) : null;
const OUT_RAW = `${__dirname}/out`;
const OUT_IMG = path.resolve(`${__dirname}/../../images`);

/** Destaque visual: anel roxo da marca + leve escurecida no resto (opcional). */
const HIGHLIGHT_CSS = `
  [data-shot-hl] {
    box-shadow: 0 0 0 3px #7C3AED, 0 0 0 9px rgba(124, 58, 237, 0.22) !important;
    border-radius: 12px !important;
  }
  .shot-badge {
    position: fixed;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #7C3AED;
    color: #fff;
    font: 700 15px/1 -apple-system, Helvetica, Arial;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.35);
    z-index: 99999;
  }
`;

async function apiPatch(pathName, body) {
  const res = await fetch(`${API}${pathName}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${DEMO.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${pathName} → ${res.status}`);
}

async function setLocale(locale) {
  await apiPatch('/auth/profile', { preferences: { dashboardLocale: locale } });
  await apiPatch('/stores/me', { publicPreferences: { locale } });
}

async function applyHighlights(page, highlights = []) {
  if (!highlights.length) return;
  await page.addStyleTag({ content: HIGHLIGHT_CSS });
  let idx = 0;
  for (const h of highlights) {
    const sel = typeof h === 'string' ? h : h.selector;
    const nth = typeof h === 'object' && h.nth !== undefined ? h.nth : 0;
    const badge = typeof h === 'object' && h.badge ? String(h.badge) : '';
    const ok = await page.evaluate(
      ({ sel, nth, badge, idx }) => {
        const el = document.querySelectorAll(sel)[nth];
        if (!el) return false;
        el.setAttribute('data-shot-hl', String(idx));
        el.scrollIntoView({ block: 'center' });
        if (badge) {
          // Badge no BODY (position fixed) — cards com overflow:hidden
          // cortavam o ::before. Pareado pelo índice (nunca por ordem de DOM).
          const b = document.createElement('div');
          b.className = 'shot-badge';
          b.dataset.for = String(idx);
          b.textContent = badge;
          document.body.appendChild(b);
        }
        return true;
      },
      { sel, nth, badge, idx },
    );
    if (!ok) console.warn(`    ⚠ destaque não achou: ${sel}`);
    idx++;
  }
  // Posiciona os badges DEPOIS do último scrollIntoView (rects finais).
  await page.evaluate(() => {
    for (const b of document.querySelectorAll('.shot-badge')) {
      const el = document.querySelector(`[data-shot-hl="${b.dataset.for}"]`);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      b.style.top = `${Math.max(4, r.top - 14)}px`;
      b.style.left = `${Math.max(4, r.left - 14)}px`;
    }
  });
}

async function run() {
  fs.mkdirSync(OUT_RAW, { recursive: true });
  const browser = await chromium.launch();
  let captured = 0;

  for (const locale of LOCALES) {
    console.log(`\n=== ${locale} ===`);
    await setLocale(locale);
    // CONTEÚDO da demo no idioma da doc (serviços/produtos/links/bio) — um
    // print em inglês com "Corte Feminino" quebraria a imersão.
    await localizeContent({ api: API, token: DEMO.token, locale });
    // Dados de BANCO (nomes de clientes, avaliações, fila): hook opcional —
    // ex.: LOCALIZE_DB_CMD='bash localize-db.sh' (recebe LOCALE no env).
    if (process.env.LOCALIZE_DB_CMD) {
      execSync(process.env.LOCALIZE_DB_CMD, {
        stdio: 'inherit',
        env: { ...process.env, LOCALE: locale },
      });
    }
    // ISR/no cache do público: folga pro on-demand revalidate.
    await new Promise((r) => setTimeout(r, 3000));

    for (const screen of SCREENS) {
      if (ONLY && !ONLY.has(screen.name)) continue;
      const ctx = await browser.newContext({
        viewport: screen.viewport ?? { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        locale,
        reducedMotion: 'reduce',
        timezoneId: 'America/Sao_Paulo',
      });
      if (screen.auth !== false) {
        // Sessão do Linkzee = cookie httpOnly `access_token` no domínio da API
        // (SameSite=None) — o axios do painel manda withCredentials.
        await ctx.addCookies([
          {
            name: 'access_token',
            value: DEMO.token,
            domain: new URL(API).hostname,
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'None',
          },
          // Idioma do PAINEL: o next-intl lê o cookie lz-locale (semeado no
          // login/seletor) — o PATCH do perfil sozinho não muda a UI.
          {
            name: 'lz-locale',
            value: locale,
            domain: new URL(WEB).hostname,
            path: '/',
            secure: true,
            sameSite: 'Lax',
          },
        ]);
      }
      const page = await ctx.newPage();
      try {
        const url = screen.url.replaceAll('{slug}', DEMO.slug);
        // domcontentloaded + settle: dashboards têm polling (networkidle nunca chega).
        await page.goto(`${WEB}${url}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
        for (const step of screen.steps ?? []) {
          if (step.waitMs) await page.waitForTimeout(step.waitMs);
          if (step.clickRole) await page.getByRole(step.clickRole.role, step.clickRole.opts ?? {}).nth(step.clickRole.nth ?? 0).click();
          if (step.clickText) await page.getByText(step.clickText, { exact: false }).first().click();
          if (step.clickSel) await page.locator(step.clickSel).first().click();
          if (step.waitSel) await page.waitForSelector(step.waitSel, { timeout: 15000 }).catch(() => {});
          if (step.scrollTo) await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView({ block: 'center' }), step.scrollTo);
          if (step.eval) await page.evaluate(step.eval);
        }
        await page.waitForTimeout(screen.settleMs ?? 1200);
        // Dados via SWR chegam DEPOIS do settle às vezes — espera o DOM ter o
        // nº mínimo de elementos antes de marcar (senão o destaque cai no
        // elemento errado quando o React insere um card acima).
        if (screen.waitCount) {
          await page
            .waitForFunction(
              ({ sel, min }) => document.querySelectorAll(sel).length >= min,
              screen.waitCount,
              { timeout: 20000 },
            )
            .catch(() => console.warn(`    ⚠ waitCount não atingido: ${screen.waitCount.sel}`));
          await page.waitForTimeout(600);
        }
        await applyHighlights(page, screen.highlights);
        await page.waitForTimeout(350);
        const raw = `${OUT_RAW}/${screen.name}-${locale}.png`;
        await page.screenshot({ path: raw, fullPage: false });
        const dir = `${OUT_IMG}/${screen.section}`;
        fs.mkdirSync(dir, { recursive: true });
        const outFile = `${dir}/${screen.name}-${locale}.webp`;
        await sharp(raw).webp({ quality: 92, effort: 6, smartSubsample: true }).toFile(outFile);
        const kb = Math.round(fs.statSync(outFile).size / 1024);
        console.log(`  ✓ ${screen.name} (${kb} KB)`);
        captured++;
      } catch (e) {
        console.error(`  ✗ ${screen.name}: ${e.message.slice(0, 140)}`);
      } finally {
        await ctx.close();
      }
    }
  }
  await browser.close();
  console.log(`\n${captured} capturas concluídas.`);
}

run().catch((e) => { console.error(e); process.exit(1); });
