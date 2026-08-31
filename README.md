# Херувим — сайт паломницького центру

Сайт [Паломницького центру «Херувим»](https://heruvym.com.ua) (Львів): каталог паломництв до Меджугор'є та святинь Європи з онлайн-заявками, які миттєво прилітають менеджерам у Telegram, і CMS, у якій контент редагують без програміста.

**Прод:** https://heruvym.com.ua · **Адмінка:** https://heruvym.com.ua/studio

## Стек

| Шар | Технологія |
|---|---|
| Фронтенд | [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19, TypeScript |
| Стилі | [Tailwind CSS v4](https://tailwindcss.com), дизайн-токени з хендофу |
| CMS | [Sanity](https://www.sanity.io) — вбудована Studio на `/studio`, типізовані GROQ-запити |
| Заявки | API-роут `/api/lead` → Telegram Bot API (zod-валідація, honeypot-антиспам) |
| Хостинг | [Vercel](https://vercel.com) — авто-деплой з `main`, ISR-кеш 60 с |

## Можливості

- **Каталог турів** — фільтри за напрямками, пошук, пагінація, детальні сторінки з програмою по днях
- **Лід-форми** (заявка / бронювання / контакти) — доставка в Telegram-групу менеджерів із назвою туру, датами та посиланням
- **Редагування контенту** — тури, головна сторінка й контакти правляться в Studio; зміни на сайті протягом хвилини (ISR), без передеплою
- **SSG + ISR** — сторінки віддаються статикою і тихо оновлюються у фоні

## Швидкий старт

```bash
npm install
cp .env.example .env.local   # заповнити значення (див. таблицю нижче)
npm run dev                  # http://localhost:3000
```

### Змінні середовища

| Змінна | Призначення |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID Sanity-проєкту |
| `NEXT_PUBLIC_SANITY_DATASET` | Датасет (зазвичай `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Версія API, формат `YYYY-MM-DD` |
| `TELEGRAM_BOT_TOKEN` | Токен бота, який шле заявки |
| `TELEGRAM_CHAT_ID` | ID чату/групи одержувачів заявок |

Без Sanity-змінних сайт працює на демо-контенті з `src/lib/demo-content.ts`; без Telegram-змінних форми відповідають успіхом, але нічого не надсилають (`delivered: false`).

## Структура

```
src/
  app/            # маршрути: головна, /tours, /tours/[slug], /contacts, /studio, /api/lead
  components/     # UI за розділами (home, catalog, tour, contacts, lead, layout)
  lib/            # фетчери даних, маппери, демо-фолбеки, форматування дат
  sanity/         # клієнт, схеми документів (tour, homePage, siteSettings), GROQ-запити
scripts/          # одноразові скрипти імпорту/правок контенту в Sanity
```

## Деплой

Push у `main` → Vercel збирає і викочує прод автоматично; кожен PR отримує preview-деплой. Ручний деплой: `npx vercel --prod`. Деталі процесу (env, CORS для Studio, ISR-нюанси) — у `.claude/skills/deploy-nextjs-vercel/`.

## Команди

```bash
npm run dev     # дев-сервер
npm run build   # прод-білд
npm run lint    # ESLint
```
