"use client"

import { Button } from "@workspace/ui/components/button"
import {
  ResponsiveMenu,
  ResponsiveMenuContent,
  ResponsiveMenuItem,
  ResponsiveMenuSeparator,
  ResponsiveMenuTrigger,
} from "@workspace/ui/components/responsive-menu"

export function ResponsiveMenuDemoExample() {
  return (
    <ResponsiveMenu>
      <ResponsiveMenuTrigger
        render={<Button variant="outline">Open menu</Button>}
      />
      <ResponsiveMenuContent groupLabel="My Account">
        <ResponsiveMenuItem onClick={() => {}}>Profile</ResponsiveMenuItem>
        <ResponsiveMenuItem onClick={() => {}}>Billing</ResponsiveMenuItem>
        <ResponsiveMenuSeparator />
        <ResponsiveMenuItem variant="destructive" onClick={() => {}}>
          Log out
        </ResponsiveMenuItem>
      </ResponsiveMenuContent>
    </ResponsiveMenu>
  )
}
