import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ScrollArea } from "@workspace/ui/components/scroll-area"

const mainClassName = [
  "w-full min-w-0 px-6 py-10",
  "[&>div:has(>aside)]:relative",
  "[&>div:has(>aside)]:w-full",
  "[&>div:has(>aside)]:justify-center",
  "lg:max-xl:[&>div:has(>aside)]:justify-end",
  "lg:max-xl:[&>div:has(>aside)>article]:max-w-[calc(100%-18rem)]",
  "xl:[&>div:has(>aside)>article]:flex-none",
  "xl:[&>div:has(>aside)>article]:w-[48rem]",
  "xl:max-2xl:[&>div:has(>aside)>article]:max-w-[44rem]",
  "xl:max-2xl:[&>div:has(>aside)>article]:w-[44rem]",
  "xl:max-2xl:[&>div:has(>aside)>article]:translate-x-6",
  "[&>div:has(>aside)>aside]:absolute",
  "[&>div:has(>aside)>aside]:top-0",
  "[&>div:has(>aside)>aside]:-right-6",
  "[&>div:has(>aside)>aside]:pl-6",
  "xl:[&>div:has(>aside)>aside]:fixed",
  "xl:[&>div:has(>aside)>aside]:top-20",
  "xl:[&>div:has(>aside)>aside]:right-2",
  "xl:[&>div:has(>aside)>aside]:h-[calc(100vh-5rem)]",
  "xl:[&>div:has(>aside)>aside]:w-60",
  "2xl:[&>div:has(>aside)>aside]:right-auto",
  "2xl:[&>div:has(>aside)>aside]:left-[calc(50%+26rem)]",
  "2xl:[&>div:has(>aside)>aside]:w-88",
  "xl:[&>div:has(>aside)>aside>div]:h-full",
].join(" ")

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader showMobileNav />

      <div className="relative flex w-full flex-1">
        <aside className="absolute inset-y-0 left-0 z-10 hidden w-72 lg:block">
          {/* This has to live on a plain wrapper div, not ScrollArea's own
              className: ScrollArea's root ships with a baked-in "relative",
              and tailwind-merge doesn't treat "relative" and "sticky" as
              conflicting utilities, so both end up in the class list and
              whichever Tailwind happens to define later in its generated
              stylesheet wins the cascade — which was "relative", silently
              downgrading this to non-sticky. */}
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

        <main className={mainClassName}>{children}</main>
      </div>
    </div>
  )
}
