import { GITHUB_URL } from "@/lib/github"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="flex min-h-14 items-center justify-center px-6 text-sm text-muted-foreground">
        <p>
          Built on top of{" "}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            shadcn/ui
          </a>{" "}
          by{" "}
          <a
            href="https://github.com/taymakz"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            taymakz
          </a>
          <span className="px-2">·</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Open source
          </a>
        </p>
      </div>
    </footer>
  )
}
