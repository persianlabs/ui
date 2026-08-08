"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

type ResponsiveAlertDialogContextValue = {
  isDesktop: boolean
}

const ResponsiveAlertDialogContext =
  React.createContext<ResponsiveAlertDialogContextValue | null>(null)

function useResponsiveAlertDialogContext() {
  const context = React.useContext(ResponsiveAlertDialogContext)

  if (!context) {
    throw new Error(
      "ResponsiveAlertDialog components must be used within <ResponsiveAlertDialog>"
    )
  }

  return context
}

type ResponsiveAlertDialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function ResponsiveAlertDialog({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: ResponsiveAlertDialogProps) {
  const isMobile = useIsMobile()
  const isDesktop = !isMobile

  const contextValue = React.useMemo(() => ({ isDesktop }), [isDesktop])

  return (
    <ResponsiveAlertDialogContext.Provider value={contextValue}>
      {isDesktop ? (
        <AlertDialog
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          {children}
        </AlertDialog>
      ) : (
        // Alert Dialog never closes on an outside press — disablePointerDismissal
        // carries that same "must pick an action" behavior over to the mobile
        // drawer. Swiping down still dismisses it, same as a native action sheet.
        <Drawer
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          disablePointerDismissal
        >
          {children}
        </Drawer>
      )}
    </ResponsiveAlertDialogContext.Provider>
  )
}

function ResponsiveAlertDialogTrigger(
  props: React.ComponentProps<typeof AlertDialogTrigger>
) {
  const { isDesktop } = useResponsiveAlertDialogContext()
  return isDesktop ? (
    <AlertDialogTrigger {...props} />
  ) : (
    <DrawerTrigger {...(props as React.ComponentProps<typeof DrawerTrigger>)} />
  )
}

/**
 * Self-contained popup — like AlertDialogContent, it renders its own
 * portal/backdrop, so it's the only piece consumers place directly under
 * ResponsiveAlertDialog alongside the trigger.
 */
function ResponsiveAlertDialogContent(
  props: React.ComponentProps<typeof AlertDialogContent>
) {
  const { isDesktop } = useResponsiveAlertDialogContext()
  return isDesktop ? (
    <AlertDialogContent {...props} />
  ) : (
    <DrawerPopup
      showBar
      {...(props as React.ComponentProps<typeof DrawerPopup>)}
    />
  )
}

function ResponsiveAlertDialogHeader(
  props: React.ComponentProps<typeof AlertDialogHeader>
) {
  const { isDesktop } = useResponsiveAlertDialogContext()
  return isDesktop ? (
    <AlertDialogHeader {...props} />
  ) : (
    <DrawerHeader {...(props as React.ComponentProps<typeof DrawerHeader>)} />
  )
}

function ResponsiveAlertDialogFooter(
  props: React.ComponentProps<typeof AlertDialogFooter>
) {
  const { isDesktop } = useResponsiveAlertDialogContext()
  return isDesktop ? (
    <AlertDialogFooter {...props} />
  ) : (
    <DrawerFooter
      {...(props as React.ComponentProps<typeof DrawerFooter>)}
      className={cn(
        // Alert Dialog's action pair reads as a single choice, not a list —
        // keep Cancel/Continue side by side even on the drawer's narrow
        // mobile width instead of DrawerFooter's default stacked layout.
        "grid grid-cols-2",
        props.className
      )}
    />
  )
}

function ResponsiveAlertDialogTitle(
  props: React.ComponentProps<typeof AlertDialogTitle>
) {
  const { isDesktop } = useResponsiveAlertDialogContext()
  return isDesktop ? (
    <AlertDialogTitle {...props} />
  ) : (
    <DrawerTitle {...(props as React.ComponentProps<typeof DrawerTitle>)} />
  )
}

function ResponsiveAlertDialogDescription(
  props: React.ComponentProps<typeof AlertDialogDescription>
) {
  const { isDesktop } = useResponsiveAlertDialogContext()
  return isDesktop ? (
    <AlertDialogDescription {...props} />
  ) : (
    <DrawerDescription
      {...(props as React.ComponentProps<typeof DrawerDescription>)}
    />
  )
}

/**
 * A small icon badge above the title. AlertDialogMedia's own styles lean on
 * selectors scoped to AlertDialogContent's DOM, which the drawer doesn't
 * have — this renders the same look directly instead of reusing that
 * component, so it works identically on both platforms.
 */
function ResponsiveAlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="responsive-alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Just a styled Button on both platforms — like AlertDialogAction, it
 * carries no built-in close behavior, so there's nothing platform-specific
 * to branch on.
 */
function ResponsiveAlertDialogAction(
  props: React.ComponentProps<typeof AlertDialogAction>
) {
  return <AlertDialogAction {...props} />
}

function ResponsiveAlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogCancel>) {
  const { isDesktop } = useResponsiveAlertDialogContext()
  return isDesktop ? (
    <AlertDialogCancel
      className={className}
      variant={variant}
      size={size}
      {...props}
    />
  ) : (
    <DrawerClose
      data-slot="alert-dialog-cancel"
      className={className}
      render={<Button variant={variant} size={size} />}
      {...(props as React.ComponentProps<typeof DrawerClose>)}
    />
  )
}

export {
  ResponsiveAlertDialog,
  ResponsiveAlertDialogAction,
  ResponsiveAlertDialogCancel,
  ResponsiveAlertDialogContent,
  ResponsiveAlertDialogDescription,
  ResponsiveAlertDialogFooter,
  ResponsiveAlertDialogHeader,
  ResponsiveAlertDialogMedia,
  ResponsiveAlertDialogTitle,
  ResponsiveAlertDialogTrigger,
}
