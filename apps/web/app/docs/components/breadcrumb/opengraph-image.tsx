import { BreadcrumbPreview } from "@/components/previews/og"
import { buildOgImage, ogImageSize } from "@/lib/og-image"

export const alt = "Breadcrumb — PersianLabs UI"
export const size = ogImageSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return buildOgImage(
    "Breadcrumb",
    "Displays the path to the current resource using a hierarchy of links.",
    <BreadcrumbPreview />
  )
}
