import { BadgeCheckIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  ResponsiveDialog,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogPanel,
  ResponsiveDialogPopup,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@workspace/ui/components/responsive-dialog"

export function ResponsiveDialogNoFooterExample() {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger
        render={<Button variant="outline">View receipt</Button>}
      />
      <ResponsiveDialogPopup>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Payment successful</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Your subscription is active. A receipt was sent to your email.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogPanel className="flex items-center gap-3">
          <BadgeCheckIcon className="size-8 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Nothing left to do here — dismiss with Escape, a tap outside, or (on
            mobile) a swipe down.
          </p>
        </ResponsiveDialogPanel>
      </ResponsiveDialogPopup>
    </ResponsiveDialog>
  )
}
