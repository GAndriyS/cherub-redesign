# Skills — процеси проєкту «Херувим»

Набір Claude Code Skills, що документують усі процеси й рішення, застосовані при побудові цього сайту (редизайн паломницького центру: Next.js 16 App Router + Tailwind v4 + Sanity CMS + Telegram-заявки, деплой на Vercel). Кожен скіл — самодостатній плейбук із кроками та «граблями», на яких ми вже спіткнулись.

## Скіли

| Скіл | Про що |
|---|---|
| [`design-handoff-to-nextjs`](design-handoff-to-nextjs/SKILL.md) | Реалізація hi-fi дизайн-хендофу як Next.js + Tailwind v4: токени в `@theme`, шрифти, UI-примітиви, адаптив, звіряння через Preview MCP. |
| [`sanity-nextjs-cms`](sanity-nextjs-cms/SKILL.md) | Інтеграція Sanity: схеми, вбудована Studio на `/studio`, типізовані GROQ-запити з ISR, і ключові граблі (createContext, env-hardening, CDN-кеш). |
| [`content-migration-to-sanity`](content-migration-to-sanity/SKILL.md) | Міграція реального контенту з WordPress у Sanity: пошук прихованого CPT через sitemap, витягання даних, імпорт фото через `_sanityAsset`. |
| [`telegram-lead-forms`](telegram-lead-forms/SKILL.md) | Форми-заявки (модалка/бронювання/контакти) → Telegram через API-роут: валідація, honeypot, людська назва джерела. |
| [`deploy-nextjs-vercel`](deploy-nextjs-vercel/SKILL.md) | Деплой Next.js + Sanity на Vercel: env-змінні, граблі з `apiVersion`, CLI-деплой, CORS для Studio, перевірка прода. |

## Стек і факти проєкту
- **Фронтенд:** Next.js 16 (App Router, TypeScript, Turbopack), Tailwind v4 (CSS-first `@theme`), `next/font` (Manrope + Playfair Display), `lucide-react`, `zod`.
- **CMS:** Sanity (хмарна), вбудована Studio на `/studio`, контент через GROQ + ISR (`revalidate: 60`).
- **Заявки:** серверний роут `/api/lead` → Telegram Bot API.
- **Сторінки:** `/` (головна), `/tours` (каталог із фільтром/пошуком/пагінацією), `/tours/[slug]` (картка туру, SSG), `/contacts`, `/studio`.
- **Деплой:** Vercel (GitHub-connected, авто-деплой `main`).
- **Робочий процес:** план перед імплементацією → гілка на фічу → PR → merge → деплой.
