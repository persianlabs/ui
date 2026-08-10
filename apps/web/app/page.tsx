import { ArrowRightIcon } from "lucide-react"
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
        <section className="relative w-full overflow-hidden px-6 py-20">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] [background-size:24px_24px]"
          />

          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
              Open source and free forever
            </Link>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Persian-first components.
              <br />
              Copy, paste, own.
            </h1>

            <p className="mt-5 max-w-xl text-balance text-muted-foreground">
              A copy-paste component library, RTL-first for Persian interfaces.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs/components"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse components
                <ArrowRightIcon className="size-4" />
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                <GithubIcon className="size-4" />
                Star on GitHub
              </a>
            </div>

            <div className="mt-10 w-full max-w-fit min-w-0">
              <CopyCommand command="npx shadcn@latest add https://ui.persian-labs.ir/r/city-selector.json" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
