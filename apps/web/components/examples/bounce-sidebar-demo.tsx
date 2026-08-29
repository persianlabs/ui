"use client"

import { useState } from "react"

import {
  BounceSidebar,
  type BounceSidebarItem,
} from "@workspace/ui/components/bounce-sidebar"

const items: BounceSidebarItem[] = [
  { label: "Getting started", heading: true },
  { label: "Home", href: "#" },
  { label: "Profile", href: "#" },
  { label: "Messages", href: "#" },
  { label: "Settings", heading: true },
  { label: "General", href: "#" },
  { label: "Billing", href: "#" },
  { label: "Danger zone", href: "#" },
]

export function BounceSidebarDemoExample() {
  const [active, setActive] = useState(1)

  return (
    <div className="rounded-xl border bg-card p-6">
      <BounceSidebar items={items} defaultValue={active} onChange={setActive} />
    </div>
  )
}
