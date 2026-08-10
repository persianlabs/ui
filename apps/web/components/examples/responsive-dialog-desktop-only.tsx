"use client"

import { Button } from "@workspace/ui/components/button"
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogDesktopOnly,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogPopup,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@workspace/ui/components/responsive-dialog"

export function ResponsiveDialogDesktopOnlyExample() {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger
        render={<Button variant="outline">Discard changes</Button>}
      />
      <ResponsiveDialogPopup>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Discard changes?</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Your unsaved edits will be lost.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter>
          <Button variant="destructive">Discard</Button>
          <ResponsiveDialogDesktopOnly>
            <ResponsiveDialogClose
              render={<Button variant="outline">Cancel</Button>}
            />
          </ResponsiveDialogDesktopOnly>
        </ResponsiveDialogFooter>
      </ResponsiveDialogPopup>
    </ResponsiveDialog>
  )
}
