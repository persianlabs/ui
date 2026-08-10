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
    <div className="mt-16 flex flex-col gap-6 border-t border-border/60 pt-8">
      <a
        href={`https://github.com/${GITHUB_REPO}/blob/main/${sourcePath}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <PencilIcon className="size-3.5" />
        Edit this page on GitHub
      </a>

      {(prev || next) && (
        <div className="flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={prev.href as Route}
              className="flex flex-1 flex-col items-start gap-1 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted"
            >
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeftIcon className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium text-foreground">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={next.href as Route}
              className="flex flex-1 flex-col items-end gap-1 rounded-lg border border-border px-4 py-3 text-end transition-colors hover:bg-muted"
            >
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                Next
                <ArrowRightIcon className="size-3" />
              </span>
              <span className="text-sm font-medium text-foreground">
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
