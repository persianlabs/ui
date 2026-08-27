import type { Metadata } from "next"

import { RoadmapPage, type RoadmapPhase } from "@/components/roadmap-page"

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "The roadmap for copy-paste Blocks on PersianLabs/ui - built on a stable component base first.",
}

const phases: RoadmapPhase[] = [
  {
    title: "Solidify the library",
    status: "now",
    tagline: "Blocks are only as good as the primitives they're built from.",
    items: [
      "Expand component and utility coverage across every form, layout, and feedback need",
      "Stabilize public APIs and harden RTL edge cases",
      "Grow the automated test suite and keep the registry green",
    ],
  },
  {
    title: "Design the block system",
    status: "next",
    tagline: "Agree on the building blocks before shipping them.",
    items: [
      "Define a block taxonomy — auth, dashboards, pricing, e-commerce, settings",
      "Create a reusable block authoring template with previews and one-command installs",
      "Ensure every block themes through a single set of tokens",
    ],
  },
  {
    title: "Ship Blocks",
    status: "later",
    tagline: "Full-page sections, ready for real products.",
    items: [
      "Publish a growing catalog of copy-paste blocks with live previews",
      "Add one-click install through the registry",
      "Open the floor to community-contributed blocks",
    ],
  },
]

export default function BlocksPage() {
  return (
    <RoadmapPage
      eyebrow="Roadmap"
      title="Blocks"
      description="Ready-made sections you can copy, paste, and own — auth flows, dashboards, pricing, and more. We're finishing a rock-solid component base first so every block is built on stable primitives."
      phases={phases}
    />
  )
}
