// Перейменовує тег «Море + молитва» -> «Християнський відпочинок на морі» на всіх турах
// та у homePage.tourFilters (щоб фільтр і бейджі працювали з новою назвою).
//   npx sanity exec scripts/rename-sea-tag.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const client = getCliClient();
const OLD = "Море + молитва";
const NEW = "Християнський відпочинок на морі";

const tours = await client.fetch(`*[_type=="tour" && $old in tags]{_id, tags}`, { old: OLD });
const hp = await client.fetch(`*[_type=="homePage"][0]{_id, tourFilters}`);

const tx = client.transaction();
for (const t of tours) {
  tx.patch(t._id, (p) => p.set({ tags: (t.tags || []).map((x) => (x === OLD ? NEW : x)) }));
}
if (hp?._id) {
  tx.patch(hp._id, (p) =>
    p.set({ tourFilters: (hp.tourFilters || []).map((x) => (x === OLD ? NEW : x)) }),
  );
}
await tx.commit();

console.log(`Renamed tag on ${tours.length} tours + homePage.tourFilters`);
