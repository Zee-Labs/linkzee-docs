/**
 * Conteúdo da conta demo (Studio Aurora) POR IDIOMA — os prints de cada
 * locale mostram serviços/produtos/links/bio no idioma da doc.
 *
 * Identificação estável (sem depender do nome atual):
 *  - serviço → assinatura `durationMin:price`
 *  - produto → `price`
 *  - link    → URL
 */
export const CONTENT = {
  'pt-BR': {
    bio: 'Beleza e bem-estar no coração da cidade. Agende seu horário ✨',
    agendaTitle: 'Agendar horário',
    services: {
      '60:120': { name: 'Corte Feminino', description: 'Lavagem, corte e finalização' },
      '120:280': { name: 'Coloração Completa', description: 'Coloração profissional com produtos premium' },
      '45:60': { name: 'Manicure', description: 'Cutilagem e esmaltação' },
      '30:45': { name: 'Design de Sobrancelha', description: '' },
      '90:150': { name: 'Corte + Sobrancelha', description: 'Combo com preço especial' },
    },
    products: {
      '89.9': 'Máscara Capilar Nutritiva',
      '64.5': 'Óleo Reparador de Pontas',
      '49.9': 'Kit Esmaltes Aurora',
      '120': 'Escova Profissional',
    },
    links: {
      'https://studioaurora.example/servicos': 'Tabela de serviços e preços',
      'https://instagram.com/studioaurora.demo': 'Nosso trabalho no Instagram',
    },
  },
  en: {
    bio: 'Beauty & wellness in the heart of the city. Book your visit ✨',
    agendaTitle: 'Book an appointment',
    services: {
      '60:120': { name: "Women's Haircut", description: 'Wash, cut and blow-dry finish' },
      '120:280': { name: 'Full Color', description: 'Professional coloring with premium products' },
      '45:60': { name: 'Manicure', description: 'Cuticle care and polish' },
      '30:45': { name: 'Brow Design', description: '' },
      '90:150': { name: 'Cut + Brows', description: 'Bundle at a special price' },
    },
    products: {
      '89.9': 'Nourishing Hair Mask',
      '64.5': 'Split-End Repair Oil',
      '49.9': 'Aurora Nail Polish Kit',
      '120': 'Professional Brush',
    },
    links: {
      'https://studioaurora.example/servicos': 'Services & price list',
      'https://instagram.com/studioaurora.demo': 'Our work on Instagram',
    },
  },
  es: {
    bio: 'Belleza y bienestar en el corazón de la ciudad. Reserva tu cita ✨',
    agendaTitle: 'Reservar una cita',
    services: {
      '60:120': { name: 'Corte de Cabello', description: 'Lavado, corte y peinado' },
      '120:280': { name: 'Coloración Completa', description: 'Coloración profesional con productos premium' },
      '45:60': { name: 'Manicura', description: 'Cutículas y esmaltado' },
      '30:45': { name: 'Diseño de Cejas', description: '' },
      '90:150': { name: 'Corte + Cejas', description: 'Combo con precio especial' },
    },
    products: {
      '89.9': 'Mascarilla Capilar Nutritiva',
      '64.5': 'Aceite Reparador de Puntas',
      '49.9': 'Kit de Esmaltes Aurora',
      '120': 'Cepillo Profesional',
    },
    links: {
      'https://studioaurora.example/servicos': 'Servicios y precios',
      'https://instagram.com/studioaurora.demo': 'Nuestro trabajo en Instagram',
    },
  },
  fr: {
    bio: 'Beauté et bien-être au cœur de la ville. Réservez votre créneau ✨',
    agendaTitle: 'Prendre rendez-vous',
    services: {
      '60:120': { name: 'Coupe Femme', description: 'Shampoing, coupe et brushing' },
      '120:280': { name: 'Coloration Complète', description: 'Coloration professionnelle, produits premium' },
      '45:60': { name: 'Manucure', description: 'Soin des cuticules et pose de vernis' },
      '30:45': { name: 'Design de Sourcils', description: '' },
      '90:150': { name: 'Coupe + Sourcils', description: 'Forfait à prix spécial' },
    },
    products: {
      '89.9': 'Masque Capillaire Nourrissant',
      '64.5': 'Huile Réparatrice de Pointes',
      '49.9': 'Kit Vernis Aurora',
      '120': 'Brosse Professionnelle',
    },
    links: {
      'https://studioaurora.example/servicos': 'Prestations et tarifs',
      'https://instagram.com/studioaurora.demo': 'Notre travail sur Instagram',
    },
  },
  de: {
    bio: 'Schönheit & Wohlbefinden im Herzen der Stadt. Buche deinen Termin ✨',
    agendaTitle: 'Termin buchen',
    services: {
      '60:120': { name: 'Damenhaarschnitt', description: 'Waschen, Schnitt und Föhnen' },
      '120:280': { name: 'Komplette Coloration', description: 'Professionelle Coloration mit Premium-Produkten' },
      '45:60': { name: 'Maniküre', description: 'Nagelpflege und Lackierung' },
      '30:45': { name: 'Augenbrauen-Design', description: '' },
      '90:150': { name: 'Schnitt + Brauen', description: 'Kombi zum Sonderpreis' },
    },
    products: {
      '89.9': 'Nährende Haarmaske',
      '64.5': 'Spitzen-Reparaturöl',
      '49.9': 'Aurora Nagellack-Set',
      '120': 'Profi-Bürste',
    },
    links: {
      'https://studioaurora.example/servicos': 'Leistungen & Preise',
      'https://instagram.com/studioaurora.demo': 'Unsere Arbeiten auf Instagram',
    },
  },
};

/** Renomeia serviços/produtos/links/bio da conta demo para o locale. */
export async function localizeContent({ api, token, locale }) {
  const c = CONTENT[locale];
  if (!c) return;
  const H = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const req = async (method, path, body) => {
    const res = await fetch(`${api}${path}`, { method, headers: H, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status}`);
    return res.json();
  };

  await req('PATCH', '/stores/me', { bio: c.bio, agenda: { title: c.agendaTitle } });

  const offerings = (await req('GET', '/agenda/offerings')).data ?? [];
  for (const o of offerings) {
    const key = `${o.durationMin}:${o.price}`;
    const tr = c.services[key];
    if (tr && (o.name !== tr.name || (o.description ?? '') !== tr.description)) {
      // O DTO de update exige o corpo completo (durationMin etc.) — reenvia
      // os campos atuais junto com o nome/descrição traduzidos.
      await req('PATCH', `/agenda/offerings/${o._id ?? o.id}`, {
        name: tr.name,
        description: tr.description,
        durationMin: o.durationMin,
        price: o.price ?? null,
      });
    }
  }

  const products = (await req('GET', '/products?limit=50')).data ?? [];
  for (const p of products) {
    const tr = c.products[String(p.price)];
    if (tr && p.name !== tr) await req('PATCH', `/products/${p._id ?? p.id}`, { name: tr });
  }

  const links = (await req('GET', '/links')).data ?? [];
  for (const l of links) {
    const tr = c.links[l.url];
    if (tr && l.title !== tr) await req('PATCH', `/links/${l._id ?? l.id}`, { title: tr });
  }
}
