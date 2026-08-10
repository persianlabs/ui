"use client"

import { useState } from "react"

import type { WheelPickerOption } from "@workspace/ui/components/wheel-picker"
import {
  WheelPicker,
  WheelPickerWrapper,
} from "@workspace/ui/components/wheel-picker"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { toastManager } from "@workspace/ui/components/toast"

const days: WheelPickerOption[] = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
]

export function WheelPickerDialogExample() {
  const [open, setOpen] = useState(false)
  const [day, setDay] = useState("wednesday")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline">Schedule event</Button>}
      />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Choose a day</DialogTitle>
          <DialogDescription>
            The wheel remains fully keyboard and pointer accessible in a Dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="px-4 py-2">
          <WheelPickerWrapper className="w-full">
            <WheelPicker options={days} value={day} onValueChange={setDay} />
          </WheelPickerWrapper>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              toastManager.add({
                type: "success",
                title: "Event scheduled",
                description: `Scheduled for ${days.find((item) => item.value === day)?.label}`,
                data: { variant: "x" },
              })
              setOpen(false)
            }}
          >
            Save event
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
