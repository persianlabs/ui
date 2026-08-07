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

export function DialogRtlExample() {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline">ویرایش پروفایل</Button>}
      />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>ویرایش پروفایل</DialogTitle>
          <DialogDescription>
            تغییرات را اعمال کنید و روی ذخیره کلیک کنید.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="dialog-rtl-name">نام</Label>
            <Input id="dialog-rtl-name" defaultValue="صادق علوی" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dialog-rtl-username">نام کاربری</Label>
            <Input id="dialog-rtl-username" defaultValue="@sadegh" />
          </div>
        </DialogPanel>
        <DialogFooter>
          <Button type="submit">ذخیره تغییرات</Button>
          <DialogClose render={<Button variant="outline">انصراف</Button>} />
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
