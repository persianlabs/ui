import { BadgeCheckIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"

export function DrawerNoFooterExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">View receipt</Button>} />
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Payment successful</DrawerTitle>
          <DrawerDescription>
            Your subscription is active. A receipt was sent to your email.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel className="flex items-center gap-3">
          <BadgeCheckIcon className="size-8 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Nothing left to do here — swipe down, drag the handle, or tap
            outside to dismiss.
          </p>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  )
}
