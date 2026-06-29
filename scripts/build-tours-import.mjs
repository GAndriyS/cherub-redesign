// Збирає NDJSON для імпорту турів у Sanity з:
//  - scratchpad/tours.json       (текстові дані, витягнуті з heruvym.com.ua)
//  - scratchpad/tour-images.json (map slug -> [image URLs] із sitemap)
// Обкладинка завантажується під час `sanity dataset import` через _sanityAsset (image@URL).
//
// Запуск:  node scripts/build-tours-import.mjs <toursJson> <imagesJson> <outNdjson>

import { readFileSync, writeFileSync } from "node:fs";

const [toursPath, imagesPath, outPath] = process.argv.slice(2);
if (!toursPath || !imagesPath || !outPath) {
  console.error("usage: node build-tours-import.mjs <tours.json> <tour-images.json> <out.ndjson>");
  process.exit(1);
}

const readJson = (p) => {
  let s = readFileSync(p, "utf8");
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1); // strip UTF-8 BOM
  return JSON.parse(s);
};
const tours = readJson(toursPath);
const images = readJson(imagesPath);

const lines = [];
for (const t of tours) {
  if (!t.slug || !t.title) {
    console.warn("skip tour without slug/title:", JSON.stringify(t).slice(0, 80));
    continue;
  }
  // Віддаємо перевагу справжньому фото (JPG) над промо-картками (часто .png із вшитим текстом).
  const imgs = Array.isArray(images[t.slug]) ? images[t.slug] : [];
  const cover = imgs.find((u) => /\.jpe?g(\?|$)/i.test(u)) || imgs[0] || null;

  const doc = {
    _id: `tour-${t.slug}`,
    _type: "tour",
    title: t.title,
    slug: { _type: "slug", current: t.slug },
    withPriest: true,
  };

  if (Array.isArray(t.tags) && t.tags.length) doc.tags = t.tags;
  if (Number.isFinite(t.durationDays)) doc.durationDays = t.durationDays;
  if (t.dateStart) doc.dateStart = t.dateStart;
  if (t.dateEnd) doc.dateEnd = t.dateEnd;
  if (Number.isFinite(t.priceEur)) doc.priceEur = t.priceEur;
  if (t.summary) doc.summary = t.summary;
  if (Array.isArray(t.departurePoints) && t.departurePoints.length)
    doc.departurePoints = t.departurePoints;

  if (Array.isArray(t.program) && t.program.length) {
    doc.program = t.program.map((d, i) => ({
      _key: `d${i + 1}`,
      _type: "day",
      ...(Number.isFinite(d.dayNumber) ? { dayNumber: d.dayNumber } : { dayNumber: i + 1 }),
      ...(d.title ? { title: d.title } : {}),
      ...(Array.isArray(d.items) && d.items.length ? { items: d.items } : {}),
    }));
  }
  if (Array.isArray(t.included) && t.included.length) doc.included = t.included;
  if (Array.isArray(t.notIncluded) && t.notIncluded.length) doc.notIncluded = t.notIncluded;

  if (cover) doc.coverImage = { _type: "image", _sanityAsset: `image@${cover}` };

  lines.push(JSON.stringify(doc));
}

writeFileSync(outPath, lines.join("\n") + "\n", "utf8");
console.log(`Wrote ${lines.length} tour documents to ${outPath}`);
