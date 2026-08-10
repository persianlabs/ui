"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * PopoverContent renders through a Portal, so it doesn't inherit `dir` from a
 * nearby wrapper (only from document.documentElement). PopoverTrigger
 * measures the ambient direction where it's actually rendered and pushes it
 * here so PopoverContent can apply it explicitly to the portaled popup.
 */
const PopoverDirContext = React.createContext<{
  dir: "ltr" | "rtl"
  setDir: (dir: "ltr" | "rtl") => void
}>({ dir: "ltr", setDir: () => {} })

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")
  const contextValue = React.useMemo(() => ({ dir, setDir }), [dir])

  return (
    <PopoverDirContext.Provider value={contextValue}>
      <PopoverPrimitive.Root data-slot="popover" {...props} />
    </PopoverDirContext.Provider>
  )
}

function PopoverTrigger({
  className,
  ...props
}: PopoverPrimitive.Trigger.Props) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { setDir } = React.useContext(PopoverDirContext)

  React.useEffect(() => {
    function update() {
      if (!ref.current) return
      setDir(getComputedStyle(ref.current).direction === "rtl" ? "rtl" : "ltr")
    }

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
      subtree: true,
    })

    return () => observer.disconnect()
  }, [setDir])

  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      data-slot="popover-trigger"
      className={className}
      {...props}
    />
  )
}

function PopoverContent({
  className,
  sideOffset = 6,
  align,
  side,
  children,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "side"> & {
    sideOffset?: number
  }) {
  const { dir } = React.useContext(PopoverDirContext)

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        dir={dir}
        data-slot="popover-positioner"
        sideOffset={sideOffset}
        align={align}
        side={side}
        className="z-50 outline-none"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "w-72 origin-[var(--transform-origin)] rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-md duration-150 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverContent, PopoverTrigger }
