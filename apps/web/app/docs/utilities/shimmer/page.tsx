import type { Metadata } from "next"

import { ExternalLinkDoc } from "@/components/external-link-doc"

export const metadata: Metadata = {
  title: "Shimmer",
  description: "Not yet ported to PersianLabs/ui — use shadcn's version.",
}

export default function ShimmerPage() {
  return (
    <ExternalLinkDoc
      title="Shimmer"
      description="Not ported here yet. Visit shadcn's shimmer docs for the utility"
      linkLabel="ui.shadcn.com/docs/utils/shimmer"
      linkHref="https://ui.shadcn.com/docs/utils/shimmer"
    />
  )
}
