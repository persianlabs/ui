"use client"

import * as React from "react"
import type { Route } from "next"
import Link from "next/link"

import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

import { Badge } from "@/components/badge"

export interface ComponentEntry {
  title: string
  href: string
  description: string
  badge?: string
  thumbnail: React.ReactNode
}

function matches(component: ComponentEntry, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    component.title.toLowerCase().includes(q) ||
    component.description.toLowerCase().includes(q)
  )
}

function ComponentCard({ component }: { component: ComponentEntry }) {
  return (
    <Link
      href={component.href as Route}
      className="overflow-hidden rounded-xl border border-border bg-card/40 transition-colors hover:bg-card/70"
    >
      {component.thumbnail}
      <div className="p-5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">{component.title}</h2>
          {component.badge && <Badge>{component.badge}</Badge>}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {component.description}
        </p>
      </div>
    </Link>
  )
}

export function ComponentsGrid({
  featured,
  rest,
}: {
  featured: ComponentEntry[]
  rest: ComponentEntry[]
}) {
  const [query, setQuery] = React.useState("")

  const filteredFeatured = React.useMemo(
    () => featured.filter((component) => matches(component, query)),
    [featured, query]
  )
  const filteredRest = React.useMemo(
    () => rest.filter((component) => matches(component, query)),
    [rest, query]
  )
  const hasResults = filteredFeatured.length > 0 || filteredRest.length > 0

  return (
    <div className="mt-8">
      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder="Search components..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      {!hasResults && (
        <p className="mt-8 text-sm text-muted-foreground">
          No components match &ldquo;{query}&rdquo;.
        </p>
      )}

      {filteredFeatured.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-medium text-muted-foreground">
            New &amp; Special
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFeatured.map((component) => (
              <ComponentCard key={component.href} component={component} />
            ))}
          </div>
        </div>
      )}

      {filteredRest.length > 0 && (
        <div className="mt-10">
          {filteredFeatured.length > 0 && (
            <h2 className="text-sm font-medium text-muted-foreground">
              All components
            </h2>
          )}
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRest.map((component) => (
              <ComponentCard key={component.href} component={component} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
