import type { Metadata } from "next"

import { ExternalLinkDoc } from "@/components/external-link-doc"

export const metadata: Metadata = {
  title: "Attachment",
  description: "Not yet ported to PersianLabs/ui — use shadcn's version.",
}

export default function AttachmentPage() {
  return (
    <ExternalLinkDoc
      title="Attachment"
      description="Not ported here yet. Visit shadcn's Attachment docs for the component"
      linkLabel="ui.shadcn.com/docs/components/base/attachment"
      linkHref="https://ui.shadcn.com/docs/components/base/attachment"
    />
  )
}
