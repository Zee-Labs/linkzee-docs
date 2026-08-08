/* Imagens de produto PREMIUM e SEM TEXTO (neutras de idioma) — Studio Aurora.
 * Glassmorphism + gradientes em camadas + ícone geométrico do produto. */
import fs from 'node:fs';
import { createRequire } from 'node:module';
// sharp: aponte SHARP_FROM pro package.json de um projeto que o tenha
const require = createRequire(process.env.SHARP_FROM ?? '/Users/lucas/Projetos/linkzee/linkzee/apps/api/package.json');
const sharp = require('sharp');

const { token } = JSON.parse(fs.readFileSync(process.env.DEMO_FILE, 'utf8'));
const API = 'https://api-dev.linkz.ee';

/** Cena base: fundo em gradiente diagonal + brilhos radiais + palco de vidro. */
function scene(c1, c2, glow, icon) {
  return `<svg width="900" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.3" cy="0.25" r="0.75">
      <stop offset="0%" stop-color="${glow}" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.85" cy="0.9" r="0.6">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.10"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <rect width="900" height="900" fill="url(#bg)"/>
  <rect width="900" height="900" fill="url(#glow)"/>
  <rect width="900" height="900" fill="url(#glow2)"/>
  <circle cx="710" cy="180" r="10" fill="#ffffff" opacity="0.5"/>
  <circle cx="770" cy="250" r="5" fill="#ffffff" opacity="0.4"/>
  <circle cx="160" cy="700" r="7" fill="#ffffff" opacity="0.35"/>
  <ellipse cx="450" cy="700" rx="240" ry="34" fill="#000000" opacity="0.18"/>
  <circle cx="450" cy="430" r="240" fill="url(#glass)" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2"/>
  ${icon}
  <text x="450" y="836" font-family="Helvetica, Arial" font-size="30" font-weight="600"
    letter-spacing="10" fill="#ffffff" fill-opacity="0.85" text-anchor="middle">STUDIO AURORA</text>
</svg>`;
}

// Ícones geométricos (centro ~450,430)
const jar = `
  <rect x="360" y="330" width="180" height="220" rx="26" fill="#ffffff" opacity="0.95"/>
  <rect x="360" y="330" width="180" height="220" rx="26" fill="url(#shine)" opacity="0.25"/>
  <rect x="345" y="286" width="210" height="52" rx="16" fill="#ffffff"/>
  <rect x="384" y="392" width="132" height="96" rx="12" fill="#00000022"/>`;
const droplet = `
  <path d="M450 270 C 520 370, 560 430, 560 500 A 110 110 0 0 1 340 500 C 340 430, 380 370, 450 270 Z"
    fill="#ffffff" opacity="0.95"/>
  <path d="M410 480 A 55 55 0 0 0 470 540" stroke="#00000022" stroke-width="16" fill="none" stroke-linecap="round"/>`;
const polish = `
  <rect x="380" y="360" width="140" height="180" rx="24" fill="#ffffff" opacity="0.95"/>
  <rect x="380" y="360" width="140" height="180" rx="24" fill="url(#shine)" opacity="0.3"/>
  <rect x="410" y="290" width="80" height="80" rx="12" fill="#ffffff"/>
  <rect x="404" y="404" width="92" height="92" rx="12" fill="#00000022"/>`;
const brush = `
  <rect x="418" y="250" width="64" height="200" rx="30" fill="#ffffff" opacity="0.95"/>
  <rect x="398" y="430" width="104" height="150" rx="24" fill="#ffffff"/>
  <g stroke="#00000030" stroke-width="10" stroke-linecap="round">
    <line x1="420" y1="452" x2="420" y2="556"/>
    <line x1="450" y1="452" x2="450" y2="556"/>
    <line x1="480" y1="452" x2="480" y2="556"/>
  </g>`;

const ARTS = {
  mask: scene('#5B21B6', '#DB2777', '#A78BFA', jar),
  oil: scene('#0C4A6E', '#7C3AED', '#38BDF8', droplet),
  polish: scene('#BE185D', '#F59E0B', '#FDA4AF', polish),
  brush: scene('#065F46', '#0EA5E9', '#6EE7B7', brush),
};

async function upload(buf, productId) {
  const fd = new FormData();
  fd.append('file', new Blob([buf], { type: 'image/webp' }), 'product.webp');
  fd.append('kind', 'product');
  fd.append('productId', productId);
  const res = await fetch(`${API}/uploads/image`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json).slice(0, 150));
  return json.data?.url ?? json.data;
}

const KEY_BY_PRICE = { '89.9': 'mask', '64.5': 'oil', '49.9': 'polish', '120': 'brush' };

const list = await (await fetch(`${API}/products?limit=50`, { headers: { Authorization: `Bearer ${token}` } })).json();
for (const p of list.data ?? []) {
  const key = KEY_BY_PRICE[String(p.price)];
  if (!key) continue;
  const buf = await sharp(Buffer.from(ARTS[key])).webp({ quality: 90 }).toBuffer();
  const url = await upload(buf, String(p._id ?? p.id));
  await fetch(`${API}/products/${p._id ?? p.id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl: url }),
  });
  console.log('✓', key, p.name);
}
console.log('ART OK');
