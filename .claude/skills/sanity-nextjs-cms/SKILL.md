---
name: sanity-nextjs-cms
description: Integrate Sanity CMS into a Next.js App Router app so non-technical editors manage content — schemas, embedded Studio at /studio, typed GROQ fetching with ISR, and the production gotchas (createContext, env hardening, CDN caching). Use when adding a headless CMS to a Next.js site.
---

# Sanity CMS in Next.js (App Router)

## When to use
Content must be editable by non-technical people without touching code. Sanity = hosted headless CMS: editors fill fields in a web Studio; Next.js reads via GROQ and renders in your design.

## Install
`npm i sanity next-sanity @sanity/image-url @sanity/vision @portabletext/react styled-components`

## Structure
- `sanity.config.ts` (root): `defineConfig({ basePath:"/studio", projectId, dataset, schema, plugins:[structureTool({structure}), visionTool()] })`.
- `src/sanity/schemaTypes/*` — `defineType`/`defineField`. Singletons (`siteSettings`, `homePage`) pinned via a desk `structure.ts` with fixed `documentId`. Documents (`tour`) for repeatable content; arrays of objects need `_key`.
- `src/sanity/client.ts` — `createClient({ projectId, dataset, apiVersion, useCdn })`.
- `src/sanity/image.ts` — `createImageUrlBuilder(client)` → `urlFor()`.
- `src/sanity/queries.ts` — GROQ strings.
- `src/lib/*` — fetchers that map raw docs to typed view models, with a **fallback to demo/static content** when Sanity is empty/unreachable (site never breaks).
- `src/app/studio/[[...tool]]/page.tsx` — embedded Studio.
- `next.config.ts` — `images.remotePatterns` for `cdn.sanity.io`.
- ISR: `export const revalidate = 60` on pages/layout that fetch.

## Critical gotchas
- **Embedded Studio MUST be wrapped in a `"use client"` component.** Importing `sanity.config` (which pulls `@sanity/ui`) into the server page throws `createContext only works in Client Components` at build. Make `Studio.tsx` a `"use client"` file that imports the config + renders `<NextStudio>`, and have `page.tsx` render `<Studio/>`.
- **Harden env parsing** in `client.ts` — a malformed `NEXT_PUBLIC_SANITY_API_VERSION` (stray quotes/space pasted in a host dashboard) makes `createClient` throw `Invalid API version string` and **breaks the production build**. Strip quotes/whitespace and validate (`/^(1|v?\d{4}-\d{2}-\d{2})$/`) with a safe fallback.
- **`@sanity/image-url`**: use the **named** `createImageUrlBuilder`, not the deprecated default export. `SanityImageSource` type imports from `@sanity/image-url` (root), not a deep path.
- **Stale content after edits/seed**: with `useCdn:true` the CDN lags ~60s; for ISR freshness use `useCdn:false` (Next's `revalidate` caches). After a bulk write, edits may stay stale until cache busts — clear `.next` + restart dev to force-refresh during local verification.
- **CORS**: the Studio (client-side) needs the origin in Sanity CORS to authenticate. Local dev: click "Add development host" in the Studio, or `npx sanity cors add <url> --credentials`.
- Project setup needs the owner's Sanity login (`npx sanity login`) or a `projectId`.
