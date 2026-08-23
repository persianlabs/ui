---
title: "useCountdown"
description: "A timer-aligned React countdown hook for ISO-8601 target dates, with formatted output and overdue state."
---

import {
  countdownResultApi,
  useCountdownApi,
} from "@/lib/api-data/use-countdown"

A countdown hook for deadlines, launches, reservations, and temporary offers. It updates on the next clock-second boundary, returns a display-ready value, and continues tracking elapsed time after a deadline passes.

<LastEdited path="apps/web/content/docs/utilities/use-countdown.mdx" />

<Credits
  sources={[
    {
      label: "initial implementation supplied by a project contributor",
      href: "https://github.com/persianlabs/ui",
    },
  ]}
  changed
  changes={[
    "Replaced a drifting interval with second-boundary-aligned timeouts.",
    "Added invalid-date handling so null and malformed targets safely return null.",
    "Changed rounded remaining time to ceiling semantics so a future target does not show zero early.",
    "Added documented result types and examples for formatted, segmented, paused, overdue, and RTL countdowns.",
  ]}
/>

## Overview

<ComponentPreview name="use-countdown-demo" />

## Installation

<InstallTabs
  command="npx shadcn@latest add @persianlabsui/use-countdown"
  sourceName="use-countdown"
  sourceKind="hook"
  sourceTitle="hooks/use-countdown.ts"
  sourceStep="Copy the source into your project"
/>

## Usage

Pass an ISO-8601 target date. The returned value is initially `null` until the hook runs in the browser, which keeps server rendering stable.

```tsx
import { useCountdown } from "@/hooks/use-countdown"

function SaleCountdown({ endsAt }: { endsAt: string }) {
  const countdown = useCountdown(endsAt)

  if (!countdown) return null

  return (
    <p>
      {countdown.isOverdue
        ? "This offer has ended"
        : "Offer ends in " + countdown.formatted}
    </p>
  )
}
```

Use a UTC ISO string from your API or database. Passing `null` or an invalid date disables the timer.

```tsx
const endsAt = "2026-12-31T23:59:59.000Z"
const countdown = useCountdown(isTimerActive ? endsAt : null)
```

## Examples

### Time units [#parts]

Use the individual units when each part needs its own visual treatment. Hours can exceed 24.

<ComponentPreview name="use-countdown-parts" />
### Pause and play [#reset]

Pause a countdown without losing its remaining duration, then resume it from exactly where it stopped.

<ComponentPreview name="use-countdown-reset" />
### Overdue targets [#overdue]

After the target passes, formatted remains absolute while totalSeconds is negative and isOverdue becomes true.

<ComponentPreview name="use-countdown-overdue" />
### OTP resend [#otp]

Keep the resend action unavailable until the cooldown expires, then start a fresh countdown whenever another code is sent.

<ComponentPreview name="use-countdown-otp" />

### RTL

Keep the time output LTR so separators and digits remain easy to scan inside Persian content.

<ComponentPreview name="use-countdown-otp-rtl" direction="rtl" />

## API Reference

<ApiReference title="useCountdown(targetIso)" rows={useCountdownApi} />

<ApiReference title="CountdownResult" rows={countdownResultApi} />
