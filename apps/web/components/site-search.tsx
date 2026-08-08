"use client"

import * as React from "react"
import type { Route } from "next"
import { useRouter } from "next/navigation"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIcon,
  CompassIcon,
  CornerDownLeftIcon,
  LayoutGridIcon,
  PackageIcon,
  SearchIcon,
  type LucideIcon,
} from "lucide-react"

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

/** Every item under a group shares its icon — one glyph per category, not per page. */
const groupIcons: Record<string, LucideIcon> = {
  "Getting Started": CompassIcon,
  Components: LayoutGridIcon,
  Resources: PackageIcon,
}

/**
 * Sourced from docsNav, so every enabled page there is automatically
 * searchable — no separate index to keep in sync.
 */
const searchGroups = docsNav
  .map((group) => ({
    value: group.title,
    icon: groupIcons[group.title] ?? BoxIcon,
    items: group.items
      .filter((item) => !item.disabled)
      .map(
        (item): SearchItem => ({
          value: item.href,
          label: item.title,
          href: item.href,
          badge: item.badge,
        })
      ),
  }))
  .filter((group) => group.items.length > 0)

export function SiteSearch() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

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
            className="w-9 justify-between text-muted-foreground sm:w-56"
          >
            <span className="flex items-center gap-1.5">
              <SearchIcon />
              <span className="hidden sm:inline">Search...</span>
            </span>
            <Kbd className="hidden sm:inline-flex">⌘K</Kbd>
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
                  <CommandGroupLabel className="flex items-center gap-1.5">
                    <group.icon className="size-3.5" />
                    {group.value}
                  </CommandGroupLabel>
                  <CommandCollection>
                    {(item: SearchItem) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onClick={() => handleSelect(item.href)}
                      >
                        <group.icon />
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
