import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader showMobileNav />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-10 px-6 py-10">
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <DocsSidebar />
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-10">{children}</main>
      </div>

      <SiteFooter />
    </div>
  )
}
