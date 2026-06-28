import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Головна сторінка",
  type: "document",
  groups: [
    { name: "hero", title: "Герой" },
    { name: "sections", title: "Секції" },
  ],
  fields: [
    defineField({ name: "heroBadge", title: "Бейдж", type: "string", group: "hero" }),
    defineField({ name: "heroTitleTop", title: "Заголовок — перший рядок", type: "string", group: "hero" }),
    defineField({
      name: "heroTitleAccent",
      title: "Заголовок — акцент (курсив, золото)",
      type: "string",
      group: "hero",
    }),
    defineField({ name: "heroSubtitle", title: "Підзаголовок", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroImage",
      title: "Фото героя",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroStats",
      title: "Статистика",
      type: "array",
      group: "hero",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Число", type: "string" }),
            defineField({ name: "label", title: "Підпис", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({ name: "nearestDepartureDate", title: "Найближчий виїзд — дата", type: "string", group: "hero" }),
    defineField({
      name: "nearestDepartureTitle",
      title: "Найближчий виїзд — напрямок",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "tourFilters",
      title: "Фільтри турів",
      description: "Перший — «Усі». Інші мають збігатися з тегами турів.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "sections",
    }),
    defineField({
      name: "destinations",
      title: "Напрямки (пігулки)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "sections",
    }),
    defineField({
      name: "advantages",
      title: "Переваги",
      type: "array",
      group: "sections",
      of: [
        defineArrayMember({
          type: "object",
          name: "advantage",
          fields: [
            defineField({
              name: "icon",
              title: "Іконка",
              type: "string",
              options: {
                list: [
                  { title: "Священик", value: "priest" },
                  { title: "Готель", value: "hotel" },
                  { title: "Автобус", value: "bus" },
                  { title: "Виїзд", value: "departure" },
                ],
              },
            }),
            defineField({ name: "title", title: "Заголовок", type: "string" }),
            defineField({ name: "text", title: "Текст", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        }),
      ],
    }),
    defineField({ name: "ctaTitle", title: "CTA — заголовок", type: "string", group: "sections" }),
    defineField({ name: "ctaText", title: "CTA — текст", type: "text", rows: 2, group: "sections" }),
  ],
  preview: { prepare: () => ({ title: "Головна сторінка" }) },
});
