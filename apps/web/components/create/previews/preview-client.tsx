"use client"

// Client shell for the /create/preview/[item] iframe page. Mounts the
// DesignSystemProvider (which paints the design-system vars onto the iframe
// document) and switches between the preview items. useThemeToggle is
// mounted here so the D key works inside the iframe, toggling its "dark"
// class and broadcasting DARK_MODE_FORWARD_TYPE to the host page.

import { DesignSystemProvider } from "@/components/create/design-system-provider"
import type { PreviewItemName } from "@/components/create/forward-types"
import { useThemeToggle } from "@/components/create/hooks/use-theme-toggle"
import { EnDashboard } from "@/components/create/previews/en-dashboard"
import { FaDashboard } from "@/components/create/previews/fa-dashboard"
import type { DesignSystemSearchParams } from "@/lib/create/search-params"

export function PreviewClient({
  initialParams,
  item,
}: {
  initialParams: DesignSystemSearchParams
  item: PreviewItemName
}) {
  // Activates the D-key → dark-mode toggle (and its parent sync) inside the
  // iframe. Renders nothing itself.
  useThemeToggle()

  return (
    <DesignSystemProvider initialParams={initialParams}>
      {item === "en-dashboard" ? <EnDashboard /> : <FaDashboard />}
    </DesignSystemProvider>
  )
}
