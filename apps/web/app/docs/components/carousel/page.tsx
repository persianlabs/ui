import type { Metadata } from "next"

import { ExternalLinkDoc } from "@/components/external-link-doc"

export const metadata: Metadata = {
  title: "Carousel",
  description: "Not yet ported to PersianLabs/ui — use shadcn's version.",
}

export default function CarouselPage() {
  return (
    <ExternalLinkDoc
      title="Carousel"
      description="Not ported here yet. Visit shadcn's Carousel docs for the component"
      linkLabel="ui.shadcn.com/docs/components/base/carousel"
      linkHref="https://ui.shadcn.com/docs/components/base/carousel"
    />
  )
}
