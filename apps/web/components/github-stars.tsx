"use client"

import { useEffect, useState } from "react"

function formatStarCount(count: number): string {
  return count >= 1000
    ? `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`
    : count.toString()
}

export function GithubStars() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    async function loadStars() {
      try {
        const response = await fetch("https://api.github.com/repos/persianlabs/ui", { signal: controller.signal })
        if (!response.ok) return
        const data = (await response.json()) as { stargazers_count?: number }
        if (typeof data.stargazers_count === "number") setStars(data.stargazers_count)
      } catch {
        // The GitHub link remains useful when the public API is unavailable.
      }
    }
    void loadStars()
    return () => controller.abort()
  }, [])

  if (stars === null) return null

  return (
    <span className="text-xs text-muted-foreground tabular-nums">
      {formatStarCount(stars)}
    </span>
  )
}

export function GithubStarsFallback() {
  return null
}
