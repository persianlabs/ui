import Link from "next/link"
import { PlusIcon } from "lucide-react"

import { GithubIcon } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GITHUB_URL } from "@/lib/github"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <section>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-20 text-center md:py-32">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
              Open source and free forever
            </Link>

            <h1 className="leading-tighter max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              The foundation for your Persian design system
            </h1>

            <p className="max-w-2xl text-base text-balance text-muted-foreground sm:text-lg">
              RTL-first, copy-paste components built on Base UI — with Persian
              typography, offline fonts and Farsi digits baked in. Own the code.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Link
                href="/create"
                className="inline-flex h-[35px] items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <PlusIcon className="size-4" />
                New Project
              </Link>
              <Link
                href="/docs/components"
                className="inline-flex h-[35px] items-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                View Components
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
