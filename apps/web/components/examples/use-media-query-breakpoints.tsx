"use client"

import { useMediaQuery } from "@workspace/ui/hooks/use-media-query"

const BREAKPOINTS = ["sm", "md", "lg", "xl", "2xl"] as const

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

export function UseMediaQueryBreakpointsExample() {
  const sm = useMediaQuery("sm")
  const md = useMediaQuery("md")
  const lg = useMediaQuery("lg")
  const xl = useMediaQuery("xl")
  const xl2 = useMediaQuery("2xl")
  const matches = [sm, md, lg, xl, xl2]

  return (
    <div className="w-full max-w-xs">
      {BREAKPOINTS.map((bp, index) => (
        <Row
          key={bp}
          label={`useMediaQuery("${bp}")`}
          matches={matches[index]!}
        />
      ))}
    </div>
  )
}
