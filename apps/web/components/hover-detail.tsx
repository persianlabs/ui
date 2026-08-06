"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import * as React from "react"

export function HoverDetail({
  children,
  detail,
}: {
  children: React.ReactNode
  detail: React.ReactNode
}) {
  return (
    <TooltipPrimitive.Provider delay={150} closeDelay={0}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger
          className="text-foreground decoration-muted-foreground/60 cursor-default border-none bg-transparent p-0 font-mono underline decoration-dotted underline-offset-4"
          render={<span />}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner sideOffset={6}>
            <TooltipPrimitive.Popup className="bg-foreground text-background z-50 max-w-xs rounded-md px-2.5 py-1.5 font-mono text-xs leading-relaxed shadow-md">
              {detail}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
