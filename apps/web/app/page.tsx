import { ArrowRightIcon, PlusIcon } from "lucide-react"
import Link from "next/link"

import { CopyCommand } from "@/components/copy-command"
import { GithubIcon } from "@/components/icons"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GITHUB_URL } from "@/lib/github"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <section className="border-b border-border/60">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-16 text-center md:py-24">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs transition-colors"
            >
              <GithubIcon className="size-3.5" />
              Open source and free forever
            </Link>

            <h1 className="text-3xl leading-tighter max-w-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              The foundation for your Persian design system
            </h1>

            <p className="text-muted-foreground max-w-2xl text-base text-balance sm:text-lg">
              RTL-first, copy-paste components built on Base UI — with Persian
              typography, offline fonts and Farsi digits baked in. Own the
              code.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Link
                href="/docs/installation"
                className="inline-flex h-[35px] items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get Started
              </Link>
              <Link
                href="/create"
                className="inline-flex h-[35px] items-center gap-1.5 rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <PlusIcon className="size-4" />
                New Project
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="border-border hover:bg-muted inline-flex h-[35px] items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors"
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </div>

            <div className="mt-6 w-full max-w-fit min-w-0">
              <CopyCommand command="npx persianlabsui init" />
            </div>
          </div>
        </section>

        <section className="relative w-full overflow-hidden px-6 py-16">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] [background-size:24px_24px]"
          />
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Build it your way — visually
            </h2>
            <p className="text-muted-foreground max-w-xl text-balance">
              Pick a base color, theme and radius on the create page, preview
              it live with real components, and copy one command to scaffold
              it.
            </p>
            <Link
              href="/create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center gap-1.5 rounded-lg px-5 text-sm font-medium transition-colors"
            >
              Open the create page
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
