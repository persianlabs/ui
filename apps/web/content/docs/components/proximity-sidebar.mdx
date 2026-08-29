---
title: "Proximity Sidebar"
description: "A document minimap of proximity-reactive dashes that tracks scroll position, expands near the pointer, and smooth-scrolls to sections on click."
---

import { proximitySidebarApi } from "@/lib/api-data/proximity-sidebar"

export const tocVariant = "proximity"

A compact document minimap that turns headings and body rhythm into interactive dashes. It stays quiet by default, expands near the pointer, and briefly pulses the matching dash while the reader scrolls. This page itself renders its table of contents as the minimap — scroll it and watch the dashes.

<LastEdited path="apps/web/content/docs/components/proximity-sidebar.mdx" />

<Credits
  sources={[
    {
      label: "Rare UI",
      href: "https://www.rareui.com/sidebar/proximity-sidebar",
    },
    { label: "devouringdetails.com", href: "https://www.devouringdetails.com" },
  ]}
  changed={true}
  changes={[
    "Replaced the template string className with cn() on the nav wrapper",
    "Added a dir prop (auto-detected from the nearest [dir] ancestor) and made dashes always expand outward to the left under RTL instead of growing inward toward the content",
    "Aligned the dash stack to items-end under RTL to match the mirrored rail",
  ]}
/>

## Installation

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/proximity-sidebar"
  packages="motion"
  sourceName="proximity-sidebar"
  sourceTitle="components/ui/proximity-sidebar.tsx"
/>

## Usage

```tsx
import ProximitySidebar from "@/components/ui/proximity-sidebar"

const sections = [
  { id: "intro", label: "Introduction", level: 1 },
  { id: "setup", label: "Setup", level: 2 },
  { id: "api", label: "API", kind: "section" },
]

export function Demo() {
  return (
    <aside className="sticky top-20 h-[70vh]">
      <ProximitySidebar sections={sections} side="left" activeOffset={0.4} />
    </aside>
  )
}
```

Each `id` must match an element id present in the page. Without `kind` or `level`, the dash weight is inferred from the first heading inside the target element.

## Content model

The sidebar does not invent marks by itself. It reflects the sections you provide, which makes the visual hierarchy predictable and easy to tune.

### Title dashes

A title dash should represent a major region of the document. These are the strongest marks and should appear only where the reader expects a new chapter or major concept.

### Subtitle dashes

Subtitle dashes are slightly quieter than title dashes. They are useful for feature groups, installation steps, API categories, or meaningful document turns.

### Section dashes

Section dashes sit between markers and body text. They add rhythm without making the entire minimap look like every entry has the same importance.

### Body dashes

Body dashes are the smallest marks. They let the sidebar reach the same density as the original implementation while still being connected to real content.

## Interaction

### Hover proximity

Hovering over the stack sets a shared pointer value. Each dash measures its own distance from that pointer and scales according to proximity, driven by a spring so the expansion feels continuous rather than stepped.

### Scroll tracking

When the reader scrolls, the closest content section expands for half a second and then returns to normal. The active cue is useful but not sticky — the navigation never stays visually loud while you read.

### Click to navigate

Clicking any dash scrolls to its matching content block. Each dash is rendered as a button with an accessible label, so the control behaves like real navigation even though the visual stays minimal.

## Visual system

### Styling

The dash stack keeps the original visual tone: thin one-pixel marks, eight-pixel spacing, muted small entries, and strong foreground markers. Hierarchy comes from length and color instead of heavy stroke widths.

### Sizing

Major sections use the foreground color and the longest base length. Smaller entries preserve the same proportional language so a dense minimap still reads as one system.

### Direction

Under RTL, the direction is detected from the nearest `[dir]` ancestor (or the `dir` prop, when given) and the dashes always grow outward to the left, away from the content.

## Implementation notes

### Reduced motion

When reduced motion is requested, clicking a dash jumps without smooth scrolling. The navigation stays predictable for motion-sensitive users.

### Scroll containers

The component detects scrollable parents for the target sections, so the scroll pulse works both at the page level and inside app layouts with internal scroll areas.

### Density

A dense minimap is best for larger reading surfaces. On small screens, hide it or move it behind a compact navigation affordance instead of shrinking the dashes.

## FAQ

### Can I use it as a table of contents?

Yes — this page is the proof. The docs shell renders its own table of contents through this component, mapping h2 and h3 headings onto subtitle and section dashes.

### Does it need anchors in the content?

The component navigates by element id, so every dash needs a matching `id` on the page. Dashes that point nowhere are skipped by the scroll tracker but still render.

## API Reference

<ApiReference title="ProximitySidebar" rows={proximitySidebarApi} />
