"use client"

import * as React from "react"

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { cn } from "@workspace/ui/lib/utils"

/**
 * ComboboxContent renders through a Portal, so it doesn't inherit `dir` from
 * a nearby wrapper (only from document.documentElement). ComboboxInputGroup
 * measures the ambient direction where it's actually rendered and pushes it
 * here so ComboboxContent can apply it explicitly to the portaled popup.
 */
const ComboboxDirContext = React.createContext<{
  dir: "ltr" | "rtl"
  setDir: (dir: "ltr" | "rtl") => void
}>({ dir: "ltr", setDir: () => {} })

function Combobox<Value, Multiple extends boolean | undefined = false>({
  ...props
}: ComboboxPrimitive.Root.Props<Value, Multiple>) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")
  const contextValue = React.useMemo(() => ({ dir, setDir }), [dir])

  return (
    <ComboboxDirContext.Provider value={contextValue}>
      <ComboboxPrimitive.Root data-slot="combobox" {...props} />
    </ComboboxDirContext.Provider>
  )
}

function ComboboxInputGroup({
  className,
  ...props
}: ComboboxPrimitive.InputGroup.Props) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { setDir } = React.useContext(ComboboxDirContext)

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
    <ComboboxPrimitive.InputGroup
      ref={ref}
      data-slot="combobox-input-group"
      className={cn(
        "border-border bg-background focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 relative flex h-8 w-full items-center gap-1.5 rounded-lg border px-2.5 has-[input:disabled]:pointer-events-none has-[input:disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function ComboboxInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      className={cn(
        "placeholder:text-muted-foreground w-full min-w-0 bg-transparent text-sm outline-none",
        className
      )}
      {...props}
    />
  )
}

function ComboboxIcon({ className, ...props }: ComboboxPrimitive.Icon.Props) {
  return (
    <ComboboxPrimitive.Icon
      data-slot="combobox-icon"
      className={cn(
        "text-muted-foreground flex shrink-0 items-center justify-center",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </ComboboxPrimitive.Icon>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(
        "text-muted-foreground hover:text-foreground shrink-0",
        className
      )}
      {...props}
    >
      <XIcon className="size-3.5" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: ComboboxPrimitive.Positioner.Props & {
  sideOffset?: number
}) {
  const { dir } = React.useContext(ComboboxDirContext)

  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        dir={dir}
        data-slot="combobox-positioner"
        sideOffset={sideOffset}
        className="z-50 outline-none"
        {...props}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "bg-popover text-popover-foreground border-border data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 flex max-h-80 w-[var(--anchor-width)] min-w-40 origin-[var(--transform-origin)] flex-col overflow-hidden rounded-lg border p-1 shadow-md duration-150",
            className
          )}
        >
          <ScrollArea className="min-h-0 flex-1">{children}</ScrollArea>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection {...props} />
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "text-muted-foreground py-6 text-center text-sm empty:m-0 empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "data-[highlighted]:bg-muted data-[highlighted]:text-foreground text-muted-foreground relative flex cursor-default items-center gap-2 rounded-md py-1.5 pe-2 ps-7 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[selected]:text-foreground",
        className
      )}
      {...props}
    >
      <ComboboxPrimitive.ItemIndicator className="absolute start-2 inline-flex items-center justify-center">
        <CheckIcon className="size-3.5" />
      </ComboboxPrimitive.ItemIndicator>
      {children}
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function ComboboxGroupLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-group-label"
      className={cn(
        "text-muted-foreground px-2 py-1.5 text-xs font-medium",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { setDir } = React.useContext(ComboboxDirContext)

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
    <ComboboxPrimitive.Chips
      ref={ref}
      data-slot="combobox-chips"
      className={cn(
        "border-border bg-background focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 flex min-h-8 w-full flex-wrap items-center gap-1 rounded-lg border px-2 py-1",
        className
      )}
      {...props}
    />
  )
}

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value {...props} />
}

function ComboboxChip({ className, children, ...props }: ComboboxPrimitive.Chip.Props) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "bg-muted text-foreground inline-flex items-center gap-1 rounded-md py-0.5 pe-1 ps-2 text-xs",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ChipRemove className="hover:bg-background/60 inline-flex size-4 items-center justify-center rounded-sm">
        <XIcon className="size-3" />
      </ComboboxPrimitive.ChipRemove>
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chips-input"
      className={cn(
        "placeholder:text-muted-foreground min-w-16 flex-1 bg-transparent text-sm outline-none",
        className
      )}
      {...props}
    />
  )
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
}
