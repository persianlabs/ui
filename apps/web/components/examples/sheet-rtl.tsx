import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"

export function SheetRtlExample() {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="outline">ویرایش پروفایل</Button>}
      />
      <SheetContent side="start">
        <SheetHeader>
          <SheetTitle>ویرایش پروفایل</SheetTitle>
          <SheetDescription>
            تغییرات را اعمال کنید و روی ذخیره کلیک کنید.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sheet-rtl-name">نام</Label>
            <Input id="sheet-rtl-name" defaultValue="صادق علوی" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sheet-rtl-username">نام کاربری</Label>
            <Input id="sheet-rtl-username" defaultValue="@sadegh" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">ذخیره تغییرات</Button>
          <SheetClose render={<Button variant="outline">انصراف</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
