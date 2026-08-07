"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { CheckIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * DropdownMenuContent renders through a Portal, so it doesn't inherit `dir`
 * from a nearby wrapper (only from document.documentElement).
 * DropdownMenuTrigger measures the ambient direction where it's actually
 * rendered and pushes it here so DropdownMenuContent can apply it explicitly
 * to the portaled popup.
 */
const DropdownMenuDirContext = React.createContext<{
  dir: "ltr" | "rtl"
  setDir: (dir: "ltr" | "rtl") => void
}>({ dir: "ltr", setDir: () => {} })

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")
  const contextValue = React.useMemo(() => ({ dir, setDir }), [dir])

  return (
    <DropdownMenuDirContext.Provider value={contextValue}>
      <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
    </DropdownMenuDirContext.Provider>
  )
}

function DropdownMenuTrigger({
  className,
  ...props
}: MenuPrimitive.Trigger.Props) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { setDir } = React.useContext(DropdownMenuDirContext)

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
    <MenuPrimitive.Trigger
      ref={ref}
      data-slot="dropdown-menu-trigger"
      className={className}
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 6,
  align,
  side,
  children,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "side"> & {
    sideOffset?: number
  }) {
  const { dir } = React.useContext(DropdownMenuDirContext)

  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        dir={dir}
        data-slot="dropdown-menu-positioner"
        sideOffset={sideOffset}
        align={align}
        side={side}
        className="z-50 outline-none"
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "min-w-40 origin-[var(--transform-origin)] rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md transition-[opacity,transform] duration-150 outline-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-muted data-[highlighted]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-md py-1.5 ps-7 pe-2 text-sm text-foreground outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-muted data-[highlighted]:text-foreground",
        className
      )}
      {...props}
    >
      <MenuPrimitive.CheckboxItemIndicator className="absolute start-2 inline-flex items-center justify-center">
        <CheckIcon className="size-3.5" />
      </MenuPrimitive.CheckboxItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuGroupLabel({
  className,
  ...props
}: MenuPrimitive.GroupLabel.Props) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-group-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
}
