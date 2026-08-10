"use client"

import { useState } from "react"

import type { WheelPickerOption } from "@workspace/ui/components/wheel-picker"
import {
  WheelPicker,
  WheelPickerWrapper,
} from "@workspace/ui/components/wheel-picker"
import { Button } from "@workspace/ui/components/button"
import {
  ResponsiveDialog,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogPanel,
  ResponsiveDialogPopup,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@workspace/ui/components/responsive-dialog"
import { toastManager } from "@workspace/ui/components/toast"

const reminders: WheelPickerOption[] = [
  { label: "At event time", value: "event" },
  { label: "5 minutes before", value: "5" },
  { label: "15 minutes before", value: "15" },
  { label: "1 hour before", value: "60" },
]

export function WheelPickerResponsiveDialogExample() {
  const [open, setOpen] = useState(false)
  const [reminder, setReminder] = useState("15")

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger
        render={<Button variant="outline">Set reminder</Button>}
      />
      <ResponsiveDialogPopup>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Reminder</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            This becomes a Drawer on mobile, while the wheel keeps its touch
            gesture.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogPanel>
          <WheelPickerWrapper className="w-full">
            <WheelPicker
              options={reminders}
              value={reminder}
              onValueChange={setReminder}
            />
          </WheelPickerWrapper>
        </ResponsiveDialogPanel>
        <ResponsiveDialogFooter>
          <Button
            onClick={() => {
              toastManager.add({
                type: "success",
                title: "Reminder saved",
                description: reminders.find((item) => item.value === reminder)
                  ?.label,
                data: { variant: "x" },
              })
              setOpen(false)
            }}
          >
            Save reminder
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogPopup>
    </ResponsiveDialog>
  )
}
