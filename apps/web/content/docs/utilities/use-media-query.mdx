---
title: "useMediaQuery"
description: "Reactive media query hook with Tailwind-like syntax."
---

import { mediaQueryInputApi, useMediaQueryApi } from "@/lib/api-data/use-media-query"

A hook that subscribes to a CSS media query and returns whether it matches, with Tailwind-style breakpoint shorthand (`"md"`, `"max-md"`) instead of hand-written CSS query strings. Built on `useSyncExternalStore` for SSR safety and concurrent mode compatibility. Powers [Responsive Dialog](/docs/components/responsive-dialog), [Responsive Menu](/docs/components/responsive-menu), and [Responsive Alert Dialog](/docs/components/responsive-alert-dialog).

<LastEdited path="apps/web/content/docs/utilities/use-media-query.mdx" />

<Credits
          sources={[
            {
              label: "coss ui",
              href: "https://coss.com/ui/docs/hooks/use-media-query",
            },
          ]}
          changed={false}
        />

## Overview

<ComponentPreview name="use-media-query-demo" />

## Installation

<InstallTabs command="npx shadcn@latest add @persianlabsui/use-media-query" sourceName="use-media-query" sourceKind="hook" sourceTitle="hooks/use-media-query.ts" sourceStep="Copy the source into your project" />

## Usage

Use Tailwind variant syntax to match breakpoints — TypeScript provides full autocomplete.

```tsx
import { useMediaQuery } from "@/hooks/use-media-query"

// Min-width (breakpoint and above) — like md:
const isDesktop = useMediaQuery("md")

// Max-width (below breakpoint) — like max-md:
const isMobile = useMediaQuery("max-md")

// Range (between two breakpoints) — like md:max-lg:
const isTablet = useMediaQuery("md:max-lg")
```

Use the object form when you need pointer detection or custom pixel values.

```tsx
// Touch device detection
const isTouch = useMediaQuery({ pointer: "coarse" })

// Breakpoint + pointer combined
const isMobileTouch = useMediaQuery({ max: "md", pointer: "coarse" })

// Custom pixel values
const isNarrow = useMediaQuery({ max: 600 })
```

Pass any valid CSS media query string as an escape hatch.

```tsx
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
```

The primary use case — mount one component instead of another based on viewport.

```tsx
function Layout() {
  const isDesktop = useMediaQuery("lg")

  return isDesktop ? <DesktopNav /> : <MobileNav />
}
```

The hook includes a static breakpoint map that must match your Tailwind config. If you override breakpoints in your Tailwind CSS `@theme`, update the `BREAKPOINTS` constant in the hook to match.

| name | value |
| --- | --- |
| `sm` | 640px |
| `md` | 800px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |
| `3xl` | 1600px |
| `4xl` | 2000px |

## Examples

### Breakpoints

Min-width — resize the viewport to see values update live.

<ComponentPreview name="use-media-query-breakpoints" />

### Ranges

Matches only between two breakpoints.

<ComponentPreview name="use-media-query-ranges" />

### Device & preferences

Pointer type and raw preference queries.

<ComponentPreview name="use-media-query-device" />

### RTL

<ComponentPreview name="use-media-query-rtl" direction="rtl" />

## API Reference

<ApiReference title="useMediaQuery(query)" rows={useMediaQueryApi} />

<ApiReference title="MediaQueryInput" rows={mediaQueryInputApi} />
