"use client"

// Client shell for the /create/preview iframe page: Farsi dashboard on top
// (dir="rtl"), English dashboard below (dir="ltr"), 50/50. Mounts the
// DesignSystemProvider and the D-key dark toggle inside the iframe.

import { DesignSystemProvider } from "@/components/create/design-system-provider"
import { useThemeToggle } from "@/components/create/hooks/use-theme-toggle"
import { EnDashboard } from "@/components/create/previews/en-dashboard"
import { FaDashboard } from "@/components/create/previews/fa-dashboard"
import type { DesignSystemSearchParams } from "@/lib/create/search-params"

export function PreviewClient({
  initialParams,
}: {
  initialParams: DesignSystemSearchParams
}) {
  // Activates the D-key → dark-mode toggle (and its parent sync) inside the
  // iframe. Renders nothing itself.
  useThemeToggle()

  return (
    <DesignSystemProvider initialParams={initialParams}>
      <div className="flex h-full w-full items-start overflow-auto">
        <div
          dir="rtl"
          className="w-1/2 min-w-xl shrink-0 border-l border-border/60"
        >
          <FaDashboard />
        </div>
        <div dir="ltr" className="w-1/2 min-w-xl shrink-0">
          <EnDashboard />
        </div>
      </div>
    </DesignSystemProvider>
  )
}
