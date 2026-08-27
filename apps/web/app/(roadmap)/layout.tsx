import type { ReactNode } from "react"

import { SiteHeader } from "@/components/site-header"

/**
 * Shared layout for the /blocks and /templates roadmap pages — a different
 * shell from the docs (top-level, no sidebar), but reusing the same header.
 */
export default function RoadmapLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader showMobileNav />
      <main className="w-full flex-1">{children}</main>
    </div>
  )
}
