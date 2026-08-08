import Link from "next/link"
import { Suspense } from "react"

import { AppLogo } from "@/components/app-logo"
import { GithubStars, GithubStarsFallback } from "@/components/github-stars"
import { GithubIcon } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { SiteSearch } from "@/components/site-search"
import { ThemeToggle } from "@/components/theme-toggle"
import { GITHUB_URL } from "@/lib/github"

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "#", label: "Blocks", disabled: true },
  { href: "#", label: "Templates", disabled: true },
  { href: "https://icons.persian-labs.ir/", label: "Icons", external: true },
]

export function SiteHeader({
  showMobileNav = false,
}: {
  showMobileNav?: boolean
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="flex h-14 w-full items-center justify-between px-6">
        <div className="flex items-center gap-3">
          {showMobileNav && <MobileNav />}
          <Link href="/" aria-label="PersianLabs/ui">
            <AppLogo className="size-5 text-foreground" />
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) =>
              link.disabled ? (
                <span
                  key={link.label}
                  aria-disabled="true"
                  className="cursor-not-allowed text-sm text-muted-foreground/50"
                >
                  {link.label}
                </span>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <SiteSearch />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="View PersianLabs/ui on GitHub"
            className="flex h-7 items-center gap-2 rounded-md border border-border px-2.5 transition-colors hover:bg-muted"
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
