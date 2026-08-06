"use client"

import { useTimeAgo } from "@/hooks/use-time-ago"

export function LastUpdated({ date }: { date: string | null }) {
  const timeAgo = useTimeAgo(date)

  if (!date) return null

  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <p className="text-muted-foreground mt-3 text-sm">
      Last updated {formatted}
      {timeAgo && <> ({timeAgo})</>}
    </p>
  )
}
