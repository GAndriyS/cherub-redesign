// Залишає в siteSettings лише один телефон. Запуск:
//   npx sanity exec scripts/patch-phones.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const client = getCliClient();

await client
  .patch("siteSettings")
  .set({
    phones: [{ _key: "p1", _type: "phone", display: "(068) 978 01 00", tel: "+380689780100" }],
  })
  .commit();

console.log("siteSettings.phones -> 1 number");
