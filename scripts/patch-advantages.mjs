// Оновлює переваги на головній: перейменовує першу, прибирає «Виїзди із Заходу».
//   npx sanity exec scripts/patch-advantages.mjs --with-user-token
import { getCliClient } from "sanity/cli";

const client = getCliClient();

await client
  .patch("homePage")
  .set({
    advantages: [
      {
        _key: "a1",
        _type: "advantage",
        icon: "priest",
        title: "Супровід духівника та керівника групи",
        text: "Щоденна Літургія та духовний провід усією дорогою.",
      },
      {
        _key: "a2",
        _type: "advantage",
        icon: "hotel",
        title: "Готелі 3★",
        text: "Проживання й харчування згідно з програмою.",
      },
      {
        _key: "a3",
        _type: "advantage",
        icon: "bus",
        title: "Автобус єврокласу",
        text: "Зручний переїзд усім маршрутом.",
      },
    ],
  })
  .commit();

console.log("homePage.advantages -> 3 items (renamed first, removed 'Виїзди із Заходу')");
