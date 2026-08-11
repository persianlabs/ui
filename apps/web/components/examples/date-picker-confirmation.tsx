"use client"

import { DatePicker } from "@workspace/ui/components/date-picker"

export function DatePickerConfirmationExample() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <DatePicker
        confirmMode="immediate"
        placeholder="ثبت فوری"
        className="w-44"
      />
      <DatePicker
        confirmMode="explicit"
        placeholder="نیازمند تایید"
        className="w-44"
      />
    </div>
  )
}
