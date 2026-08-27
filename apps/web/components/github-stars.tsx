"use client"

import { useEffect, useState } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

import { GithubIcon } from "@/components/icons"

export interface GitHubStarsProps {
  /** GitHub repository in `owner/repo` form. */
  repo: string
  /**
   * Optional locales for number formatting.
   * @defaultValue "en-US"
   */
  locales?: Intl.LocalesArgument
}

function compactCount(count: number, locales: Intl.LocalesArgument): string {
  return new Intl.NumberFormat(locales, {
    notation: "compact",
    compactDisplay: "short",
  })
    .format(count)
    .toLowerCase()
}

/**
 * A GitHub link (styled as a ghost button) showing the repo's star count in
 * compact form, with a tooltip revealing the full count on hover. The count
 * is fetched from the public GitHub API after mount and the link stays
 * clickable even while — or if — the fetch fails.
 */
export function GitHubStars({ repo, locales = "en-US" }: GitHubStarsProps) {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadStars() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          signal: controller.signal,
          headers: { Accept: "application/vnd.github+json" },
        })
        if (!response.ok) return
        const data = (await response.json()) as { stargazers_count?: number }
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count)
        }
      } catch {
        // The repo link remains useful when the public API is unavailable.
      }
    }

    void loadStars()
    return () => controller.abort()
  }, [repo])

  const href = `https://github.com/${repo}`

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="gap-1.5 ps-2 pe-1.5"
            render={<a href={href} target="_blank" rel="noreferrer" />}
          >
            <GithubIcon className="size-4" />
            {stars !== null && (
              <span className="text-[0.8125rem]/none text-muted-foreground tabular-nums">
                {compactCount(stars, locales)}
              </span>
            )}
          </Button>
        }
      />
      {stars !== null && (
        <TooltipContent className="tabular-nums">
          {new Intl.NumberFormat(locales).format(stars)} stars
        </TooltipContent>
      )}
    </Tooltip>
  )
}
