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

export function ResponsiveDialogDemoExample() {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger
        render={<Button variant="outline">Edit profile</Button>}
      />
      <ResponsiveDialogPopup>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            A Dialog on desktop, a bottom Drawer on mobile — resize the window
            to see it switch.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogPanel className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="responsive-dialog-demo-name">Name</Label>
            <Input
              id="responsive-dialog-demo-name"
              defaultValue="Sadegh Alavi"
            />
          </div>
        </ResponsiveDialogPanel>
        <ResponsiveDialogFooter>
          <Button type="submit">Save changes</Button>
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
