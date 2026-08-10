"use client"

import * as React from "react"

import { Autocomplete as CommandPrimitive } from "@base-ui/react/autocomplete"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { SearchIcon } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

/**
 * Command palette defaults: always open (it's never a floating popup on its
 * own — CommandDialogPopup or CommandPanel provide the surface), and the
 * first match stays highlighted so Enter/ArrowDown feel instant.
 */
function Command({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Root>) {
  return (
    <CommandPrimitive.Root
      data-slot="command"
      autoHighlight="always"
      keepHighlight
      open
      {...props}
    />
  )
}

function CommandInput({ className, ...props }: CommandPrimitive.Input.Props) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-11 items-center gap-2 border-b border-border px-3"
    >
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-11 w-full min-w-0 rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: CommandPrimitive.List.Props) {
  return (
    <ScrollArea className="max-h-80">
      <CommandPrimitive.List
        data-slot="command-list"
        className={cn("flex flex-col gap-0.5 p-1", className)}
        {...props}
      />
    </ScrollArea>
  )
}

function CommandCollection(props: CommandPrimitive.Collection.Props) {
  return <CommandPrimitive.Collection {...props} />
}

function CommandEmpty({ className, ...props }: CommandPrimitive.Empty.Props) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "py-6 text-center text-sm text-muted-foreground empty:m-0 empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function CommandGroup({ className, ...props }: CommandPrimitive.Group.Props) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function CommandGroupLabel({
  className,
  ...props
}: CommandPrimitive.GroupLabel.Props) {
  return (
    <CommandPrimitive.GroupLabel
      data-slot="command-group-label"
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandItem({ className, ...props }: CommandPrimitive.Item.Props) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-muted data-[highlighted]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: CommandPrimitive.Separator.Props) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      dir="ltr"
      className={cn(
        "ms-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-footer"
      className={cn(
        "hidden items-center justify-between gap-2 border-t border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground sm:flex",
        className
      )}
      {...props}
    />
  )
}

function CommandPanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-panel"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  )
}

/**
 * CommandDialogPopup renders through a Portal, so it doesn't inherit `dir`
 * from a nearby wrapper (only from document.documentElement). CommandDialogTrigger
 * measures the ambient direction where it's actually rendered and pushes it
 * here so CommandDialogPopup can apply it explicitly to the portaled popup.
 */
const CommandDialogDirContext = React.createContext<{
  dir: "ltr" | "rtl"
  setDir: (dir: "ltr" | "rtl") => void
}>({ dir: "ltr", setDir: () => {} })

function CommandDialog({ ...props }: DialogPrimitive.Root.Props) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")
  const contextValue = React.useMemo(() => ({ dir, setDir }), [dir])

  return (
    <CommandDialogDirContext.Provider value={contextValue}>
      <DialogPrimitive.Root data-slot="command-dialog" {...props} />
    </CommandDialogDirContext.Provider>
  )
}

function CommandDialogTrigger({
  className,
  ...props
}: DialogPrimitive.Trigger.Props) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { setDir } = React.useContext(CommandDialogDirContext)

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
    <DialogPrimitive.Trigger
      ref={ref}
      data-slot="command-dialog-trigger"
      className={className}
      {...props}
    />
  )
}

function CommandDialogPopup({
  className,
  portalProps,
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: DialogPrimitive.Popup.Props & {
  portalProps?: DialogPrimitive.Portal.Props
  title?: string
  description?: string
}) {
  const { dir } = React.useContext(CommandDialogDirContext)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  return (
    <DialogPrimitive.Portal {...portalProps}>
      <DialogPrimitive.Backdrop
        data-slot="command-dialog-backdrop"
        className="fixed inset-0 z-50 bg-black/45 backdrop-blur-md duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
      />
      <div
        dir={dir}
        className="fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4"
        // The inner Command is permanently `open`, so its own Escape handling
        // never actually closes anything — but Base UI still treats it as a
        // dismiss-blocking child of the dialog and swallows the key before
        // the dialog's own Escape-to-close ever sees it. Intercepting here,
        // above the command but still below `document` (where Base UI's
        // listener lives), closes the dialog directly and stops the event
        // before it can be swallowed.
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation()
            closeRef.current?.click()
          }
        }}
      >
        <DialogPrimitive.Popup
          data-slot="command-dialog-popup"
          className={cn(
            "row-start-2 flex max-h-[calc(100dvh-2rem)] w-full max-w-lg min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-lg duration-150 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          <DialogPrimitive.Title className="sr-only">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {description}
          </DialogPrimitive.Description>
          <DialogPrimitive.Close
            ref={closeRef}
            className="hidden"
            tabIndex={-1}
          />
          {children}
        </DialogPrimitive.Popup>
      </div>
    </DialogPrimitive.Portal>
  )
}

export {
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
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
}
