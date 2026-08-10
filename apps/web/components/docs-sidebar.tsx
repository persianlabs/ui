"use client"

import * as React from "react"
import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/badge"
import { UtilityPreview } from "@/components/home-catalog"
import { docsNav, type DocsNavItem } from "@/lib/docs-nav"
import * as ComponentPreviews from "@/lib/component-previews"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"

function SidebarPreview({
  item,
  group,
}: {
  item: DocsNavItem
  group: string
}) {
  const isComponent = group === "Components"
  const previewName = `${item.title.replaceAll(" ", "")}Preview` as keyof typeof ComponentPreviews
  const ComponentPreview = ComponentPreviews[previewName] as
    | React.ComponentType
    | undefined

  return (
    <TooltipContent
      side="right"
      align="center"
      sideOffset={12}
      showArrow={false}
      className="pointer-events-none hidden w-72 overflow-hidden rounded-xl bg-popover p-0 text-popover-foreground shadow-lg ring-1 ring-foreground/10 lg:block"
    >
      {isComponent && ComponentPreview ? (
        <div className="flex h-44 items-center justify-center overflow-hidden bg-card px-5 pt-7 pb-5">
          <ComponentPreview />
        </div>
      ) : (
        <div className="h-44 overflow-hidden">
          <UtilityPreview item={item} />
        </div>
      )}
    </TooltipContent>
  )
}

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <TooltipProvider delay={0} closeDelay={0}>
      <nav className="flex flex-col gap-6 text-sm">
      {docsNav.map((group) => (
        <div key={group.title}>
          <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              if (item.disabled) {
                return (
                  <li key={item.href}>
                    <span className="text-muted-foreground flex cursor-not-allowed items-center justify-between gap-2 rounded-md px-2.5 py-1.5">
                      {item.title}
                      {item.badge && <Badge variant="muted">{item.badge}</Badge>}
                    </span>
                  </li>
                )
              }

              const active = pathname === item.href

              return (
                <li key={item.href}>
                  {group.title === "Components" || group.title === "Utilities" ? (
                    <Tooltip disableHoverablePopup>
                      <TooltipTrigger
                        render={
                          <Link
                            href={item.href as Route}
                            onClick={onNavigate}
                            className={cn(
                              "flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 transition-colors",
                              active
                                ? "bg-muted text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                            )}
                          />
                        }
                      >
                        {item.title}
                        {item.badge && <Badge>{item.badge}</Badge>}
                      </TooltipTrigger>
                      <SidebarPreview
                        item={item}
                        group={group.title}
                      />
                    </Tooltip>
                  ) : (
                    <Link
                      href={item.href as Route}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 transition-colors",
                        active
                          ? "bg-muted text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
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
