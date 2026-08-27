import Link from "next/link"

import { AppLogo } from "@/components/app-logo"
import { GitHubStars } from "@/components/github-stars"
import { XIcon } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"
import { SiteSearch } from "@/components/site-search"
import { ThemeToggle } from "@/components/theme-toggle"
import { GITHUB_REPO } from "@/lib/github"

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/blocks", label: "Blocks" },
  { href: "/templates", label: "Templates" },
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
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <SiteSearch />
          <GitHubStars repo={GITHUB_REPO} />
          <a
            href="https://x.com/taymakz"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow taymakz on X"
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <XIcon className="size-3.5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
