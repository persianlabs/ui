"use client"

import { Button } from "@workspace/ui/components/button"
import {
  ResponsiveMenu,
  ResponsiveMenuContent,
  ResponsiveMenuItem,
  ResponsiveMenuSeparator,
  ResponsiveMenuTrigger,
} from "@workspace/ui/components/responsive-menu"

export function ResponsiveMenuRtlExample() {
  return (
    <ResponsiveMenu>
      <ResponsiveMenuTrigger
        render={<Button variant="outline">باز کردن منو</Button>}
      />
      <ResponsiveMenuContent groupLabel="حساب من">
        <ResponsiveMenuItem onClick={() => {}}>پروفایل</ResponsiveMenuItem>
        <ResponsiveMenuItem onClick={() => {}}>صورتحساب</ResponsiveMenuItem>
        <ResponsiveMenuSeparator />
        <ResponsiveMenuItem variant="destructive" onClick={() => {}}>
          خروج از حساب
        </ResponsiveMenuItem>
      </ResponsiveMenuContent>
    </ResponsiveMenu>
  )
}
