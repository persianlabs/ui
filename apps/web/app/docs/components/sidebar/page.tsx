import type { Metadata } from "next"

import { ExternalLinkDoc } from "@/components/external-link-doc"

export const metadata: Metadata = {
  title: "Sidebar",
  description: "Not yet ported to PersianLabs/ui — use shadcn's version.",
}

export default function SidebarDocPage() {
  return (
    <ExternalLinkDoc
      title="Sidebar"
      description="Not ported here yet. Visit shadcn's Sidebar docs for the component"
      linkLabel="ui.shadcn.com/docs/components/base/sidebar"
      linkHref="https://ui.shadcn.com/docs/components/base/sidebar"
    />
  )
}
