"use client"

import * as React from "react"
import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/badge"
import { UtilityPreview } from "@/components/home-catalog"
import { docsNav, type DocsNavItem } from "@/lib/docs-nav"
import * as ComponentPreviews from "@/components/previews"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"

function SidebarPreview({ item, group }: { item: DocsNavItem; group: string }) {
  const isComponent = group === "Components"
  const previewName =
    `${item.title.replaceAll(" ", "")}Preview` as keyof typeof ComponentPreviews
  const ComponentPreview = ComponentPreviews[previewName] as
    React.ComponentType | undefined

  return (
    <TooltipContent
      side="right"
      align="center"
      sideOffset={12}
      showArrow={false}
      className="pointer-events-none hidden w-72 overflow-hidden rounded-xl bg-popover p-0 text-popover-foreground shadow-lg ring-1 ring-foreground/10 lg:block"
    >
      {isComponent ? (
        <div className="flex items-center justify-center overflow-hidden bg-card p-8">
          {ComponentPreview ? (
            <ComponentPreview />
          ) : (
            <span className="text-xs text-muted-foreground">
              No preview available
            </span>
          )}
        </div>
      ) : (
        <div className="h-44 overflow-hidden">
          <UtilityPreview item={item} />
        </div>
      )}
    </TooltipContent>
  )
}

/**
 * Walks up from `el` to the nearest scrollable ancestor. The desktop
 * sidebar sits inside a ScrollArea (Radix/Base UI sets overflow on its
 * `[data-slot="scroll-area-viewport"]`), while the mobile nav's Dialog.Popup
 * scrolls itself directly via a plain `overflow-y-auto` class -- walking up
 * by computed style covers both without hardcoding either structure.
 */
function findScrollParent(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement
  while (node) {
    const style = getComputedStyle(node)
    if (
      /(auto|scroll)/.test(style.overflowY) &&
      node.scrollHeight > node.clientHeight
    ) {
      return node
    }
    node = node.parentElement
  }
  return null
}

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const activeLinkRef = React.useRef<HTMLAnchorElement | null>(null)
  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    const link = activeLinkRef.current
    const wasFirstRender = isFirstRender.current
    isFirstRender.current = false
    if (!link) return

    const viewport = findScrollParent(link)
    if (!viewport) return

    const linkRect = link.getBoundingClientRect()
    const viewportRect = viewport.getBoundingClientRect()
    const isVisible =
      linkRect.top >= viewportRect.top && linkRect.bottom <= viewportRect.bottom
    if (isVisible) return

    // Direct page load: jump straight to centered, no animation. Client-side
    // navigation to a page whose sidebar entry has scrolled out of view:
    // ease it into view instead of snapping.
    link.scrollIntoView({
      block: "center",
      behavior: wasFirstRender ? "instant" : "smooth",
    })
  }, [pathname])

  return (
    <TooltipProvider delay={0} closeDelay={0}>
      <nav className="flex flex-col gap-6 text-sm">
        {docsNav.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {group.title}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                if (item.disabled) {
                  return (
                    <li key={item.href}>
                      <span className="flex cursor-not-allowed items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-muted-foreground">
                        {item.title}
                        {item.badge && (
                          <Badge variant="muted">{item.badge}</Badge>
                        )}
                      </span>
                    </li>
                  )
                }

                const active = pathname === item.href
                const isPreviewable =
                  group.title === "Components" || group.title === "Utilities"

                return (
                  <li key={item.href}>
                    {isPreviewable ? (
                      <Tooltip disableHoverablePopup>
                        <TooltipTrigger
                          render={
                            <Link
                              ref={active ? activeLinkRef : undefined}
                              href={item.href as Route}
                              onClick={onNavigate}
                              className={cn(
                                "flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 transition-colors",
                                active
                                  ? "bg-muted font-medium text-foreground"
                                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                              )}
                            />
                          }
                        >
                          {item.title}
                          {item.badge && <Badge>{item.badge}</Badge>}
                        </TooltipTrigger>
                        <SidebarPreview item={item} group={group.title} />
                      </Tooltip>
                    ) : (
                      <Link
                        ref={active ? activeLinkRef : undefined}
                        href={item.href as Route}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 transition-colors",
                          active
                            ? "bg-muted font-medium text-foreground"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        {item.title}
                        {item.badge && <Badge>{item.badge}</Badge>}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </TooltipProvider>
  )
}
