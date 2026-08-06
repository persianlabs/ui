import { cacheLife } from "next/cache"

export const GITHUB_REPO = "persianlabs/ui"
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`

export async function getGithubStarCount(): Promise<number | null> {
  "use cache"
  cacheLife("hours")

  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
    })

    if (!res.ok) return null

    const data = (await res.json()) as { stargazers_count?: number }
    return data.stargazers_count ?? null
  } catch {
    return null
  }
}

export function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`
  }
  return count.toString()
}
