import { StarIcon } from "lucide-react"

import { formatStarCount, getGithubStarCount } from "@/lib/github"

export async function GithubStars() {
  const stars = await getGithubStarCount()

  if (stars === null) return null

  return (
    <span className="text-muted-foreground inline-flex items-center gap-1 text-xs tabular-nums">
      <StarIcon className="size-3.5" />
      {formatStarCount(stars)}
    </span>
  )
}

export function GithubStarsFallback() {
  return (
    <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
      <StarIcon className="size-3.5" />
      <span className="bg-muted h-3 w-6 animate-pulse rounded-sm" />
    </span>
  )
}
