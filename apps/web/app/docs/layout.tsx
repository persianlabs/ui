import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ScrollArea } from "@workspace/ui/components/scroll-area"

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader showMobileNav />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-10 px-6">
        <aside className="hidden w-60 shrink-0 md:block">
          {/* Its own pt-8/pb-4 instead of reusing the row's py-10 — main's
              vertical rhythm and the sidebar's are independent concerns
              that happened to share a value by coincidence; tune them
              separately.

              sticky, not fixed: fixed positioning ignores document flow
              entirely, so it floats on top of SiteFooter once you scroll
              past the main content. sticky stays pinned only while its own
              box (this row, which ends right where main ends, before the
              footer) is in view — no JS needed to stop it in time.

              This has to live on a plain wrapper div, not ScrollArea's own
              className: ScrollArea's root ships with a baked-in "relative",
              and tailwind-merge doesn't treat "relative" and "sticky" as
              conflicting utilities, so both end up in the class list and
              whichever Tailwind happens to define later in its generated
              stylesheet wins the cascade — which was "relative", silently
              downgrading this to non-sticky. */}
          <div className="sticky top-20 h-[calc(100vh-5rem)]">
            <ScrollArea className="h-full">
              <div className="pe-4 pb-4">
                <DocsSidebar />
              </div>
            </ScrollArea>
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-10">{children}</main>
      </div>

      <SiteFooter />
    </div>
  )
}
