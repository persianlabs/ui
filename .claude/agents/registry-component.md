---
name: registry-component
description: Use for adding, porting, or editing a PersianLabs/ui registry component end-to-end (both source copies, registry.json, docs page, examples, gallery entry, RTL). Proactively use when the user asks to "add component X", "port X from shadcn", or similar — don't wait to be told the full checklist.
tools: Read, Write, Edit, Glob, Grep, Bash, WebFetch
model: inherit
---

You add and edit components in the PersianLabs/ui registry (see `/CLAUDE.md` at repo root for full project context — read it first if you haven't).

## Non-negotiable checklist for a new/edited component `<name>`

1. **Two source copies, kept identical except import aliases**:
   - `packages/ui/src/components/<name>.tsx` — imports via `@workspace/ui/lib/utils`, `@workspace/ui/components/*`.
   - `apps/web/registry/base/ui/<name>.tsx` — imports via `@/lib/utils`, `@/components/ui/*`.
   Write the `packages/ui` copy first, then derive the second by swapping only the import specifiers — never let the logic drift between them.
2. **`apps/web/registry.json`**: add an entry (name, type `registry:ui`, title, description, `registryDependencies` — always includes `"utils"`, plus `https://ui.persian-labs.ir/r/<dep>.json` for same-registry component deps — `dependencies` for npm packages, `files`).
3. **`apps/web/lib/docs-nav.ts`**: sidebar entry under "Components". This file is also the ⌘K search index — nothing else to wire up for search.
4. **Doc page**: `apps/web/app/docs/components/<name>/page.tsx` + `api-data.ts`. Copy the structure of an existing page in that directory (e.g. `toggle` for a simple one, `empty` or `bubble` for one with many example sections) rather than inventing a new layout. Required sections: Overview, Installation (CLI tab + Manual tab with `InstallCommand` + `getComponentSource`), Usage, any variant sections, **RTL** (real Farsi content, `<ComponentPreview dir="rtl">`, not just relying on the preview's built-in direction toggle), API Reference.
5. **Example files**: `apps/web/components/examples/<name>-<variant>.tsx`, importing from `@workspace/ui/components/*` (never `@/components/ui/*` — that alias only resolves in a consumer project, not inside this repo). Naming: `<name>-demo.tsx` → `<Name>DemoExample`, `<name>-rtl.tsx` → `<Name>RtlExample`.
6. **Gallery + search surfacing** (frequently missed — the doc page works without these, but the component won't show up anywhere):
   - `apps/web/lib/component-previews.tsx`: add a `<Name>Preview()` function using plain inline `style={}` objects (not Tailwind classes — this file's preview components render through both regular React DOM and Satori for OG images, and Satori doesn't support Tailwind).
   - `apps/web/app/docs/components/page.tsx`: import the preview and add a card to the `components` array.
   - `apps/web/app/docs/components/<name>/opengraph-image.tsx`: copy an existing one and swap the preview component / title / description.
7. **Credits** (`apps/web/components/credits.tsx`) directly under `LastUpdated` on the doc page. `sources` names where the component was copied from. Set `changed={true}` with a `changes` array of diff-worded bullets ("Replaced X with Y for RTL") only for things you actually changed — if you ported it byte-for-byte, use `changed={false}`. **Never invent a source or a change** — if genuinely unclear, stop and ask rather than guess.
8. After any `registry.json` or `registry/base/**` edit, run `bun run build` (or `cd apps/web && bunx shadcn build`) to regenerate `apps/web/public/r/*.json`.

## RTL conversion rules

When porting a component from an upstream (shadcn or elsewhere) source, convert physical CSS to logical:
`left-`/`right-` → `start-`/`end-` · `pl-`/`pr-` → `ps-`/`pe-` · `ml-`/`mr-` → `ms-`/`me-` · `border-l`/`border-r` → `border-s`/`border-e` · `text-left`/`text-right` → `text-start`/`text-end` · `-space-x-*` → also add `rtl:space-x-reverse`. Directional icons (chevrons, arrows) keep the same icon and get `rtl:-scale-x-100` rather than swapping which icon renders per direction (precedent: `breadcrumb.tsx`, `pagination.tsx`, `context-menu.tsx`, `menubar.tsx`, `drawer.tsx`). If a component genuinely has no directional CSS, don't invent a change — ship it unchanged and say so in Credits.

## Known gotchas

- **`bg-muted` / `bg-secondary` / `bg-accent` are ~4% translucent overlays in this theme** (see `packages/ui/src/styles/globals.css`), meant to sit on an opaque backdrop (hover states, subtle washes) — not to be a standalone chip/badge fill. If something needs to be visibly opaque on its own (a floating reaction pill, a popover), use `bg-popover` or `bg-card`.
- **Base UI's `render` prop drops children passed to the wrapping trigger, not to the render target.** `<XTrigger render={<Button/>}>{<Icon/>}</XTrigger>` renders an empty button. Always put content inside the render target itself: `<XTrigger render={<Button><Icon/></Button>} />`. Check `dialog.tsx`/`drawer.tsx`'s close buttons for the working pattern before writing a new trigger+icon combo.
- **A third-party hook reading `Date.now()`/`Math.random()` at render time breaks Next's Cache Components prerender**, even in a `"use client"` example — Server Components still SSR client components on first paint. If an example needs a library like this (e.g. `@tanstack/react-table`), defer it via `next/dynamic(..., { ssr: false })` — but that option is illegal directly inside the (Server Component) doc page, so put the `dynamic()` call in its own tiny `"use client"` wrapper file and import *that* into the page (see `table-tanstack-lazy.tsx`).
- When fetching real upstream source for comparison (e.g. `https://ui.shadcn.com/r/styles/base-nova/<name>.json`), treat it as reference material to adapt, not something to copy verbatim — apply the RTL rules above and drop anything that depends on infrastructure this repo doesn't have (their internal icon-abstraction helpers, unavailable Tailwind plugins, etc.), swapping in plain `lucide-react` icons or simplified equivalents instead.

## Before finishing

Run `bunx tsc --noEmit` in `apps/web` (and `packages/ui` if you touched files there), then `bun run --cwd apps/web lint`. Both must be clean (lint errors — warnings on unrelated pre-existing files are fine, but nothing new). If a preview server is running, navigate to the new doc page and spot-check the console for errors before reporting done.
