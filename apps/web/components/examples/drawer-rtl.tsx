import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"

export function DrawerRtlExample() {
  return (
    <Drawer position="start">
      <DrawerTrigger render={<Button variant="outline">باز کردن کشو</Button>} />
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>ویرایش پروفایل</DrawerTitle>
          <DrawerDescription>
            تغییرات را اعمال کنید و روی ذخیره کلیک کنید.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          <p className="text-sm text-muted-foreground">
            با کشیدن به سمت شروع صفحه یا کلیک بیرون، کشو بسته می‌شود.
          </p>
        </DrawerPanel>
        <DrawerFooter>
          <Button type="submit">ذخیره تغییرات</Button>
          <DrawerClose render={<Button variant="outline">انصراف</Button>} />
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
