import Link from "next/link"

import { AppLogo } from "@/components/app-logo"
import { GithubIcon } from "@/components/icons"
import { GITHUB_URL } from "@/lib/github"

export function SiteFooter() {
  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="border-border bg-foreground text-background flex size-6 items-center justify-center rounded-md">
            <AppLogo className="size-3.5" />
          </span>
          <p className="text-muted-foreground text-sm">
            PersianLabs/ui — MIT Licensed.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Docs
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
