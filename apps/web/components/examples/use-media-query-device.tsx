"use client"

import { useMediaQuery } from "@workspace/ui/hooks/use-media-query"

function Row({ label, matches }: { label: string; matches: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2 text-sm last:border-b-0">
      <code className="font-mono text-muted-foreground">{label}</code>
      <span
        className={
          matches ? "font-medium text-foreground" : "text-muted-foreground"
        }
      >
        {matches ? "true" : "false"}
      </span>
    </div>
  )
}

export function UseMediaQueryDeviceExample() {
  const isCoarse = useMediaQuery({ pointer: "coarse" })
  const isFine = useMediaQuery({ pointer: "fine" })
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <div className="w-full max-w-xs">
      <Row label='pointer: "coarse"' matches={isCoarse} />
      <Row label='pointer: "fine"' matches={isFine} />
      <Row label="prefers-color-scheme: dark" matches={prefersDark} />
      <Row
        label="prefers-reduced-motion: reduce"
        matches={prefersReducedMotion}
      />
    </div>
  )
}
