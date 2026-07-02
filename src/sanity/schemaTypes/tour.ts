import { defineArrayMember, defineField, defineType } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Тур",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Назва", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Обкладинка",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Напрямки / теги",
      description: "Використовуються у фільтрі на головній (напр. «Меджугор'є», «Християнський відпочинок на морі»)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "durationDays",
      title: "Тривалість (днів)",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "dateStart", title: "Дата виїзду", type: "date", options: { dateFormat: "DD.MM.YYYY" } }),
    defineField({ name: "dateEnd", title: "Дата повернення", type: "date", options: { dateFormat: "DD.MM.YYYY" } }),
    defineField({ name: "priceEur", title: "Ціна, €", type: "number", validation: (r) => r.required().min(0) }),
    defineField({
      name: "highlightBadge",
      title: "Особливий бейдж",
      description: "Напр. «MLADIFEST». Якщо порожньо — показується тривалість у днях.",
      type: "string",
    }),
    defineField({ name: "summary", title: "Короткий опис", type: "text", rows: 3 }),
    defineField({
      name: "departurePoints",
      title: "Точки виїзду",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "withPriest", title: "Зі священиком", type: "boolean", initialValue: true }),
    defineField({
      name: "program",
      title: "Програма по днях",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "day",
          title: "День",
          fields: [
            defineField({ name: "dayNumber", title: "День №", type: "number" }),
            defineField({ name: "title", title: "Заголовок дня", type: "string" }),
            defineField({
              name: "items",
              title: "Пункти",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "photos",
              title: "Фото",
              type: "array",
              of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
            }),
          ],
          preview: {
            select: { title: "title", dayNumber: "dayNumber" },
            prepare: ({ title, dayNumber }) => ({
              title: title || "День",
              subtitle: dayNumber ? `День ${dayNumber}` : "",
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "included",
      title: "Входить у вартість",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "notIncluded",
      title: "Не входить у вартість",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", price: "priceEur" },
    prepare: ({ title, media, price }) => ({
      title,
      subtitle: price ? `€${price}` : "",
      media,
    }),
  },
});
