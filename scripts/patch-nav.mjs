// Оновлює href пунктів меню в siteSettings на англійські роути.
//   npx sanity exec scripts/patch-nav.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const client = getCliClient();

await client
  .patch("siteSettings")
  .set({
    nav: [
      { _key: "n1", _type: "navItem", label: "Головна", href: "/" },
      { _key: "n2", _type: "navItem", label: "Паломництва", href: "/tours" },
      { _key: "n3", _type: "navItem", label: "Контакти", href: "/contacts" },
    ],
  })
  .commit();

console.log("Updated siteSettings.nav hrefs -> /, /tours, /contacts");
