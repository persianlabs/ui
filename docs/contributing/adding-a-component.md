# Adding a Component

End-to-end walkthrough for adding a new component to the PersianLabs/ui registry. For pure functions and hooks, see [Adding a utility](adding-a-utility.md) instead.

## 1. Implement the component

Create `packages/ui/src/components/<name>.tsx`. Import through internal aliases (`@workspace/ui/components/*`, `@workspace/ui/lib/utils`). This copy is used by the docs site itself.

Components sit on [Base UI](https://base-ui.com) primitives, styled with Tailwind CSS v4, variants via `class-variance-authority`, class merging via the shared `cn` util.

## 2. Mirror for consumers

Copy the file to `apps/web/registry/base/ui/<name>.tsx` and change import paths to consumer form: `@workspace/ui/components/foo` → `@/components/ui/foo`, `@workspace/ui/lib/utils` → `@/lib/utils`. **Logic stays identical — only imports differ.** This tree is what `shadcn build` compiles into `apps/web/public/r/*.json` and what users receive.

## 3. Register it

Add an entry to `apps/web/registry.json`:

```json
{
  "name": "<name>",
  "type": "registry:ui",
  "title": "Display Name",
  "description": "One-line description.",
  "registryDependencies": ["..."],
  "dependencies": ["..."],
  "files": [{ "path": "registry/base/ui/<name>.tsx", "type": "registry:ui" }]
}
```

## 4. Add examples

Create example variants at `apps/web/components/examples/<name>-<variant>.tsx`, each exporting `<Name><Variant>Example`:

- Default demo: `<name>-demo.tsx` → `<Name>DemoExample`
- RTL showcase: `<name>-rtl.tsx` → `<Name>RtlExample` with real Farsi content
- Extra variants as needed (`<name>-outline`, `<name>-disabled`, …)

The examples name→component map regenerates automatically on `predev`/`prebuild`.

## 5. Write the doc page

Create `apps/web/content/docs/components/<name>.mdx`. Use the shared islands — see any existing page as a template:

```mdx
---
title: Button
description: One-line description used for metadata and listings.
---

<ComponentPreview name="button-demo" />

## Installation

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/button"
  packages="@base-ui/react"
  sourceName="button"
/>

## API Reference

import { buttonRootApi } from "@/lib/api-data/button"

<ApiReference title="Button" rows={buttonRootApi} />
```

Then register it in three places:

- `content/docs/components/meta.json` — page-tree order.
- `apps/web/lib/docs-nav.ts` — this file powers the sidebar, the ⌘K search, and the sitemap.
- `apps/web/app/llms.txt/route.ts` — add the slug to the matching group in `COMPONENT_GROUPS`; `/llms.txt` is generated only from those arrays and silently omits anything else.

## 6. API reference data

Add typed table rows to `apps/web/lib/api-data/<name>.ts`. The same module feeds the on-page `<ApiReference>` table and the markdown endpoint's generated table — so also register it in `apps/web/lib/api-data/index.ts`:

```ts
export * as <camelName> from "./<name>"
```

Without that namespace entry, `.md`/copy-page versions render API tables with headers but zero rows (this bit Status Button, Plate Input, and Sidebar at launch).

## 7. Images

- OG image: add an inline-styled `<Name>Preview` (Satori-safe, hex colors) to `apps/web/components/previews/og/<name>.tsx`. No route needed — `app/docs/og/[...slug]/route.tsx` picks it up through the generated slug map and serves a unique card built from the page's frontmatter title/description.
- Gallery thumbnail: add an inline-styled `<Name>Preview` to `apps/web/lib/component-previews.tsx`, then wire it into the catalog island `components/mdx/components-catalog.tsx`.

Never use Persian characters inside OG previews except when the Persian glyph is itself the subject being demonstrated.

## 8. Credits

If the component is adapted from upstream (shadcn/ui, coss/ui, …), say so via the `<Credits>` island and list exactly what changed — especially RTL-motivated diffs, worded as diffs ("Replaced `pl-6` with `ps-6`"). Never fabricate attribution.

## 9. Verify

```bash
bun run build && bun run lint && bun run typecheck
cd apps/web && bun scripts/check-mdx-components.mts
curl https://localhost:3000/docs/components/<name>.md   # 200, and every API table contains rows
curl https://localhost:3000/llms.txt                    # slug appears in its group
```
