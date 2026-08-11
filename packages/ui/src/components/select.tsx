"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import * as React from "react"

import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { cn } from "@workspace/ui/lib/utils"

/**
 * SelectContent renders through a Portal, so it doesn't inherit `dir` from a
 * nearby wrapper (only from document.documentElement). SelectTrigger
 * measures the ambient direction where it's actually rendered and pushes it
 * here so SelectContent can apply it explicitly to the portaled popup.
 */
const SelectDirContext = React.createContext<{
  dir: "ltr" | "rtl"
  setDir: (dir: "ltr" | "rtl") => void
}>({ dir: "ltr", setDir: () => {} })

function Select<Value, Multiple extends boolean | undefined = false>({
  ...props
}: SelectPrimitive.Root.Props<Value, Multiple>) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")
  const contextValue = React.useMemo(() => ({ dir, setDir }), [dir])

  return (
    <SelectDirContext.Provider value={contextValue}>
      <SelectPrimitive.Root data-slot="select" {...props} />
    </SelectDirContext.Provider>
  )
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { setDir } = React.useContext(SelectDirContext)

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
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      className={cn(
        "flex h-8 w-full items-center justify-between gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[placeholder]:text-muted-foreground data-[popup-open]:border-ring",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="flex shrink-0 items-center justify-center text-muted-foreground">
        <ChevronDownIcon className="size-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectValue(props: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: SelectPrimitive.Positioner.Props & {
  sideOffset?: number
}) {
  const { dir } = React.useContext(SelectDirContext)

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        dir={dir}
        data-slot="select-positioner"
        sideOffset={sideOffset}
        className="z-50 outline-none"
        // Base UI's default alignItemWithTrigger={true} tries to overlay the
        // selected item's text on top of the trigger's own text (native-
        // <select>-like UX), computed via a custom position:fixed + manual
        // measurement path instead of normal anchor-based floating-ui
        // placement. That measurement path was producing a popup positioned
        // at (0,0) with zero size in this app -- reproducible even on this
        // component's own bare doc-page demo. Falling back to standard
        // anchor-below-trigger placement sidesteps that measurement path
        // entirely and is more predictable for custom-styled triggers.
        alignItemWithTrigger={false}
        {...props}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "flex max-h-80 w-[var(--anchor-width)] min-w-40 origin-[var(--transform-origin)] flex-col overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
        >
          <ScrollArea className="min-h-0 flex-1">
            <SelectPrimitive.List className="p-1">
              {children}
            </SelectPrimitive.List>
          </ScrollArea>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-md py-1.5 ps-7 pe-2 text-sm text-muted-foreground outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-muted data-[highlighted]:text-foreground data-[selected]:text-foreground",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="absolute start-2 inline-flex items-center justify-center">
        <CheckIcon className="size-3.5" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectGroup({ ...props }: SelectPrimitive.Group.Props) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectGroupLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-group-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
