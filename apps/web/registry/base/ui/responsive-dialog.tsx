"use client"

import * as React from "react"

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-media-query"

type ResponsiveDialogContextValue = {
  isDesktop: boolean
}

const ResponsiveDialogContext =
  React.createContext<ResponsiveDialogContextValue | null>(null)

function useResponsiveDialogContext() {
  const context = React.useContext(ResponsiveDialogContext)

  if (!context) {
    throw new Error(
      "ResponsiveDialog components must be used within <ResponsiveDialog>"
    )
  }

  return context
}

type ResponsiveDialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  /** Which edge the drawer slides in from on mobile. @defaultValue "bottom" */
  drawerPosition?: "right" | "left" | "top" | "bottom" | "start" | "end"
}

function ResponsiveDialog({
  open,
  defaultOpen,
  onOpenChange,
  children,
  drawerPosition = "bottom",
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile()
  const isDesktop = !isMobile

  const contextValue = React.useMemo(() => ({ isDesktop }), [isDesktop])

  return (
    <ResponsiveDialogContext.Provider value={contextValue}>
      {isDesktop ? (
        <Dialog
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          {children}
        </Dialog>
      ) : (
        <Drawer
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          position={drawerPosition}
        >
          {children}
        </Drawer>
      )}
    </ResponsiveDialogContext.Provider>
  )
}

function ResponsiveDialogTrigger(
  props: React.ComponentProps<typeof DialogTrigger>
) {
  const { isDesktop } = useResponsiveDialogContext()
  return isDesktop ? (
    <DialogTrigger {...props} />
  ) : (
    <DrawerTrigger {...(props as React.ComponentProps<typeof DrawerTrigger>)} />
  )
}

function ResponsiveDialogClose(
  props: React.ComponentProps<typeof DialogClose>
) {
  const { isDesktop } = useResponsiveDialogContext()
  return isDesktop ? (
    <DialogClose {...props} />
  ) : (
    <DrawerClose {...(props as React.ComponentProps<typeof DrawerClose>)} />
  )
}

function ResponsiveDialogPopup(
  props: React.ComponentProps<typeof DialogPopup>
) {
  const { isDesktop } = useResponsiveDialogContext()
  return isDesktop ? (
    <DialogPopup {...props} />
  ) : (
    <DrawerPopup {...(props as React.ComponentProps<typeof DrawerPopup>)} />
  )
}

function ResponsiveDialogPanel(
  props: React.ComponentProps<typeof DialogPanel>
) {
  const { isDesktop } = useResponsiveDialogContext()
  return isDesktop ? (
    <DialogPanel {...props} />
  ) : (
    <DrawerPanel {...(props as React.ComponentProps<typeof DrawerPanel>)} />
  )
}

function ResponsiveDialogHeader(
  props: React.ComponentProps<typeof DialogHeader>
) {
  const { isDesktop } = useResponsiveDialogContext()
  return isDesktop ? (
    <DialogHeader {...props} />
  ) : (
    <DrawerHeader {...(props as React.ComponentProps<typeof DrawerHeader>)} />
  )
}

function ResponsiveDialogFooter(
  props: React.ComponentProps<typeof DialogFooter>
) {
  const { isDesktop } = useResponsiveDialogContext()
  return isDesktop ? (
    <DialogFooter {...props} />
  ) : (
    <DrawerFooter {...(props as React.ComponentProps<typeof DrawerFooter>)} />
  )
}

function ResponsiveDialogTitle(
  props: React.ComponentProps<typeof DialogTitle>
) {
  const { isDesktop } = useResponsiveDialogContext()
  return isDesktop ? (
    <DialogTitle {...props} />
  ) : (
    <DrawerTitle {...(props as React.ComponentProps<typeof DrawerTitle>)} />
  )
}

function ResponsiveDialogDescription(
  props: React.ComponentProps<typeof DialogDescription>
) {
  const { isDesktop } = useResponsiveDialogContext()
  return isDesktop ? (
    <DialogDescription {...props} />
  ) : (
    <DrawerDescription
      {...(props as React.ComponentProps<typeof DrawerDescription>)}
    />
  )
}

/**
 * Renders children on desktop only. On mobile the dialog is a bottom drawer
 * users dismiss by swiping down, so a Cancel button is redundant there.
 *
 * Convention: wrap every Cancel/انصراف action in this so it shows on desktop
 * only; keep the confirm/primary action outside so it stays on both. The
 * footer is flex, so the lone primary button fills the width on mobile.
 */
function ResponsiveDialogDesktopOnly({
  children,
}: {
  children: React.ReactNode
}) {
  const { isDesktop } = useResponsiveDialogContext()
  if (!isDesktop) return null
  return <>{children}</>
}

export {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogDescription,
  ResponsiveDialogDesktopOnly,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogPanel,
  ResponsiveDialogPopup,
  ResponsiveDialogPopup as ResponsiveDialogContent,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
}
