"use client"

import * as React from "react"

import {
  IranMapPicker,
  IRAN_PROVINCE_SHAPES,
} from "@workspace/ui/components/iran-map-picker"
import { Input } from "@workspace/ui/components/input"

export function IranMapPickerFormExample() {
  const [value, setValue] = React.useState<string | null>(null)
  const province = IRAN_PROVINCE_SHAPES.find((item) => item.id === value)

  return (
    <div className="flex w-full max-w-sm flex-col gap-4" dir="rtl">
      <IranMapPicker value={value} onValueChange={setValue} />
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        استان
        <Input
          readOnly
          value={province ? province.fa : ""}
          placeholder="از نقشه انتخاب کنید…"
        />
      </label>
    </div>
  )
}
