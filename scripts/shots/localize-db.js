/* Localiza os dados de BANCO da conta demo (nomes de clientes, avaliações,
 * fila e snapshots de serviço nos agendamentos) — roda NO CONTAINER da API.
 * Uso: node localize-db.js <locale>  */
const { NestFactory } = require('@nestjs/core');
const { getModelToken } = require('@nestjs/mongoose');
const { Types } = require('mongoose');

const LOCALE = process.argv[2] || 'pt-BR';
const STORE_ID = new Types.ObjectId(process.env.DEMO_STORE_ID);

const NAMES = {
  'pt-BR': ['Ana Souza','Bruna Lima','Carla Mendes','Diego Rocha','Elisa Prado','Fernanda Alves','Gabriel Nunes','Helena Castro','Iara Duarte','João Pedro','Karen Dias','Luana Freire','Marina Costa','Nina Barros','Otávio Reis','Paula Serra'],
  en: ['Emma Carter','Olivia Bennett','Sophia Hayes','Liam Turner','Ava Mitchell','Grace Foster','Noah Parker','Chloe Reed','Mia Collins','James Hughes','Lily Morgan','Ella Brooks','Zoe Bailey','Ruby Cooper','Owen Price','Nora Watson'],
  es: ['Lucía García','Martina López','Valeria Torres','Diego Fernández','Camila Ruiz','Paula Moreno','Mateo Díaz','Sofía Romero','Elena Navarro','Javier Castro','Carmen Vega','Alba Ortiz','Nerea Gil','Clara Marín','Hugo Serrano','Irene Campos'],
  fr: ['Camille Laurent','Léa Moreau','Chloé Dubois','Lucas Bernard','Manon Petit','Emma Roux','Hugo Fournier','Jade Girard','Louise Lambert','Nathan Mercier','Zoé Faure','Alice Blanc','Inès Henry','Clara Gauthier','Paul Renard','Eva Chevalier'],
  de: ['Lena Fischer','Mia Weber','Emma Schneider','Jonas Becker','Hannah Wagner','Laura Hoffmann','Felix Schäfer','Marie Koch','Sophie Richter','Paul Klein','Anna Wolf','Clara Neumann','Luisa Braun','Emilia Krüger','Max Werner','Johanna Lang'],
};
const WAITLIST = {
  'pt-BR': ['Renata Lopes','Sofia Andrade','Tiago Melo'],
  en: ['Ruby Dawson','Sarah Ellis','Tom Grant'],
  es: ['Rocío Salas','Sara Ibáñez','Tomás Prieto'],
  fr: ['Rose Dupont','Sarah Leroy','Théo Marchand'],
  de: ['Rosa Brandt','Sarah Ulrich','Tim Krause'],
};
const COMMENTS = {
  'pt-BR': ['Atendimento impecável, saí me sentindo outra pessoa!','A melhor coloração que já fiz. Voltarei com certeza.','Ambiente lindo e atendimento super pontual.','Amei o resultado! Recomendo demais.','Profissionais atenciosos do início ao fim.','Meu cabelo nunca ficou tão bonito.','','Chegou a me mandar lembrete no WhatsApp, adorei o cuidado.'],
  en: ['Flawless service — I left feeling like a new person!','The best color I have ever had. I will definitely be back.','Beautiful space and always right on time.','Loved the result! Highly recommend.','Caring professionals from start to finish.','My hair has never looked this good.','','They even sent me a WhatsApp reminder — loved the attention.'],
  es: ['Atención impecable, ¡salí sintiéndome otra persona!','La mejor coloración que me han hecho. Volveré seguro.','Un espacio precioso y siempre puntuales.','¡Me encantó el resultado! Lo recomiendo muchísimo.','Profesionales atentos de principio a fin.','Mi pelo nunca se vio tan bonito.','','Hasta me enviaron un recordatorio por WhatsApp, me encantó.'],
  fr: ['Service impeccable — je suis repartie transformée !','La meilleure coloration de ma vie. Je reviendrai, c’est sûr.','Un cadre magnifique et toujours à l’heure.','J’adore le résultat ! Je recommande vivement.','Des professionnels attentionnés du début à la fin.','Mes cheveux n’ont jamais été aussi beaux.','','Ils m’ont même envoyé un rappel WhatsApp — j’ai adoré.'],
  de: ['Tadelloser Service — ich fühlte mich wie neugeboren!','Die beste Coloration, die ich je hatte. Ich komme wieder.','Wunderschöne Räume und immer pünktlich.','Das Ergebnis ist toll! Absolute Empfehlung.','Aufmerksame Profis von Anfang bis Ende.','Meine Haare sahen nie besser aus.','','Sogar eine WhatsApp-Erinnerung kam — so viel Fürsorge!'],
};
const SERVICES = {
  'pt-BR': { '60:120': 'Corte Feminino', '120:280': 'Coloração Completa', '45:60': 'Manicure', '30:45': 'Design de Sobrancelha', '90:150': 'Corte + Sobrancelha' },
  en: { '60:120': "Women's Haircut", '120:280': 'Full Color', '45:60': 'Manicure', '30:45': 'Brow Design', '90:150': 'Cut + Brows' },
  es: { '60:120': 'Corte de Cabello', '120:280': 'Coloración Completa', '45:60': 'Manicura', '30:45': 'Diseño de Cejas', '90:150': 'Corte + Cejas' },
  fr: { '60:120': 'Coupe Femme', '120:280': 'Coloration Complète', '45:60': 'Manucure', '30:45': 'Design de Sourcils', '90:150': 'Coupe + Sourcils' },
  de: { '60:120': 'Damenhaarschnitt', '120:280': 'Komplette Coloration', '45:60': 'Maniküre', '30:45': 'Augenbrauen-Design', '90:150': 'Schnitt + Brauen' },
};

(async () => {
  const { AppModule } = require('/app/apps/api/dist/app.module');
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const conn = app.get(getModelToken('Store'), { strict: false }).db;
  const names = NAMES[LOCALE]; const comments = COMMENTS[LOCALE];
  const svc = SERVICES[LOCALE]; const wl = WAITLIST[LOCALE];

  // offeringId → nome localizado (assinatura duração:preço)
  const offs = await conn.collection('agendaofferings').find({ storeId: STORE_ID }).toArray();
  const nameById = new Map(offs.map((o) => [String(o._id), svc[`${o.durationMin}:${o.price}`]]).filter(([, n]) => n));

  // Agendamentos: nome do cliente (determinístico por ordem) + snapshot do serviço
  const appts = await conn.collection('appointments').find({ storeId: STORE_ID }).sort({ startAt: 1 }).toArray();
  let i = 0;
  for (const a of appts) {
    const set = { 'visitor.name': names[i % names.length] };
    const localized = nameById.get(String(a.offeringId));
    if (localized) set['offering.name'] = localized;
    await conn.collection('appointments').updateOne({ _id: a._id }, { $set: set });
    i++;
  }

  // Avaliações (ordem por createdAt) — nome deve casar com o agendamento? Não
  // precisa: são clientes plausíveis; usa o mesmo pool para coerência.
  const reviews = await conn.collection('agendareviews').find({ storeId: STORE_ID }).sort({ createdAt: 1 }).toArray();
  let r = 0;
  for (const rev of reviews) {
    await conn.collection('agendareviews').updateOne(
      { _id: rev._id },
      { $set: { visitorName: names[r % names.length], comment: comments[r % comments.length] } },
    );
    r++;
  }

  const entries = await conn.collection('agendawaitlistentries').find({ storeId: STORE_ID }).sort({ createdAt: 1 }).toArray();
  let w = 0;
  for (const e of entries) {
    await conn.collection('agendawaitlistentries').updateOne({ _id: e._id }, { $set: { name: wl[w % wl.length] } });
    w++;
  }

  console.log(`LOCALIZE ${LOCALE}: appts=${i} reviews=${r} waitlist=${w}`);
  process.exit(0);
})().catch((e) => { console.error('ERRO:', e.message); process.exit(1); });
