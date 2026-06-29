---
name: content-migration-to-sanity
description: Migrate real content (e.g. tours/articles) from a live WordPress site into Sanity — discover hidden custom-post-types via the sitemap, extract structured data, and import with images via _sanityAsset. Use when scraping/importing existing site content into a Sanity dataset.
---

# Migrate WordPress content → Sanity

## When to use
You need the real content from an existing (often WordPress) site inside Sanity, with images, mapped to your schema.

## 1. Discover the content
- WP REST API: `GET /wp-json/wp/v2/types` lists post types; `/posts`, `/pages` list those.
- **Custom post types are often hidden from REST** (`show_in_rest:false`). Find them via the **sitemap**: `GET /sitemap_index.xml` (Yoast) lists sub-sitemaps incl. the CPT (e.g. `palomnytstvo-sitemap.xml`) and taxonomies. Each `<url>` block also has `<image:loc>` entries → a per-page image list for free.
- Fetch raw XML/HTML with PowerShell `Invoke-WebRequest -UseBasicParsing` + a browser `User-Agent` header (WAFs block default UAs; `Invoke-WebRequest` without `-UseBasicParsing` can hang in non-interactive shells).

## 2. Extract structured data
- Parse the sitemap (regex on `<url>`/`<loc>`/`<image:loc>`) → `{ slug: [imageUrls] }`.
- Extract per-page fields (title, price, dates, program, included…) with **WebFetch** — reliable for prose. For many pages, delegate to one general-purpose Agent that WebFetches each URL and writes a single validated JSON array to a file.

## 3. Build the import NDJSON
- One JSON document per line. `_id`, `_type`, slug as `{_type:"slug",current}`, arrays-of-objects need `_key`, omit unknown fields (so cards render "price on request"/"dates TBA").
- **Images: download-at-import** with `coverImage: { _type:"image", _sanityAsset: "image@<URL>" }`. `@sanity/import` (v6) downloads the URL and creates the asset — no token, no manual upload. Prefer a real photo (`.jpg`) over promo/card `.png` covers.

## 4. Import & replace
- `npx sanity dataset import file.ndjson --dataset production --replace` (uses your CLI login; downloads + uploads assets).
- Delete superseded docs with `npx sanity exec script.mjs --with-user-token` where the script uses `getCliClient()` and a `client.transaction()` of `.delete(id)` (or `client.delete({query}))`. CLI login persists — no API token needed.

## Gotchas
- **PowerShell writes UTF-8 with BOM** → strip a leading `﻿` before `JSON.parse`.
- **PowerShell console mojibake ≠ file corruption** — the file can be correct UTF-8; verify with the Read tool, not the console echo.
- Build commit messages without literal `"` double-quotes — PowerShell breaks native-arg passing (use a single-quoted here-string with no inner `"`, or `-F file`).
