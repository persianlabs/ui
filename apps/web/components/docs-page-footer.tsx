import { ArrowLeftIcon, ArrowRightIcon, PencilIcon } from "lucide-react"
import type { Route } from "next"
import Link from "next/link"

import { GITHUB_REPO } from "@/lib/github"
import { getAdjacentDocsPages } from "@/lib/docs-nav"

export function DocsPageFooter({
  href,
  sourcePath,
}: {
  /** This page's own route, e.g. "/docs/components/tabs" — used to look up prev/next in the sidebar order. */
  href: string
  /** Repo-root-relative path to this page's source file, for the GitHub edit link. */
  sourcePath: string
}) {
  const { prev, next } = getAdjacentDocsPages(href)

  return (
    <div className="border-border/60 mt-16 flex flex-col gap-6 border-t pt-8">
      <a
        href={`https://github.com/${GITHUB_REPO}/blob/main/${sourcePath}`}
        target="_blank"
        rel="noreferrer"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <PencilIcon className="size-3.5" />
        Edit this page on GitHub
      </a>

      {(prev || next) && (
        <div className="flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={prev.href as Route}
              className="border-border hover:bg-muted flex flex-1 flex-col items-start gap-1 rounded-lg border px-4 py-3 transition-colors"
            >
              <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                <ArrowLeftIcon className="size-3" />
                Previous
              </span>
              <span className="text-foreground text-sm font-medium">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={next.href as Route}
              className="border-border hover:bg-muted flex flex-1 flex-col items-end gap-1 rounded-lg border px-4 py-3 text-end transition-colors"
            >
              <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                Next
                <ArrowRightIcon className="size-3" />
              </span>
              <span className="text-foreground text-sm font-medium">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      )}
    </div>
  )
}
