"use client"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogDescription,
  ResponsiveDialogDesktopOnly,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogPanel,
  ResponsiveDialogPopup,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@workspace/ui/components/responsive-dialog"

export function ResponsiveDialogRtlExample() {
  return (
    <ResponsiveDialog drawerPosition="bottom">
      <ResponsiveDialogTrigger
        render={<Button variant="outline">ویرایش پروفایل</Button>}
      />
      <ResponsiveDialogPopup>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>ویرایش پروفایل</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            در دسکتاپ یک Dialog و در موبایل یک کشوی پایینی نمایش داده می‌شود.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogPanel className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="responsive-dialog-rtl-name">نام</Label>
            <Input id="responsive-dialog-rtl-name" defaultValue="صادق علوی" />
          </div>
        </ResponsiveDialogPanel>
        <ResponsiveDialogFooter>
          <Button type="submit">ذخیره تغییرات</Button>
          <ResponsiveDialogDesktopOnly>
            <ResponsiveDialogClose
              render={<Button variant="outline">انصراف</Button>}
            />
          </ResponsiveDialogDesktopOnly>
        </ResponsiveDialogFooter>
      </ResponsiveDialogPopup>
    </ResponsiveDialog>
  )
}
