import { SidebarPreview } from "@/lib/component-opengraph-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Sidebar - PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Sidebar",
    "A composable, collapsible application sidebar with mobile drawer, tooltips, and RTL support. Built on Base UI.",
    <SidebarPreview />
  )
}
