"use client"

import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { DateWheelPicker } from "@workspace/ui/components/date-wheel-picker"
import { formatDate, fromParts } from "@workspace/ui/lib/persian-date"
import {
  ResponsiveMenu,
  ResponsiveMenuContent,
  ResponsiveMenuItem,
  ResponsiveMenuSeparator,
  ResponsiveMenuTrigger,
} from "@workspace/ui/components/responsive-menu"

const DEFAULT_VALUE = fromParts({ year: 1403, month: 1, day: 1 }, "shamsi")

export function DateWheelPickerResponsiveMenuExample() {
  const [open, setOpen] = useState(false)
  const [appliedDate, setAppliedDate] = useState<Date>()
  const [draft, setDraft] = useState<Date>(DEFAULT_VALUE)

  return (
    <ResponsiveMenu open={open} onOpenChange={setOpen}>
      <ResponsiveMenuTrigger
        render={
          <Button variant="outline">
            {appliedDate
              ? formatDate(appliedDate, "yyyy/MM/dd")
              : "Filter by date"}
          </Button>
        }
      />
      <ResponsiveMenuContent groupLabel="Orders since">
        <div className="flex flex-col items-center gap-3 p-2">
          <DateWheelPicker value={draft} onValueChange={setDraft} />
        </div>
        <ResponsiveMenuSeparator />
        <ResponsiveMenuItem onClick={() => setAppliedDate(draft)}>
          Apply
        </ResponsiveMenuItem>
      </ResponsiveMenuContent>
    </ResponsiveMenu>
  )
}
