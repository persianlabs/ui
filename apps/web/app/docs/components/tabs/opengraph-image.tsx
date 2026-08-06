import { TabsPreview } from "@/lib/component-previews"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Tabs — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Tabs",
    "Layered panels with a spring-animated sliding indicator, built on Base UI.",
    <TabsPreview />
  )
}
