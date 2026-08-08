import { BadgeCheckIcon } from "lucide-react"

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"

export function DialogNoFooterExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">View receipt</Button>} />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Payment successful</DialogTitle>
          <DialogDescription>
            Your subscription is active. A receipt was sent to your email.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="flex items-center gap-3">
          <BadgeCheckIcon className="size-8 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Nothing left to do here — close this with the button in the corner,
            Escape, or by clicking outside.
          </p>
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  )
}
