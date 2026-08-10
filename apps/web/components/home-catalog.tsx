"use client"

import * as React from "react"
import type { Route } from "next"
import Link from "next/link"
import { ArrowRightIcon, CopyIcon, SearchIcon } from "lucide-react"

import { Input } from "@workspace/ui/components/input"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Hitbox } from "@workspace/ui/components/hitbox"

import { docsNav, type DocsNavItem } from "@/lib/docs-nav"

const utilities = docsNav.find((group) => group.title === "Utilities")!.items

const utilityDescriptions: Record<string, string> = {
  Hitbox: "Expands touch targets without changing the visible control.",
  "Normalize Persian Digits": "Converts Persian and Arabic numerals into a consistent format.",
  useControllableState: "Synchronizes controlled and uncontrolled component state.",
  useCopyToClipboard: "Copies text with a simple, reliable browser API wrapper.",
  useMediaQuery: "Responds to viewport and device queries from React.",
}

export function UtilityPreview({ item }: { item: DocsNavItem }) {
  switch (item.title) {
    case "Hitbox":
      return <div className="flex h-full items-center justify-center bg-card"><Hitbox debug><Checkbox /></Hitbox></div>
    case "Normalize Persian Digits":
      return <div className="flex h-full items-center justify-center gap-3 bg-card font-mono"><span className="rounded-md bg-muted px-2 py-1 text-sm">۱۲۳۴۵</span><ArrowRightIcon className="size-3.5 text-muted-foreground" /><span className="rounded-md border border-border bg-background px-2 py-1 text-sm">12345</span></div>
    case "useControllableState":
      return <div className="flex h-full items-center justify-center bg-card p-5"><div className="w-40 rounded-lg border border-border bg-background p-3 shadow-sm"><div className="flex items-center justify-between text-[10px]"><span>Controlled</span><span className="size-2 rounded-full bg-primary" /></div><div className="mt-3 flex gap-1">{[0, 1, 2].map((dot) => <span key={dot} className={`h-1.5 flex-1 rounded-full ${dot === 1 ? "bg-primary" : "bg-muted"}`} />)}</div></div></div>
    case "useCopyToClipboard":
      return <div className="flex h-full items-center justify-center bg-card"><div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-sm"><code>npm install</code><span className="border-l border-border pl-2"><CopyIcon className="size-3.5" /></span></div></div>
    case "useMediaQuery":
      return <div className="flex h-full items-center justify-center gap-2 bg-card p-5"><div className="h-12 w-16 rounded border border-border bg-muted" /><div className="h-16 w-24 rounded border-2 border-primary bg-background" /><div className="h-12 w-16 rounded border border-border bg-muted" /></div>
    default:
      return null
  }
}

function UtilityCard({ item }: { item: DocsNavItem }) {
  return <Link href={item.href as Route} className="overflow-hidden rounded-xl border border-border bg-card/40 transition-colors hover:bg-card/70"><div className="h-44 w-full bg-[var(--card)] text-[var(--card-foreground)]">{<UtilityPreview item={item} />}</div><div className="p-5"><div className="flex items-center gap-2"><h3 className="text-sm font-medium">{item.title}</h3></div><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{utilityDescriptions[item.title]}</p></div></Link>
}

export function HomeCatalog() {
  const [query, setQuery] = React.useState("")
  const items = utilities.filter((item) => !item.disabled && item.title.toLowerCase().includes(query.trim().toLowerCase()))

  return <section className="w-full border-t border-border/60 px-6 py-20 sm:py-24"><div className="mx-auto max-w-5xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div className="max-w-xl"><p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Small helpers, strong foundations</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Utilities for the details that make an interface feel right.</h2><p className="mt-3 text-muted-foreground">Purpose-built helpers for RTL, responsive behavior, and real product interactions.</p></div><label className="relative block w-full sm:w-72"><span className="sr-only">Search utilities</span><SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search utilities..." className="h-10 pl-9" /></label></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <UtilityCard key={item.href} item={item} />)}</div>{items.length === 0 && <p className="mt-8 text-center text-sm text-muted-foreground">No utilities match “{query}”.</p>}</div></section>
}
