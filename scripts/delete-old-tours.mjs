// Видаляє старі демо/«за запитом» тури (seed). Запуск:
//   npx sanity exec scripts/delete-old-tours.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const client = getCliClient();

const oldIds = [
  "tour-medjugorje-more-2",
  "tour-split-adriatica",
  "tour-mladifest-2026",
  "tour-medjugorje-anniversary",
  "tour-holy-land",
  "tour-europe-fatima",
  "tour-rome-vatican",
  "tour-georgia",
  "tour-ukraine-shrines",
];

const tx = client.transaction();
oldIds.forEach((id) => tx.delete(id));
await tx.commit({ visibility: "async" });
console.log("Requested deletion of", oldIds.length, "old seed tours");

const remaining = await client.fetch('count(*[_type=="tour"])');
console.log("Tours remaining in dataset:", remaining);
