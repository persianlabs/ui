import type { Metadata } from "next"

import { ExternalLinkDoc } from "@/components/external-link-doc"

export const metadata: Metadata = {
  title: "Navigation Menu",
  description: "Not yet ported to PersianLabs/ui — use shadcn's version.",
}

export default function NavigationMenuPage() {
  return (
    <ExternalLinkDoc
      title="Navigation Menu"
      description="Not ported here yet. Visit shadcn's Navigation Menu docs for the component"
      linkLabel="ui.shadcn.com/docs/components/base/navigation-menu"
      linkHref="https://ui.shadcn.com/docs/components/base/navigation-menu"
    />
  )
}
