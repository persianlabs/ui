"use client"

import * as React from "react"
import type { Route } from "next"
import { useRouter } from "next/navigation"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIcon,
  CornerDownLeftIcon,
  SearchIcon,
} from "lucide-react"
import { DocText, MainComponent2, type IconFunction } from "reicon"

import { Button } from "@workspace/ui/components/button"
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@workspace/ui/components/command"
import { Kbd } from "@workspace/ui/components/kbd"

import { Badge } from "@/components/badge"
import { docsNav } from "@/lib/docs-nav"

interface SearchItem {
  value: string
  label: string
  href: string
  badge?: string
}

/**
 * Reicon ships imperative icon factories (DOM nodes / SVG strings), not React
 * components, so the markup is injected through a span. The inner svg picks up
 * CommandItem's `[&_svg]` sizing and muted color automatically.
 */
function ReiconGlyph({ icon }: { icon: IconFunction }) {
  return (
    <span
      aria-hidden
      className="inline-flex"
      dangerouslySetInnerHTML={{ __html: icon.toSvg({ size: 16 }) }}
    />
  )
}

/** Per-item glyphs — one per category, not per page. Group labels stay text-only. */
const groupIcons: Record<string, React.ReactNode> = {
  "Getting Started": <ReiconGlyph icon={DocText} />,
  Components: <ReiconGlyph icon={MainComponent2} />,
}

/**
 * Sourced from docsNav, so every enabled page there is automatically
 * searchable — no separate index to keep in sync.
 */
const searchGroups = docsNav
  .map((group) => ({
    value: group.title,
    icon: groupIcons[group.title] ?? <BoxIcon />,
    items: group.items
      .filter((item) => !item.disabled)
      .map((item): SearchItem => ({
        value: item.href,
        label: item.title,
        href: item.href,
        badge: item.badge,
      })),
  }))
  .filter((group) => group.items.length > 0)

export function SiteSearch() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  // Server render assumes the non-Apple label so Windows/Linux — the common
  // case here — get the right glyph on first paint; Apple devices swap to
  // the Command glyph after mount once the user agent is readable.
  const [isApple, setIsApple] = React.useState(false)

  React.useEffect(() => {
    const init = () =>
      setIsApple(/mac|iphone|ipad|ipod/i.test(window.navigator.userAgent))
    init()
  }, [])

  React.useEffect(() => {
    function down(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = React.useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href as Route)
    },
    [router]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandDialogTrigger
        render={
          <Button
            variant="outline"
            className="w-9 justify-between text-muted-foreground lg:w-56"
          >
            <span className="flex items-center gap-1.5">
              <SearchIcon />
              <span className="hidden lg:inline">Search...</span>
            </span>
            <Kbd className="hidden lg:inline-flex">
              {isApple ? "⌘K" : "Ctrl K"}
            </Kbd>
          </Button>
        }
      />
      <CommandDialogPopup
        title="Search"
        description="Search across every PersianLabs/ui page"
      >
        <Command items={searchGroups}>
          <CommandInput placeholder="Search pages and components..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            {(group: (typeof searchGroups)[number], index: number) => (
              <React.Fragment key={group.value}>
                <CommandGroup items={group.items}>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(item: SearchItem) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onClick={() => handleSelect(item.href)}
                      >
                        {group.icon}
                        {item.label}
                        {item.badge && (
                          <Badge className="ms-auto">{item.badge}</Badge>
                        )}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
                {index < searchGroups.length - 1 && <CommandSeparator />}
              </React.Fragment>
            )}
          </CommandList>
          <CommandFooter>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Kbd>
                  <ArrowUpIcon className="size-2.5" />
                </Kbd>
                <Kbd>
                  <ArrowDownIcon className="size-2.5" />
                </Kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <Kbd>
                  <CornerDownLeftIcon className="size-2.5" />
                </Kbd>
                to select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Kbd>esc</Kbd>
              to close
            </span>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  )
}
