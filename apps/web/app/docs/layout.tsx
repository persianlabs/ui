import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ScrollArea } from "@workspace/ui/components/scroll-area"

const mainClassName = [
  "min-w-0 flex-1 px-6 py-10 lg:px-8",
  "[&>div>div:has(>aside)]:mx-auto",
  "[&>div>div:has(>aside)]:w-full",
  "[&>div>div:has(>aside)]:max-w-none",
  "[&>div>div:has(>aside)>article]:mx-auto",
  "[&>div>div:has(>aside)>article]:w-full",
  "[&>div>div:has(>aside)>article]:max-w-[40rem]",
  "[&>div>div:has(>aside)>article]:flex-none",
  "xl:[&>div>div:has(>aside)]:[--toc-width:16rem]",
  "xl:[&>div>div:has(>aside)]:grid",
  "xl:[&>div>div:has(>aside)]:grid-cols-[minmax(0,1fr)_var(--toc-width)]",
  "xl:[&>div>div:has(>aside)]:items-start",
  "xl:[&>div>div:has(>aside)]:gap-10",
  "xl:[&>div>div:has(>aside)>article]:justify-self-center",
  "xl:[&>div>div:has(>aside)>aside]:sticky",
  "xl:[&>div>div:has(>aside)>aside]:top-[calc(3.5rem+1.5rem)]",
  "xl:[&>div>div:has(>aside)>aside]:self-start",
  "xl:[&>div>div:has(>aside)>aside]:z-30",
  "xl:[&>div>div:has(>aside)>aside]:ml-auto",
  "xl:[&>div>div:has(>aside)>aside]:flex",
  "xl:[&>div>div:has(>aside)>aside]:h-[90svh]",
  "xl:[&>div>div:has(>aside)>aside]:w-(--toc-width)",
  "xl:[&>div>div:has(>aside)>aside]:min-h-0",
  "xl:[&>div>div:has(>aside)>aside]:flex-col",
  "xl:[&>div>div:has(>aside)>aside]:gap-4",
  // No overflow-hidden here: it would clip the BounceSidebar marker while it
  // arcs between distant items. The dot's sway is capped inside the component,
  // and the TOC ScrollArea manages its own scrolling.
  "xl:[&>div>div:has(>aside)>aside]:overscroll-none",
  "xl:[&>div>div:has(>aside)>aside]:pb-8",
  "xl:[&>div>div:has(>aside)>aside]:justify-self-end",
  "xl:[&>div>div:has(>aside)>aside>div]:static",
  "xl:[&>div>div:has(>aside)>aside>div]:min-h-0",
  "xl:[&>div>div:has(>aside)>aside>div]:h-full",
  "xl:[&>div>div:has(>aside)>aside>div]:flex-1",
].join(" ")

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader showMobileNav />

      <div className="flex w-full flex-1">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="relative sticky top-14 h-[calc(100vh-3.5rem)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-0 h-4/5 w-px -translate-y-1/2 rounded-full bg-gradient-to-b from-border/20 via-border to-border/20"
            />
            <ScrollArea className="h-full [&_[data-slot=scroll-area-scrollbar]]:hidden">
              <div className="px-6 pt-6 pb-10">
                <DocsSidebar />
              </div>
            </ScrollArea>
          </div>
        </aside>

        <main className={mainClassName}>
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
