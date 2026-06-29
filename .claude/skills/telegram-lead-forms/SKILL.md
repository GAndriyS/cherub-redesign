---
name: telegram-lead-forms
description: Add lead-capture forms (callback / booking / contact) to a Next.js site that deliver submissions to Telegram via a serverless API route, with validation, anti-spam, and human-readable source. Use when a site needs conversion forms that notify a manager instantly.
---

# Lead forms → Telegram

## When to use
A site needs forms (e.g. "Залишити заявку", booking, contact) whose submissions reach a manager immediately. Telegram is ideal for small businesses — instant, free, on the phone.

## Server: `src/app/api/lead/route.ts`
- `POST` handler. Validate with **zod** (name + phone required; cap lengths). Include a **honeypot** field (e.g. `company`) — if filled, silently return ok.
- Build an HTML message (`escapeHtml` user input) and `fetch` the Telegram Bot API:
  `https://api.telegram.org/bot<TOKEN>/sendMessage` with `{ chat_id, text, parse_mode:"HTML" }`.
- Env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`. **Degrade gracefully**: if unset, log the lead and return `{ ok:true, delivered:false }` so dev/UX never breaks. Return clear error strings on failure.

## Client forms
- Controlled or `FormData` forms posting JSON to `/api/lead`; phone defaults to `+380`; states `idle/submitting/success/error`.
- Reuse: a `LeadFormProvider` (React context) with `openLeadForm()` drives one shared modal opened from header CTA / hero / mobile menu; inline mini-forms (CTA banner, booking, contact page) post to the same endpoint.
- **Source = human-readable page name, not a widget slug.** Compute it client-side from the route: `pageNameFromPath(usePathname())` → "Домашня сторінка" / "Сторінка контактів". A non-technical manager reading Telegram needs the page, not `hero`/`header-cta`.

## Setup (one-time, needs the owner)
1. Create a bot via **@BotFather** → get the token.
2. Get the `chat_id`: have the owner message the bot once, then `GET /bot<TOKEN>/getUpdates` → read `result[].message.chat.id` (private chat = positive id; group = negative). For a team, add the bot to a group and use that id.
3. Put both in `.env.local` (gitignored) and in the host's env vars for production.

## Verify
POST a test payload to `/api/lead` (local and prod) — expect `{ ok:true, delivered:true }` and a real Telegram message.
