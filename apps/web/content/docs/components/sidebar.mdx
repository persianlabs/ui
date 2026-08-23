---
title: "Sidebar"
description: "A composable, collapsible application sidebar with mobile drawer, tooltips, and RTL support. Built on Base UI."
---

A composable, themeable, and customizable sidebar component ported from shadcn/ui's Base UI version, with first-class RTL support.

Sidebars are one of the most complex components to build — they are central to any application and contain a lot of moving parts. This one ships as a single primitive family: `SidebarProvider`, `Sidebar`, and composable header/content/footer/group/menu parts.

<LastEdited path="apps/web/content/docs/components/sidebar.mdx" />

<Credits
  sources={[{ label: "shadcn/ui", href: "https://ui.shadcn.com" }]}
  changed
  changes={[
    "Baked in RTL support upstream describes as an upgrade path: physical data-[side] positioning selectors for the fixed panel and rail, a dir prop threaded into the desktop container and the mobile Sheet, and rtl:rotate-180 on the SidebarTrigger icon",
    "Replaced remaining physical classes with logical properties where behavior allows: end-1/end-1.5 for menu actions/badges and border-s for sub-menus (with mirrored translate)",
    "Uses this repo's Sheet, Tooltip, Button, Input, Separator, Skeleton, useIsMobile (@/hooks/use-media-query), and useControllableState (@/hooks/use-controllable-state) instead of upstream equivalents",
    "Hides the mobile close button via SheetContent's showCloseButton={false} instead of a [&>button]:hidden override",
    "SidebarMenuSkeleton derives its random width from React.useId so server and hydration markup match",
  ]}
/>

## Overview

<ComponentPreview name="sidebar-demo" kind="block" direction="ltr" />

## Installation

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/sidebar"
  packages="@base-ui/react class-variance-authority lucide-react"
  sourceName="sidebar"
  sourceTitle="components/ui/sidebar.tsx"
/>

## Usage

```tsx title="app/layout.tsx"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
```

```tsx title="components/app-sidebar.tsx"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
```

## Composition

Use the following composition to build a `Sidebar` layout:

```text
SidebarProvider
├── Sidebar
│   ├── SidebarHeader
│   ├── SidebarContent
│   │   ├── SidebarGroup
│   │   │   ├── SidebarGroupLabel
│   │   │   ├── SidebarGroupAction
│   │   │   ├── SidebarGroupContent
│   │   │   └── SidebarMenu
│   │   │       ├── SidebarMenuItem
│   │   │       │   ├── SidebarMenuButton
│   │   │       │   ├── SidebarMenuAction
│   │   │       │   └── SidebarMenuBadge
│   │   │       └── SidebarMenuItem
│   │   │           ├── SidebarMenuButton
│   │   │           └── SidebarMenuSub
│   │   │               └── SidebarMenuSubItem
│   │   └── SidebarGroup
│   ├── SidebarFooter
│   └── SidebarRail
├── SidebarInset
└── SidebarTrigger
```

## Structure

- **SidebarProvider** — Handles collapsible state, the ⌘B/Ctrl+B shortcut, and provides sidebar context.
- **Sidebar** — The main collapsible panel; renders as a fixed panel on desktop and a Sheet on mobile.
- **SidebarHeader** — Sticky at the top; branding, titles, or workspace switchers.
- **SidebarFooter** — Sticky at the bottom; user menus or settings.
- **SidebarContent** — Scrollable region between header and footer.
- **SidebarGroup** — Groups related navigation with optional label, action, and content areas.
- **SidebarMenu / SidebarMenuItem** — Menu structure for links, badges, actions, and nested submenus.
- **SidebarRail** — Hover rail on the panel edge that toggles the sidebar.
- **SidebarInset** — Wraps main content when using the `inset` variant.
- **SidebarTrigger** — Control that toggles the sidebar open or collapsed.

## Examples

### RTL

Pass `dir="rtl"` together with `side="right"` for Persian layouts. The panel docks to the right, the rail and trigger icon mirror, and collapsed items show tooltips on the correct side via logical `side="inline-end"`.

<ComponentPreview name="sidebar-rtl" direction="rtl" kind="block" />

## SidebarProvider

Provides the sidebar context. Always wrap your application (or layout) in it.

### Width

For a single sidebar, edit the constants in `sidebar.tsx`:

```tsx
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
```

For multiple sidebars, set CSS variables through the provider:

```tsx
<SidebarProvider
  style={
    {
      "--sidebar-width": "20rem",
      "--sidebar-width-mobile": "20rem",
    } as React.CSSProperties
  }
>
  <Sidebar />
</SidebarProvider>
```

### Keyboard Shortcut

Toggle with ⌘B (Mac) or Ctrl+B (Windows/Linux). Change the key by editing `SIDEBAR_KEYBOARD_SHORTCUT` in `sidebar.tsx`.

## Sidebar

The main collapsible panel.

| Prop          | Type                               | Description                             |
| ------------- | ---------------------------------- | --------------------------------------- |
| `side`        | `left` \| `right`                  | The side of the sidebar.                |
| `variant`     | `sidebar` \| `floating` \| `inset` | The visual variant of the sidebar.      |
| `collapsible` | `offcanvas` \| `icon` \| `none`    | Collapse behavior of the sidebar.       |
| `dir`         | `ltr` \| `rtl`                     | Text direction of the sidebar contents. |

> **Note:** If you use the `inset` variant, wrap your main content in a `SidebarInset` component.

```tsx
<SidebarProvider>
  <Sidebar variant="inset" />
  <SidebarInset>
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
```

## useSidebar

Controls the sidebar from anywhere inside `SidebarProvider`.

```tsx
import { useSidebar } from "@/components/ui/sidebar"

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return <button onClick={toggleSidebar}>Toggle Sidebar</button>
}
```

## Styling

Style based on sidebar state with data attributes:

```tsx
<Sidebar collapsible="icon">
  <SidebarContent>
    {/* Hide an element when collapsed to icons */}
    <SidebarGroup className="group-data-[collapsible=icon]:hidden" />
  </SidebarContent>
</Sidebar>
```

## API Reference

import {
  sidebarApi,
  sidebarMenuButtonApi,
  sidebarProviderApi,
  useSidebarApi,
} from "@/lib/api-data/sidebar"

<ApiReference title="SidebarProvider" rows={sidebarProviderApi} />

<ApiReference title="Sidebar" rows={sidebarApi} />

<ApiReference title="useSidebar" rows={useSidebarApi} />

<ApiReference title="SidebarMenuButton" rows={sidebarMenuButtonApi} />
