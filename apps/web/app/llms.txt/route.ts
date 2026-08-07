import { GITHUB_URL } from "@/lib/github"
import { SITE_URL } from "@/lib/site"

export function GET() {
  const body = `# PersianLabs UI

> An open-source, RTL-first component library for Persian interfaces. Components are copy-paste — distributed through a shadcn-compatible registry, so there's no package to install and no version to chase.

## Docs

- [Introduction](${SITE_URL}/docs): What PersianLabs UI is, and why there's no separate installation flow — it's built entirely on top of shadcn/ui.
- [Theming](${SITE_URL}/docs/theming): The CSS color variables the library ships with, light and dark, ready to copy.
- [Components](${SITE_URL}/docs/components): Full list of available components.

## Components

- [Tabs](${SITE_URL}/docs/components/tabs): Animated, RTL-aware tabs built on Base UI and Motion, with a spring-driven sliding indicator, four visual variants, CLI/Manual install, live examples, and a full API reference.

## Registry

- Add a component: \`npx shadcn@latest add ${SITE_URL}/r/<component>.json\`
- Source: ${GITHUB_URL}
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
