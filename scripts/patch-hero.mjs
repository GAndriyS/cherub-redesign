// Оновлює герой головної: підзаголовок, статистику (2 показники), фільтри (без «Свята Земля»).
//   npx sanity exec scripts/patch-hero.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const client = getCliClient();

await client
  .patch("homePage")
  .set({
    heroSubtitle:
      "Духовні подорожі до Меджугор'є, святинь України та Європи. Час молитви, тиші та внутрішнього відновлення.",
    heroStats: [
      { _key: "s1", _type: "stat", value: "9+", label: "років досвіду" },
      { _key: "s2", _type: "stat", value: "500+", label: "груп" },
    ],
    tourFilters: ["Усі", "Меджугор'є", "Море + молитва"],
  })
  .commit();

console.log("homePage updated: heroSubtitle, heroStats (2), tourFilters (no Свята Земля)");
