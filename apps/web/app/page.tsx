import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { CopyCommand } from "@/components/copy-command"
import { GithubIcon } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"
import { GITHUB_URL } from "@/lib/github"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden px-6 pt-24 pb-20">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
          />

          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="border-border bg-card text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-colors"
            >
              <GithubIcon className="size-3.5" />
              Open source and free forever
            </Link>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Persian-first components.
              <br />
              Copy, paste, own.
            </h1>

            <p className="text-muted-foreground mt-5 max-w-xl text-balance">
              A copy-paste component library built RTL-first for Persian
              interfaces — distributed through a shadcn-compatible registry,
              so you install exactly what you need.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs/components"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-sm font-medium transition-colors"
              >
                Browse components
                <ArrowRightIcon className="size-4" />
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="border-border hover:bg-muted inline-flex h-9 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors"
              >
                <GithubIcon className="size-4" />
                Star on GitHub
              </a>
            </div>

            <div className="mt-10">
              <CopyCommand command="npx shadcn@latest add @persianlabsui/city-selector" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
