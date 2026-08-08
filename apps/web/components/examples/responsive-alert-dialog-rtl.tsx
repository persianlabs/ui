"use client"

import { Button } from "@workspace/ui/components/button"
import {
  ResponsiveAlertDialog,
  ResponsiveAlertDialogAction,
  ResponsiveAlertDialogCancel,
  ResponsiveAlertDialogContent,
  ResponsiveAlertDialogDescription,
  ResponsiveAlertDialogFooter,
  ResponsiveAlertDialogHeader,
  ResponsiveAlertDialogTitle,
  ResponsiveAlertDialogTrigger,
} from "@workspace/ui/components/responsive-alert-dialog"

export function ResponsiveAlertDialogRtlExample() {
  return (
    <ResponsiveAlertDialog>
      <ResponsiveAlertDialogTrigger
        render={<Button variant="outline">حذف حساب</Button>}
      />
      <ResponsiveAlertDialogContent>
        <ResponsiveAlertDialogHeader>
          <ResponsiveAlertDialogTitle>
            کاملاً مطمئن هستید؟
          </ResponsiveAlertDialogTitle>
          <ResponsiveAlertDialogDescription>
            این عمل قابل بازگشت نیست. حساب شما برای همیشه حذف و اطلاعات آن از
            سرورهای ما پاک خواهد شد.
          </ResponsiveAlertDialogDescription>
        </ResponsiveAlertDialogHeader>
        <ResponsiveAlertDialogFooter>
          <ResponsiveAlertDialogCancel>انصراف</ResponsiveAlertDialogCancel>
          <ResponsiveAlertDialogAction variant="destructive">
            ادامه
          </ResponsiveAlertDialogAction>
        </ResponsiveAlertDialogFooter>
      </ResponsiveAlertDialogContent>
    </ResponsiveAlertDialog>
  )
}
