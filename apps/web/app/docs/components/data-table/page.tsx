import type { Metadata } from "next"

import { ExternalLinkDoc } from "@/components/external-link-doc"

export const metadata: Metadata = {
  title: "Data Table",
  description: "Not yet ported to PersianLabs/ui — use shadcn's version.",
}

export default function DataTablePage() {
  return (
    <ExternalLinkDoc
      title="Data Table"
      description="Not ported here yet. Visit shadcn's Data Table docs for the component"
      linkLabel="ui.shadcn.com/docs/components/base/data-table"
      linkHref="https://ui.shadcn.com/docs/components/base/data-table"
    />
  )
}
