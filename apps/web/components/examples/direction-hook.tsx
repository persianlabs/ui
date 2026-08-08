"use client"

import {
  DirectionProvider,
  useDirection,
} from "@workspace/ui/components/direction"

function CurrentDirection() {
  const direction = useDirection()

  return (
    <div className="rounded-lg border border-border px-4 py-3 text-sm text-muted-foreground">
      Current direction: <span className="text-foreground">{direction}</span>
    </div>
  )
}

export function DirectionHookExample() {
  return (
    <DirectionProvider direction="rtl">
      <CurrentDirection />
    </DirectionProvider>
  )
}
