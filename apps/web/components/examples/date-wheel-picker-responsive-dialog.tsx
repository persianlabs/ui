"use client"

import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { DateWheelPicker } from "@workspace/ui/components/date-wheel-picker"
import { formatDate, fromParts } from "@workspace/ui/lib/persian-date"
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

const DEFAULT_VALUE = fromParts({ year: 1375, month: 6, day: 10 }, "shamsi")

export function DateWheelPickerResponsiveDialogExample() {
  const [open, setOpen] = useState(false)
  const [birthDate, setBirthDate] = useState<Date>(DEFAULT_VALUE)

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger
        render={<Button variant="outline">Select date of birth</Button>}
      />
      <ResponsiveDialogPopup>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Date of birth</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            This becomes a Drawer on mobile, while the wheel keeps its touch
            gesture.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogPanel className="flex items-center justify-center">
          <DateWheelPicker
            value={birthDate}
            onValueChange={setBirthDate}
            minYear={1330}
            maxYear={1407}
          />
        </ResponsiveDialogPanel>
        <ResponsiveDialogFooter>
          <Button
            onClick={() => {
              toastManager.add({
                type: "success",
                title: "Date of birth saved",
                description: formatDate(birthDate, "yyyy MMMM d"),
                data: { variant: "x" },
              })
              setOpen(false)
            }}
          >
            Save
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogPopup>
    </ResponsiveDialog>
  )
}
