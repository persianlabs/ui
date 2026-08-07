import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

export function DialogDemoExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="dialog-demo-name">Name</Label>
            <Input id="dialog-demo-name" defaultValue="Sadegh Alavi" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dialog-demo-username">Username</Label>
            <Input id="dialog-demo-username" defaultValue="@sadegh" />
          </div>
        </DialogPanel>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
