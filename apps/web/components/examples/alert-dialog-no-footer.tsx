import { BadgeCheckIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"

export function AlertDialogNoFooterExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">View receipt</Button>}
      />
      <AlertDialogContent className="pb-4">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <BadgeCheckIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Payment successful</AlertDialogTitle>
          <AlertDialogDescription>
            Your subscription is active. A receipt was sent to your email.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel className="w-full">Got it</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  )
}
