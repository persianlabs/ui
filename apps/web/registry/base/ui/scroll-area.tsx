"use client"

import * as React from "react"

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  scrollbarOrientation = "vertical",
  viewportRef,
  ...props
}: ScrollAreaPrimitive.Root.Props & {
  scrollbarOrientation?: ScrollAreaPrimitive.Scrollbar.Props["orientation"]
  /**
   * Ref to the underlying scrollable viewport element. Useful for consumers
   * that need direct access to the native scroll container, e.g. to drive a
   * virtualizer (react-virtuoso's `customScrollParent`).
   */
  viewportRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative flex flex-col", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        // Safe to apply unconditionally: scroll-fade shows nothing when the
        // content doesn't overflow, so every ScrollArea gets the effect for
        // free without needing to check per-usage whether it scrolls.
        className="min-h-0 flex-1 scroll-fade-y overscroll-contain rounded-[inherit] outline-none"
      >
        <ScrollAreaPrimitive.Content data-slot="scroll-area-content">
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation={scrollbarOrientation} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2 border-s border-s-transparent",
        orientation === "horizontal" &&
          "h-2 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
