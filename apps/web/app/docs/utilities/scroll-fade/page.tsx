import type { Metadata } from "next"

import { ExternalLinkDoc } from "@/components/external-link-doc"

export const metadata: Metadata = {
  title: "Scroll Fade",
  description: "Not yet ported to PersianLabs/ui — use shadcn's version.",
}

export default function ScrollFadePage() {
  return (
    <ExternalLinkDoc
      title="Scroll Fade"
      description="Not ported here yet. Visit shadcn's scroll-fade docs for the utility"
      linkLabel="ui.shadcn.com/docs/utils/scroll-fade"
      linkHref="https://ui.shadcn.com/docs/utils/scroll-fade"
    />
  )
}
