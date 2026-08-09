"use client"

import { useMediaQuery } from "@workspace/ui/hooks/use-media-query"

const RANGES = ["sm:max-md", "md:max-lg", "lg:max-xl"] as const

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

export function UseMediaQueryRangesExample() {
  const matches = RANGES.map((range) => useMediaQuery(range))

  return (
    <div className="w-full max-w-xs">
      {RANGES.map((range, index) => (
        <Row
          key={range}
          label={`useMediaQuery("${range}")`}
          matches={matches[index]!}
        />
      ))}
    </div>
  )
}
