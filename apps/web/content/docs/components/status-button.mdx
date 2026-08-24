---
title: "Status Button"
description: "A button that swaps between idle, loading, and success feedback for async actions."
badge: "New"
---

import { statusButtonApi } from "@/lib/api-data/status-button"

A button that shows loading and success feedback for async actions. Return a promise from `onClick` for the fully self-managed flow, or pass a `status` you control from your own form state — either way the content swaps in place with a spring animation, keeps its width fixed across states, and respects `prefers-reduced-motion`.

<LastEdited path="apps/web/content/docs/components/status-button.mdx" />

<Credits
  sources={[
    {
      label: "Chánh Đại's Status Button",
      href: "https://chanhdai.com/components/status-button",
    },
  ]}
  changed
  changes={[
    "Replaced the shadcn/Radix Button with this repo's Base UI Button",
    "Replaced radix-ui/internal's useControllableState with this repo's standalone useControllableState hook (shipped alongside the component)",
    "Replaced the upstream's custom ten-spoke spinner — which required adding a spinner-opacity keyframe to global CSS — with this repo's existing Spinner, so installation needs no CSS edits",
    "Omitted this repo's own Button `loading` prop from the public props to avoid two competing busy indicators",
  ]}
/>

## Overview

<ComponentPreview name="status-button-demo" />

## Installation

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/status-button"
  packages="lucide-react motion"
  sourceName="status-button"
  sourceTitle="components/ui/status-button.tsx"
/>

## Usage

```tsx
import { StatusButton } from "@/components/ui/status-button"
```

```tsx
<StatusButton onClick={save} successLabel="Saved">
  Save
</StatusButton>
```

Return a promise from `onClick`. The button shows a spinner while the promise is pending, then the success label, then returns to idle. If the promise rejects, the button returns to idle right away.

While busy it is not disabled — focus is kept, `aria-busy` and `aria-disabled` announce the state to screen readers, and presses are ignored by the click handler.

### Controlled

When a form owns the submission, pass `status` and `onStatusChange` instead of `onClick`. The button still returns to idle on its own, and `onStatusChange` receives `"idle"` when that happens.

```tsx
import {
  StatusButton,
  type ButtonStatus,
} from "@/components/ui/status-button"

const [status, setStatus] = useState<ButtonStatus>("idle")
```

```tsx
<StatusButton
  type="submit"
  status={status}
  onStatusChange={setStatus}
  successLabel="Sent"
>
  Send
</StatusButton>
```

## Examples

### Form Submission

A controlled StatusButton next to an [Input](/docs/components/input): invalid input flips back to idle with an inline error, valid input shows the success label.

<ComponentPreview name="status-button-form" />

### RTL

Persian labels swap correctly in RTL layouts. The stacked-grid layout and vertical swap motion are direction-agnostic, so no RTL-specific CSS is needed.

<ComponentPreview name="status-button-rtl" direction="rtl" />

## API Reference

<ApiReference title="StatusButton" rows={statusButtonApi} />

See the [Base UI Button](/docs/components/button) documentation for the underlying props.
