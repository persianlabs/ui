---
title: "Bounce Sidebar"
description: "A vertical navigation list with a bouncy, arc-animated active marker that springs between items."
---

import { bounceSidebarApi } from "@/lib/api-data/bounce-sidebar"

export const tocVariant = "bounce"

A vertical navigation list with a bouncy, spring-animated active indicator. Click any item and the marker arcs over to it. This page renders its own table of contents through the component — click a heading in the rail and watch the dot bounce over.

<LastEdited path="apps/web/content/docs/components/bounce-sidebar.mdx" />

<Credits
  sources={[
    { label: "Rare UI", href: "https://www.rareui.com/sidebar/bounce-sidebar" },
  ]}
  changed={true}
  changes={[
    "Replaced pl-6 with logical ps-6 so the marker gutter sits on the correct side under RTL",
    "Replaced left-2 with logical start-2 on the bouncing dot",
    "Replaced text-left with text-start on items",
    "Added an optional depth on items so nested entries (like h3 subsections) indent with logical ps-4/ps-8",
    "Capped the marker arc sway at 8px so the dot stays inside the container on narrow rails instead of clipping out of view mid-arc",
    'Used motion.create("a") instead of motion.create(next/link) so the component stays environment-agnostic outside Next.js',
  ]}
/>

## Installation

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/bounce-sidebar"
  packages="motion"
  sourceName="bounce-sidebar"
  sourceTitle="components/ui/bounce-sidebar.tsx"
/>

## Usage

```tsx
import { BounceSidebar } from "@/components/ui/bounce-sidebar"

const items = [
  { label: "General", heading: true },
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
]

export function Demo() {
  return <BounceSidebar items={items} dotColor="#FC4C01" />
}
```

## Anatomy

### The marker

The active marker is a single dot positioned absolutely inside the list. On mount it snaps to the active item without animating, so the first paint is stable even before fonts finish loading.

### The arc

When the active item changes, the dot travels along an arc rather than a straight line. The curve strength scales with distance: nearby hops stay tight, long jumps sweep wider, which keeps the motion playful without feeling slow.

### Headings

Items marked with `heading: true` render as non-selectable group labels. The marker skips over them — headings own an index only so the dot geometry stays simple.

## Items

### Plain strings

A plain string renders a button that toggles the active index. Use this for demos and storyboards where navigation has no real destination.

### Links

Passing `href` turns the item into a link. The click still updates the active index and fires `onChange`, so the marker follows even while the router navigates.

### Nested depth

Items accept an optional `depth` that indents the row with logical `ps-4` / `ps-8` classes. Under RTL the indent mirrors automatically because the padding is on the inline start.

## Behavior

### Controlled and uncontrolled

The component manages its own state by default. Pass `value` to control it and receive every selection through `onChange` — useful when the sidebar drives something else, like a scroll spy or a router.

### Dot sizing

The dot size is rounded to the device pixel ratio on mount, so the marker stays crisp on retina displays instead of rendering on a half pixel.

## Styling

### Colors

The marker uses `dotColor`, which accepts any CSS color — hex, rgb, hsl, or a `var()` token. Group headings inherit the same color at a smaller size.

### Layout

The root is a plain `ul` with vertical flex flow, so you can restyle spacing through `className` and compose it with any container.

## Accessibility

### Focus and semantics

Items render as real buttons or links inside a list, so keyboard focus and screen reader announcements work out of the box. The marker itself is `aria-hidden` decoration.

## FAQ

### Can it act as a table of contents?

Yes — this page is the example. The docs shell feeds its h2/h3 headings into the sidebar and syncs the active index with the scroll position.

### Does it animate on first render?

No. The dot snaps to the active item on mount and only animates on subsequent changes, which avoids a distracting entrance.

## API Reference

<ApiReference title="BounceSidebar" rows={bounceSidebarApi} />
