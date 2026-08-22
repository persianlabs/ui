---
title: "Toast"
description: "A temporary notification that stacks in a corner of the screen or anchors to an element, built on Base UI."
---

import { anchoredToastAddOptionsApi, anchoredToastProviderApi, toastAddOptionsApi, toastProviderApi } from "@/lib/api-data/toast"

A temporary notification that stacks in a corner of the screen, or anchors to a specific element on the page. Built on Base UI's toast primitive, with swipe-to-dismiss and success/error/warning/ info/loading statuses.

<LastEdited path="apps/web/content/docs/components/toast.mdx" />

<Credits
          sources={[
            { label: "shadcn/ui", href: "https://ui.shadcn.com" },
            {
              label: "coss ui",
              href: "https://coss.com/ui/docs/components/toast",
            },
          ]}
          changed
          changes={[
            'Adds a logical position="start"/"end" (on both ToastProvider\'s corner and the physical left/right CSS it drives) on top of coss ui\'s literal left/right/center, resolved from the ambient direction measured where the provider\'s children actually render — matching the pattern already used by Dialog/Drawer/Tooltip for portaled content',
            "ToastProvider and AnchoredToastProvider explicitly set dir on the portaled Viewport/Positioner from that same measurement, so swipe-to-dismiss direction and logical spacing resolve correctly even when the provider sits in an otherwise-LTR page",
            "Merges shadcn's per-slot exported pieces (ToastTitle/ToastDescription/ToastAction/ToastClose, and an explicit close button) with coss ui's position-aware viewport, stacking math, and AnchoredToastProvider",
            'Adds an "x" variant (compact rounded-full pill with an avatar/icon slot, in the style of X\'s native in-app notifications) on top of both sources\' plain card style, selected per-toast via `data: { variant: "x" }`',
            "Aligns the leading icon/avatar to the title line (items-start) instead of centering it against the combined title+description block",
            "Adds a per-toast `data: { dir }` override so a toast's content direction can be forced regardless of the provider's ambient/measured direction — the provider's corner position still follows the ambient direction, only the toast's own text/logical spacing is overridden",
            "Dropped coss ui's custom swipe-replay keyframes (bounce-on-update, shake-on-error) — this repo's registry has no mechanism yet for shipping component-scoped @keyframes, unlike coss ui's registry-item cssVars/css fields",
          ]}
        />

## Overview

<ComponentPreview name="toast-demo" />

## Installation

<InstallTabs command="npx shadcn@latest add @persianlabsui/toast" packages="@base-ui/react lucide-react" sourceName="toast" sourceTitle="components/ui/toast.tsx" />

## Usage

Call `toastManager.add()` from anywhere in your app after adding the provider to your root `layout` — no hook needed, since the manager is a plain module-level instance.

```tsx
import { Button } from "@/components/ui/button"

import { toastManager } from "@/components/ui/toast"

export function Example() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toastManager.add({
          title: "Event created",
          description: "Sunday, December 3 at 9:00 AM",
        })
      }
    >
      Show toast
    </Button>
  )
}
```

## Examples

### Statuses

Pass `type` to pick the leading icon and its color: `success`, `error`, `warning`, `info`, or `loading`. Update a loading toast in place with `toastManager.update(id, options)`.

<ComponentPreview name="toast-statuses" />

### X style

Set `data: { variant: "x" }` for a compact, rounded-full pill in the style of X's native in-app notifications, with an avatar or icon slot.

<ComponentPreview name="toast-x" />

### Anchored toast

Wrap in `AnchoredToastProvider` and call `anchoredToastManager.add({ positionerProps: { anchor } })` to position a toast against a specific element — a tooltip-like confirmation next to the button that triggered it — instead of stacking it in a screen corner. The smallest way to see it in action is [Copy Button](/docs/components/copy-button), a small building block that anchors its own copy confirmation this way — the Dialog and Drawer examples below use it too.

```tsx
import { CopyButton } from "@/components/ui/copy-button"

export function Example() {
  return <CopyButton text="https://persian-labs.ir" />
}
```

### Standalone

<ComponentPreview name="toast-anchored" />

### From a Dialog

<ComponentPreview name="toast-anchored-dialog" />

### From a Drawer

<ComponentPreview name="toast-anchored-drawer" />

### RTL

By default every position — including the centered ones — mirrors automatically: `start` lands on the right in RTL and the left in LTR (and vice versa for `end`), matching the ambient `dir` the provider measures from its parent. To force a toast's content direction regardless of the ambient page direction — e.g. Persian content on an otherwise-LTR page — pass `data: { dir: "rtl" }` per call, as this example does rather than relying on the page direction toggle.

<ComponentPreview name="toast-rtl" direction="rtl" />

## API Reference

<ApiReference title="ToastProvider" rows={toastProviderApi} />

<ApiReference title="AnchoredToastProvider" rows={anchoredToastProviderApi} />

<ApiReference title="toastManager.add(options)" rows={toastAddOptionsApi} />

<ApiReference title="anchoredToastManager.add(options)" rows={anchoredToastAddOptionsApi} />
