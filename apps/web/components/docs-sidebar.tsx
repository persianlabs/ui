"use client"

import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/badge"
import { docsNav } from "@/lib/docs-nav"
import { cn } from "@workspace/ui/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
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
                  <Link
                    href={item.href as Route}
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
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
