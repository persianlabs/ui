# Adding a Utility

Utilities are pure functions or React hooks distributed through the same registry flow as components, with three differences from [Adding a Component](adding-a-component.md):

## 1. Source location

- Pure functions → `packages/ui/src/lib/<name>.ts`, mirrored to `apps/web/registry/base/lib/<name>.ts`
- React hooks → `packages/ui/src/hooks/<name>.ts`, mirrored to `apps/web/registry/base/hooks/<name>.ts`

## 2. Doc page location

The markdown page goes to `apps/web/content/docs/utilities/<name>.mdx`, and its slug is registered in `content/docs/utilities/meta.json` plus the Utilities group of `apps/web/lib/docs-nav.ts`.

Manual installation on the page shows the lib/hook source directly:

```mdx
<InstallTabs
  command="npx shadcn@latest add @persianlabsui/use-date"
  sourceKind="hook"
  sourceName="use-date"
/>
```

(`sourceKind` accepts `"component"`, `"hook"`, or `"lib"`.)

## 3. Examples still apply

Utilities get live examples too — a hook demo component lives in `components/examples/` like any other and is referenced by name:

```mdx
<ComponentPreview name="use-date-demo" />
```

## Verification

Same checklist as components:

```bash
bun run build && bun run lint && bun run typecheck
cd apps/web && bun scripts/check-mdx-components.mts
curl https://localhost:3000/docs/utilities/<name>.md
```
