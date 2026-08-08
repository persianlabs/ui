import { DocsSidebar } from "@/components/docs-sidebar"
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

      <div className="relative flex w-full flex-1">
        <aside className="absolute inset-y-0 left-0 z-10 hidden w-72 lg:block">
          {/* This has to live on a plain wrapper div, not ScrollArea's own
              className: ScrollArea's root ships with a baked-in "relative",
              and tailwind-merge doesn't treat "relative" and "sticky" as
              conflicting utilities, so both end up in the class list and
              whichever Tailwind happens to define later in its generated
              stylesheet wins the cascade — which was "relative", silently
              downgrading this to non-sticky. */}
          <div className="sticky top-14 h-[calc(100vh-3.5rem)]">
            <ScrollArea className="h-full">
              <div className="px-6 pt-6 pb-10">
                <DocsSidebar />
              </div>
            </ScrollArea>
          </div>
        </aside>

        <main className="w-full min-w-0 px-6 py-10 [&>:not(:has(>aside))]:mx-auto lg:max-xl:[&>:not(:has(>aside))]:ml-72 [&>div:has(>aside)]:relative [&>div:has(>aside)]:w-full [&>div:has(>aside)]:justify-center lg:max-xl:[&>div:has(>aside)]:justify-end min-[1360px]:max-2xl:[&>div:has(>aside)>article]:max-w-[46rem] min-[1360px]:max-2xl:[&>div:has(>aside)>article]:translate-x-6 lg:max-xl:[&>div:has(>aside)>article]:max-w-[calc(100%-18rem)] xl:[&>div:has(>aside)>article]:flex-none [&>div:has(>aside)>aside]:absolute [&>div:has(>aside)>aside]:top-0 [&>div:has(>aside)>aside]:-right-6 [&>div:has(>aside)>aside]:pl-6 xl:[&>div:has(>aside)>aside]:fixed xl:[&>div:has(>aside)>aside]:top-20 xl:[&>div:has(>aside)>aside]:right-2 xl:[&>div:has(>aside)>aside]:h-[calc(100vh-5rem)] xl:[&>div:has(>aside)>aside]:w-60 xl:[&>div:has(>aside)>aside>div]:h-full 2xl:[&>div:has(>aside)>aside]:right-auto 2xl:[&>div:has(>aside)>aside]:left-[calc(50%+26rem)] 2xl:[&>div:has(>aside)>aside]:w-88">
          {children}
        </main>
      </div>
    </div>
  )
}
