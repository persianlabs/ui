"use client"

import ProximitySidebar from "@workspace/ui/components/proximity-sidebar"
import type { TocItem } from "@/components/table-of-contents"

type FlatSection = { id: string; title: string; depth: number }

function flatten(items: TocItem[], depth = 0): FlatSection[] {
  const result: FlatSection[] = []
  for (const item of items) {
    result.push({ id: item.id, title: item.title, depth })
    if (item.children) result.push(...flatten(item.children, depth + 1))
  }
  return result
}

/**
 * Renders the docs table of contents as the ProximitySidebar document
 * minimap, for pages that opt in with `export const tocVariant = "proximity"`.
 */
export function ProximityToc({ items }: { items: TocItem[] }) {
  const sections = flatten(items).map((section) => ({
    id: section.id,
    label: section.title,
    level: section.depth === 0 ? (2 as const) : (3 as const),
  }))

  if (sections.length === 0) return null

  return (
    <ProximitySidebar sections={sections} side="right" activeOffset={0.3} />
  )
}
