import Link from "next/link"
import { Suspense } from "react"

import { AppLogo } from "@/components/app-logo"
import { GithubStars, GithubStarsFallback } from "@/components/github-stars"
import { GithubIcon } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { GITHUB_URL } from "@/lib/github"

const navLinks = [
  { href: "/docs/components", label: "Components" },
  { href: "/docs", label: "Docs" },
]

export function SiteHeader({ showMobileNav = false }: { showMobileNav?: boolean }) {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          {showMobileNav && <MobileNav />}
          <Link href="/" className="flex items-center gap-2">
            <AppLogo className="text-foreground size-5" />
            <span className="text-sm font-semibold tracking-tight">
              PersianLabs/ui
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="View PersianLabs/ui on GitHub"
            className="border-border hover:bg-muted flex h-7 items-center gap-2 rounded-md border px-2.5 transition-colors"
          >
            <GithubIcon className="size-4" />
            <Suspense fallback={<GithubStarsFallback />}>
              <GithubStars />
            </Suspense>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
