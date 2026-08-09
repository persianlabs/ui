"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { CopyButton } from "@workspace/ui/components/copy-button"
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
import {
  AnchoredToastProvider,
  ToastPrimitive,
} from "@workspace/ui/components/toast"

export function ToastAnchoredDrawerExample() {
  const manager = React.useMemo(() => ToastPrimitive.createToastManager(), [])

  return (
    <AnchoredToastProvider toastManager={manager}>
      <Drawer>
        <DrawerTrigger render={<Button variant="outline">Open drawer</Button>} />
        <DrawerPopup showBar>
          <DrawerHeader>
            <DrawerTitle>Notification settings</DrawerTitle>
            <DrawerDescription>
              Choose what you want to be notified about.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerPanel>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm">
              <span className="min-w-0 flex-1 truncate text-muted-foreground">
                webhook_2f8a1c9e4b7d
              </span>
              <CopyButton
                text="webhook_2f8a1c9e4b7d"
                variant="ghost"
                size="icon-sm"
              />
            </div>
          </DrawerPanel>
          <DrawerFooter>
            <SaveButton manager={manager} />
            <DrawerClose render={<Button variant="outline">Cancel</Button>} />
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
    </AnchoredToastProvider>
  )
}

function SaveButton({
  manager,
}: {
  manager: ReturnType<typeof ToastPrimitive.createToastManager>
}) {
  const ref = React.useRef<HTMLButtonElement>(null)

  return (
    <Button
      ref={ref}
      type="submit"
      onClick={() =>
        manager.add({
          type: "success",
          title: "Preferences saved",
          positionerProps: {
            anchor: ref.current,
            side: "top",
          },
        })
      }
    >
      Save
    </Button>
  )
}
