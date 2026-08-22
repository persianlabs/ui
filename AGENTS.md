<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Adding a new component or utility

Docs are markdown compiled by fumadocs-mdx — there are no per-page TSX files anymore. The full workflow lives in `CLAUDE.md`; the short version:

1. Implement in `packages/ui/src`, mirror into `apps/web/registry/base/` with consumer import paths.
2. Register in `apps/web/registry.json`.
3. Add example variants in `apps/web/components/examples/<name>-<variant>.tsx` (the examples map regenerates on predev/prebuild).
4. Write the doc page as MDX at `apps/web/content/docs/components/<name>.mdx` using the shared islands (`<ComponentPreview name>`, `<InstallTabs>`, `<ApiReference>`), and add the slug to that folder's `meta.json` plus an entry in `apps/web/lib/docs-nav.ts`.
5. Utilities: source in `registry/base/lib|hooks`, page in `content/docs/utilities/`.

Full English walkthroughs live in `docs/contributing/` ([adding-a-component.md](docs/contributing/adding-a-component.md), [adding-a-utility.md](docs/contributing/adding-a-utility.md), [conventions.md](docs/contributing/conventions.md)); an agent-facing handbook is at [docs/agents/README.md](docs/agents/README.md).

## Component and utility previews

Every new component or utility must include both a gallery preview image and an Open Graph image: add the inline-style thumbnail preview to `apps/web/lib/component-previews.tsx`, wire it into `components/mdx/components-catalog.tsx`, and add `<name>/opengraph-image.tsx` beside the other routes.

## Copyable page and .md endpoint

Automatic. Every doc page serves its markdown at `<url>.md` via `apps/web/app/markdown/[[...slug]]/route.ts` — no per-page strings or route maps to maintain. Verify `<url>.md` returns 200 with the page content before pushing. Site-wide index: `/llms.txt`.

## Guard script

Run `bun scripts/check-mdx-components.mts` (in `apps/web`) after editing any doc page — it fails when an MDX file references a component that is neither in the shared map nor imported.

## Before pushing

Before every push, run `bun run lint` and `bun run format`. Resolve any errors and include Prettier's formatting changes in the same commit before pushing.
