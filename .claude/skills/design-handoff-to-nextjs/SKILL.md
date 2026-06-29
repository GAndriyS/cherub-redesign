---
name: design-handoff-to-nextjs
description: Implement a high-fidelity HTML/Figma design handoff as a Next.js (App Router) + Tailwind v4 site — set up design tokens, fonts, UI primitives, responsive breakpoints, and verify pixel-fidelity. Use when given design reference files (tokens, page mockups) to reproduce in code.
---

# Design handoff → Next.js + Tailwind

## When to use
You receive a hi-fi design handoff (HTML/`.dc.html` reference pages, design tokens, breakpoints) and must reproduce it in a codebase. Reproduce the *intent* with the stack's idioms — do not copy prototype markup verbatim.

## Process
1. **Read the handoff fully first**: tokens (colors, fonts, radii, shadows, container), every page's section structure, responsive breakpoints, and interaction notes. Note which assets are placeholders vs real.
2. **Scaffold** (only after a plan is approved):
   `npx create-next-app@latest <dir> --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack --yes`
   - `create-next-app` rejects a non-empty dir; temporarily move `README.md` aside (it allows `.git`, `LICENSE`).
   - Latest scaffolds **Tailwind v4** (CSS-first config — tokens go in `globals.css` via `@theme`, no `tailwind.config.js`).
3. **Design tokens** → `src/app/globals.css` inside `@theme`: define `--color-*`, `--font-*`, custom `--radius-*`/`--shadow-*`, and `--breakpoint-*`. Map the handoff's desktop-first max-width breakpoints to Tailwind's mobile-first (`md`/`lg`) — e.g. `--breakpoint-md: 681px; --breakpoint-lg: 981px`.
4. **Fonts** via `next/font/google` in the root layout; expose CSS variables (`--font-...`) referenced from `@theme` `--font-sans`/`--font-serif`. Include the right `subsets` (e.g. `cyrillic`).
5. **UI primitives** (`src/components/ui/`): `Container`, `Button` (variant + **size** as separate args), `Chip`, `Badge`. Encapsulate repeated styles.
6. **Build sections/pages** matching the handoff top-to-bottom; replace striped placeholders with real images.
7. **Verify** with the Preview MCP: screenshot at desktop/tablet/mobile widths, compare to the handoff, test interactions (menu, modals, forms).

## Gotchas (hard-won)
- **Tailwind utility conflicts**: never put two utilities targeting the same CSS property on one element (e.g. base `inline-flex` + a `hidden` override, or `px-7` + `px-[22px]`). Stylesheet order — not class order — wins, so it's unpredictable. Fixes: give `Button` a separate `size` arg (base has no padding); to hide a flex button responsively, wrap it in `<div className="hidden md:block">`.
- **No `tailwind-merge`** by default — a tiny `cn()` join is fine if you avoid conflicting utilities.
- Use the Preview MCP (`preview_start`/`screenshot`/`inspect`), not manual "please check" — verify and show proof.
- Windows: ignore `LF will be replaced by CRLF` git warnings.
