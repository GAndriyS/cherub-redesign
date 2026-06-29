---
name: deploy-nextjs-vercel
description: Deploy a Next.js (App Router) + Sanity site to Vercel — env vars, the apiVersion build gotcha, CLI deploy with a token, Sanity CORS for the prod Studio, and post-deploy verification. Use when shipping a Next.js app with server routes/ISR to production. (Note why GitHub Pages is the wrong host.)
---

# Deploy Next.js + Sanity to Vercel

## When to use
Shipping a Next.js app that has **API routes** (e.g. Telegram lead), **ISR**, image optimization, and an embedded Studio. **Not a static export** — so GitHub Pages won't work (no server → `/api/*` and live content break). Vercel/Netlify/Cloudflare are the right hosts; Vercel is the default for Next.js.

## Path A — GitHub integration (recommended)
1. vercel.com → import the GitHub repo. Vercel auto-detects Next.js (no build config).
2. Add **Environment Variables** (Production + Preview), values **plain — no quotes/spaces**:
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
3. Deploy. Every push to `main` auto-deploys.

## Path B — CLI (when you have a token)
- Owner creates a token at vercel.com/account/tokens (short expiry; revoke after).
- `npx vercel link --yes --project <name> --token $T`
- `npx vercel env ls --token $T` (inspect) / re-set if malformed.
- `npx vercel --prod --yes --token $T` — builds on Vercel from local source, returns the URL.

## After deploy
- **Sanity CORS for the Studio**: `npx sanity cors add https://<app>.vercel.app --credentials` so editors can log into `/studio` on prod.
- **Verify prod**: real content loads (env correct), `POST /api/lead` → `{delivered:true}` (Telegram works), `/studio` → 200.
- Custom domain: Vercel → Project → Settings → Domains. Instant content updates: Sanity webhook → Vercel Deploy Hook (otherwise ISR `revalidate` updates within ~60s).

## Gotchas
- **`Invalid API version string` build crash**: a quoted/whitespace `NEXT_PUBLIC_SANITY_API_VERSION` makes `createClient` throw during build. Fix the env value AND harden `client.ts` (see `sanity-nextjs-cms`).
- `.gitignore` must include `.vercel` and `.env*` (vercel link adds `.vercel`).
- `vercel link` writes a `VERCEL_OIDC_TOKEN` into `.env.local` — harmless, gitignored.
- A production deploy is high-severity: only trigger it on the user's explicit per-deploy intent.
