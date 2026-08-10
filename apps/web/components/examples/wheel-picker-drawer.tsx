"use client"

import { useState } from "react"

import type { WheelPickerOption } from "@workspace/ui/components/wheel-picker"
import {
  WheelPicker,
  WheelPickerWrapper,
} from "@workspace/ui/components/wheel-picker"
import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { toastManager } from "@workspace/ui/components/toast"

const duration: WheelPickerOption<number>[] = [15, 30, 45, 60, 90].map(
  (value) => ({
    label: `${value} minutes`,
    value,
  })
)

export function WheelPickerDrawerExample() {
  const [open, setOpen] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(30)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button variant="outline">Set duration</Button>} />
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Session duration</DrawerTitle>
          <DrawerDescription>
            Drag the wheel without triggering the Drawer&apos;s swipe-to-dismiss
            gesture.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          <WheelPickerWrapper className="w-full">
            <WheelPicker
              options={duration}
              value={selectedDuration}
              onValueChange={setSelectedDuration}
              infinite
            />
          </WheelPickerWrapper>
        </DrawerPanel>
        <DrawerFooter>
          <Button
            onClick={() => {
              toastManager.add({
                type: "success",
                title: "Duration set",
                description: `${selectedDuration} minute session`,
                data: { variant: "x" },
              })
              setOpen(false)
            }}
          >
            Set duration
          </Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
