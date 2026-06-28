import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Налаштування сайту",
  type: "document",
  fields: [
    defineField({ name: "logo", title: "Логотип", type: "image" }),
    defineField({
      name: "phones",
      title: "Телефони",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "phone",
          fields: [
            defineField({ name: "display", title: "Як показувати", type: "string" }),
            defineField({ name: "tel", title: "Для дзвінка (напр. +380...)", type: "string" }),
          ],
          preview: { select: { title: "display", subtitle: "tel" } },
        }),
      ],
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Адреса", type: "string" }),
    defineField({ name: "facebook", title: "Facebook (URL)", type: "url" }),
    defineField({ name: "instagram", title: "Instagram (URL)", type: "url" }),
    defineField({ name: "footerNote", title: "Опис у футері", type: "text", rows: 2 }),
    defineField({
      name: "nav",
      title: "Меню",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          fields: [
            defineField({ name: "label", title: "Підпис", type: "string" }),
            defineField({ name: "href", title: "Посилання", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Налаштування сайту" }) },
});
