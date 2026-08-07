"use client"

import * as React from "react"

import {
  Drawer,
  DrawerClose,
  DrawerMenu,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuItem,
  DrawerMenuSeparator,
  DrawerPanel,
  DrawerPopup,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { useIsMobile } from "@workspace/ui/hooks/use-media-query"

type ResponsiveMenuContextValue = { isDesktop: boolean }

const ResponsiveMenuContext =
  React.createContext<ResponsiveMenuContextValue | null>(null)

function useResponsiveMenuContext() {
  const context = React.useContext(ResponsiveMenuContext)
  if (!context) {
    throw new Error(
      "ResponsiveMenu components must be used within <ResponsiveMenu>"
    )
  }
  return context
}

type ResponsiveMenuProps = {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function ResponsiveMenu({
  children,
  open,
  defaultOpen,
  onOpenChange,
}: ResponsiveMenuProps) {
  const isDesktop = !useIsMobile()

  return (
    <ResponsiveMenuContext.Provider value={{ isDesktop }}>
      {isDesktop ? (
        <DropdownMenu
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          {children}
        </DropdownMenu>
      ) : (
        <Drawer
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          {children}
        </Drawer>
      )}
    </ResponsiveMenuContext.Provider>
  )
}

function ResponsiveMenuTrigger(
  props: React.ComponentProps<typeof DropdownMenuTrigger>
) {
  const { isDesktop } = useResponsiveMenuContext()
  return isDesktop ? (
    <DropdownMenuTrigger {...props} />
  ) : (
    <DrawerTrigger {...(props as React.ComponentProps<typeof DrawerTrigger>)} />
  )
}

type ResponsiveMenuContentProps = {
  children: React.ReactNode
  groupLabel?: string
  align?: React.ComponentProps<typeof DropdownMenuContent>["align"]
  side?: React.ComponentProps<typeof DropdownMenuContent>["side"]
  sideOffset?: number
  className?: string
}

function ResponsiveMenuContent({
  children,
  groupLabel,
  align = "end",
  side = "bottom",
  sideOffset = 6,
  className,
}: ResponsiveMenuContentProps) {
  const { isDesktop } = useResponsiveMenuContext()

  if (isDesktop) {
    return (
      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={className}
      >
        <DropdownMenuGroup>
          {groupLabel && (
            <DropdownMenuGroupLabel>{groupLabel}</DropdownMenuGroupLabel>
          )}
          {children}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    )
  }

  return (
    <DrawerPopup showBar>
      <DrawerPanel>
        <DrawerMenu>
          <DrawerMenuGroup>
            {groupLabel && (
              <DrawerMenuGroupLabel>{groupLabel}</DrawerMenuGroupLabel>
            )}
            {children}
          </DrawerMenuGroup>
        </DrawerMenu>
      </DrawerPanel>
    </DrawerPopup>
  )
}

type ResponsiveMenuItemProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "destructive"
  disabled?: boolean
}

function ResponsiveMenuItem({
  children,
  onClick,
  variant = "default",
  disabled,
}: ResponsiveMenuItemProps) {
  const { isDesktop } = useResponsiveMenuContext()

  if (isDesktop) {
    return (
      <DropdownMenuItem variant={variant} disabled={disabled} onClick={onClick}>
        {children}
      </DropdownMenuItem>
    )
  }

  return (
    <DrawerClose
      render={<DrawerMenuItem variant={variant} disabled={disabled} />}
      onClick={onClick}
    >
      {children}
    </DrawerClose>
  )
}

function ResponsiveMenuSeparator() {
  const { isDesktop } = useResponsiveMenuContext()
  return isDesktop ? <DropdownMenuSeparator /> : <DrawerMenuSeparator />
}

export {
  ResponsiveMenu,
  ResponsiveMenuContent,
  ResponsiveMenuItem,
  ResponsiveMenuSeparator,
  ResponsiveMenuTrigger,
}
