"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import {
  BounceSidebar,
  type BounceSidebarItem,
} from "@workspace/ui/components/bounce-sidebar"
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
 * Renders the docs table of contents as the BounceSidebar list, for pages
 * that opt in with `export const tocVariant = "bounce"`. The active item
 * follows the scroll position; clicking an item scrolls to its heading.
 */
export function BounceToc({ items }: { items: TocItem[] }) {
  const flat = useMemo(() => flatten(items), [items])
  const navItems: BounceSidebarItem[] = useMemo(
    () =>
      flat.map((section) => ({ label: section.title, depth: section.depth })),
    [flat]
  )
  const [active, setActive] = useState(0)
  const lockUntil = useRef(0)
  const idsKey = flat.map((section) => section.id).join("|")

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      if (Date.now() < lockUntil.current) return
      const anchorY = 96
      let next = 0
      for (let i = 0; i < flat.length; i++) {
        const el = document.getElementById(flat[i]!.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= anchorY) next = i
      }
      setActive(next)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    const init = () => {
      update()
    }
    init()

    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [flat, idsKey])

  const handleSelect = (index: number) => {
    setActive(index)
    lockUntil.current = Date.now() + 700
    const el = document.getElementById(flat[index]?.id ?? "")
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (navItems.length === 0) return null

  return (
    <BounceSidebar items={navItems} value={active} onChange={handleSelect} />
  )
}
