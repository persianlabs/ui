"use client"

import { ProximitySidebar } from "@workspace/ui/components/proximity-sidebar"

const sections = [
  { id: "psd-intro", label: "Introduction", level: 1 },
  { id: "psd-setup", label: "Setup", level: 2 },
  { id: "psd-api", label: "API", kind: "section" },
  { id: "psd-notes", label: "Notes", kind: "body" },
  { id: "psd-faq", label: "FAQ", level: 2 },
] as const

const content: Record<(typeof sections)[number]["id"], string> = {
  "psd-intro":
    "The minimap mirrors the reading structure of the document, one dash per section.",
  "psd-setup":
    "Install the component and place matching ids on your content blocks.",
  "psd-api":
    "The API stays small: sections, side, and the active offset ratio.",
  "psd-notes":
    "Every dash is a real button with an accessible label, not decoration.",
  "psd-faq":
    "Clicking a dash scrolls to its matching block and pulses the mark.",
}

export function ProximitySidebarDemoExample() {
  return (
    <div className="flex h-72 overflow-hidden rounded-xl border bg-card">
      <aside className="h-full py-4">
        <ProximitySidebar sections={[...sections]} />
      </aside>
      <div className="h-full flex-1 space-y-24 overflow-y-auto p-6">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h3 className="text-sm font-semibold">{section.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {content[section.id]}
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
