import { formatStarCount, getGithubStarCount } from "@/lib/github"

export async function GithubStars() {
  const stars = await getGithubStarCount()

  if (stars === null) return null

  return (
    <span className="text-xs text-muted-foreground tabular-nums">
      {formatStarCount(stars)}
    </span>
  )
}

export function GithubStarsFallback() {
  return (
    <span className="text-xs text-muted-foreground">
      <span className="block h-3 w-6 animate-pulse rounded-sm bg-muted" />
    </span>
  )
}
