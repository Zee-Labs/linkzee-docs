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
    staffTitles: { 'Marina Duarte': 'Cabeleireira', 'Paula Reis': 'Manicure e sobrancelhas' },
    aboutBusiness: 'Studio de beleza em São Paulo (Jardins). Serviços: corte, coloração, manicure e design de sobrancelha — preços na página. Pagamento: PIX, crédito em até 3x e débito. Cancelamento grátis até 24h antes; o sinal é devolvido. Coloração inclui avaliação de fios. Produtos da linha Aurora são veganos e cruelty-free. Estacionamento conveniado ao lado (2h grátis).',
    assistant: {
      title: 'Concierge Aurora',
      opening: 'Oi! Sou a assistente do Studio Aurora 💜 Posso agendar seu horário, tirar dúvidas sobre serviços e preços — é só perguntar!',
      personality: 'Acolhedora, elegante e objetiva — trata todo mundo pelo primeiro nome e responde como uma recepcionista experiente de salão premium.',
      instructions: 'Sempre sugira agendar pelo assistente. Se perguntarem por coloração, mencione a avaliação de fios inclusa.',
      starterButtons: ["Quero agendar um horário", "Quais os preços dos serviços?", "A linha Aurora é vegana?"],
    },
    collection: 'Ofertas da semana',
    categories: { hair: 'Cabelo', nails: 'Unhas' },
    blockReason: 'Férias',
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
    staffTitles: { 'Marina Duarte': 'Hairstylist', 'Paula Reis': 'Nails & brows' },
    aboutBusiness: 'Beauty studio in São Paulo (Jardins). Services: haircut, coloring, manicure and brow design — prices on the page. Payment: PIX, credit card up to 3 installments, and debit. Free cancellation up to 24h before; the deposit is refunded. Coloring includes a strand test. Aurora product line is vegan and cruelty-free. Partner parking next door (2h free).',
    assistant: {
      title: 'Aurora Concierge',
      opening: "Hi! I'm the Studio Aurora assistant 💜 I can book your appointment and answer anything about services and prices — just ask!",
      personality: 'Warm, elegant and to the point — greets everyone by first name and replies like a seasoned front-desk pro at a premium salon.',
      instructions: 'Always suggest booking through the assistant. If asked about coloring, mention the included strand test.',
      starterButtons: ["I want to book an appointment", "What are the service prices?", "Is the Aurora line vegan?"],
    },
    collection: "This week's deals",
    categories: { hair: 'Hair', nails: 'Nails' },
    blockReason: 'Vacation',
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
    staffTitles: { 'Marina Duarte': 'Estilista', 'Paula Reis': 'Uñas y cejas' },
    aboutBusiness: 'Estudio de belleza en São Paulo (Jardins). Servicios: corte, coloración, manicura y diseño de cejas — precios en la página. Pago: PIX, tarjeta de crédito hasta en 3 cuotas y débito. Cancelación gratis hasta 24h antes; la seña se devuelve. La coloración incluye prueba de mechón. La línea Aurora es vegana y cruelty-free. Estacionamiento con convenio al lado (2h gratis).',
    assistant: {
      title: 'Concierge Aurora',
      opening: '¡Hola! Soy la asistente de Studio Aurora 💜 Puedo reservar tu cita y resolver dudas sobre servicios y precios — ¡solo pregunta!',
      personality: 'Cálida, elegante y directa — trata a todos por su nombre y responde como una recepcionista experta de un salón premium.',
      instructions: 'Sugiere siempre reservar por la asistente. Si preguntan por coloración, menciona la prueba de mechón incluida.',
      starterButtons: ["Quiero reservar una cita", "¿Cuáles son los precios?", "¿La línea Aurora es vegana?"],
    },
    collection: 'Ofertas de la semana',
    categories: { hair: 'Cabello', nails: 'Uñas' },
    blockReason: 'Vacaciones',
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
    staffTitles: { 'Marina Duarte': 'Coiffeuse', 'Paula Reis': 'Ongles et sourcils' },
    aboutBusiness: "Studio de beauté à São Paulo (Jardins). Prestations : coupe, coloration, manucure et design de sourcils — tarifs sur la page. Paiement : PIX, carte de crédit jusqu'à 3 fois et débit. Annulation gratuite jusqu'à 24h avant ; l'acompte est remboursé. La coloration inclut un test de mèche. La ligne Aurora est vegan et cruelty-free. Parking partenaire à côté (2h gratuites).",
    assistant: {
      title: 'Concierge Aurora',
      opening: "Bonjour ! Je suis l'assistante du Studio Aurora 💜 Je peux réserver votre créneau et répondre à vos questions sur les prestations et tarifs !",
      personality: "Chaleureuse, élégante et directe — appelle chacun par son prénom et répond comme une réceptionniste chevronnée d'un salon premium.",
      instructions: "Proposez toujours de réserver via l'assistante. Pour la coloration, mentionnez le test de mèche inclus.",
      starterButtons: ["Je veux prendre rendez-vous", "Quels sont les tarifs ?", "La ligne Aurora est-elle vegan ?"],
    },
    collection: 'Offres de la semaine',
    categories: { hair: 'Cheveux', nails: 'Ongles' },
    blockReason: 'Vacances',
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
    staffTitles: { 'Marina Duarte': 'Hairstylistin', 'Paula Reis': 'Nägel & Brauen' },
    aboutBusiness: 'Beauty-Studio in São Paulo (Jardins). Leistungen: Schnitt, Coloration, Maniküre und Augenbrauen-Design — Preise auf der Seite. Zahlung: PIX, Kreditkarte bis 3 Raten und EC. Kostenlose Stornierung bis 24h vorher; die Anzahlung wird erstattet. Coloration inkl. Strähnenprobe. Die Aurora-Linie ist vegan und cruelty-free. Partnerparkplatz nebenan (2h gratis).',
    assistant: {
      title: 'Concierge Aurora',
      opening: 'Hallo! Ich bin die Assistentin von Studio Aurora 💜 Ich buche deinen Termin und beantworte Fragen zu Leistungen und Preisen — frag einfach!',
      personality: 'Herzlich, elegant und auf den Punkt — spricht alle mit Vornamen an und antwortet wie eine erfahrene Empfangsprofi eines Premium-Salons.',
      instructions: 'Immer die Buchung über die Assistentin vorschlagen. Bei Colorationen die inklusive Strähnenprobe erwähnen.',
      starterButtons: ["Ich möchte einen Termin buchen", "Was kosten die Leistungen?", "Ist die Aurora-Linie vegan?"],
    },
    collection: 'Angebote der Woche',
    categories: { hair: 'Haare', nails: 'Nägel' },
    blockReason: 'Urlaub',
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
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return res.json();
  };

  await req('PATCH', '/stores/me', { bio: c.bio, aboutBusiness: c.aboutBusiness, agenda: { title: c.agendaTitle } });

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

  // Coleção (única) e categorias (identificadas pela POSIÇÃO de criação:
  // hair = a mais antiga; nails = a seguinte).
  const collections = (await req('GET', '/collections')).data ?? [];
  if (collections[0] && collections[0].name !== c.collection) {
    await req('PATCH', `/collections/${collections[0]._id ?? collections[0].id}`, { name: c.collection });
  }
  const cats = (await req('GET', '/categories')).data ?? [];
  const wanted = [c.categories.hair, c.categories.nails];
  for (let i = 0; i < Math.min(cats.length, 2); i++) {
    if (cats[i].name !== wanted[i]) {
      await req('PATCH', `/categories/${cats[i]._id ?? cats[i].id}`, { name: wanted[i] });
    }
  }

  // Assistente de IA (persona/saudação — a saudação aparece no widget).
  const items = (await req('GET', '/concierge-items')).data ?? [];
  if (items[0]) await req('PATCH', `/concierge-items/${items[0]._id ?? items[0].id}`, c.assistant);

  // Equipe (Onda C): nomes são constantes; só o cargo (title) é traduzido.
  const staff = (await req('GET', '/agenda/staff')).data ?? [];
  for (const m of staff) {
    const title = c.staffTitles?.[m.name];
    if (title && m.title !== title) {
      await req('PATCH', `/agenda/staff/${m._id ?? m.id}`, {
        name: m.name,
        title,
        avatarUrl: m.avatarUrl ?? undefined,
        offeringIds: m.offeringIds ?? undefined,
        isActive: m.isActive !== false,
      });
    }
  }

  // Bloqueio: sem PATCH na API — recria com o motivo traduzido (mesmas datas).
  const blocks = (await req('GET', '/agenda/blocks')).data ?? [];
  const vac = blocks.find((b) => b.allDay);
  if (vac && vac.reason !== c.blockReason) {
    await req('DELETE', `/agenda/blocks/${vac._id ?? vac.id}`);
    await req('POST', '/agenda/blocks', {
      startDate: vac.startDate,
      endDate: vac.endDate,
      allDay: true,
      reason: c.blockReason,
    });
  }
}
