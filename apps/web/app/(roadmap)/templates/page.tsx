import type { Metadata } from "next"

import { RoadmapPage, type RoadmapPhase } from "@/components/roadmap-page"

export const metadata: Metadata = {
  title: "Templates",
  description:
    "The roadmap for Templates and the marketplace on PersianLabs/ui - free and paid templates, public and private repos.",
}

const phases: RoadmapPhase[] = [
  {
    title: "Free templates",
    status: "next",
    tagline: "Start-from templates to kick off real projects.",
    items: [
      "A handful of polished, production-leaning starter templates",
      "Admin dashboard, marketing site, and e-commerce layouts",
      "Built entirely with PersianLabs UI — RTL-first, no vendored CSS",
    ],
  },
  {
    title: "Paid templates & marketplace",
    status: "later",
    tagline: "A place to buy premium templates — and sell your own.",
    items: [
      "Premium paid templates for professional projects",
      "A marketplace where you can list a template built with PersianLabs UI",
      "Add your own contact button for payment right on your listing",
    ],
  },
  {
    title: "How paid templates work",
    status: "later",
    tagline: "Public or private — you stay in control after you buy.",
    items: [
      "Free templates ship from public repositories",
      "Paid templates are private; after payment you're invited over Telegram",
      "You get read-only access to the repo so you always receive updates",
      "Open issues anytime to request updates or report problems",
    ],
  },
]

export default function TemplatesPage() {
  return (
    <RoadmapPage
      eyebrow="Roadmap"
      title="Templates"
      description="Start-from templates built with PersianLabs UI — free and paid — plus a marketplace where you can sell your own. Free templates are public; paid ones are private and delivered over Telegram with lifetime read-only access."
      phases={phases}
    />
  )
}
