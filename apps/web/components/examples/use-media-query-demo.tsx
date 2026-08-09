"use client"

import { useMediaQuery } from "@workspace/ui/hooks/use-media-query"

export function UseMediaQueryDemoExample() {
  const isDesktop = useMediaQuery("lg")

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono text-sm">useMediaQuery(&quot;lg&quot;)</span>
      <span className="text-2xl font-semibold">
        {isDesktop ? "true" : "false"}
      </span>
      <span className="text-xs text-muted-foreground">
        Resize the window to see this update.
      </span>
    </div>
  )
}
