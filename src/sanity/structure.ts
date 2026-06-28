import type { StructureResolver } from "sanity/structure";

/** Бічне меню Studio: синглтони + список турів. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Контент")
    .items([
      S.listItem()
        .title("Налаштування сайту")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Головна сторінка")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.divider(),
      S.documentTypeListItem("tour").title("Тури"),
    ]);
