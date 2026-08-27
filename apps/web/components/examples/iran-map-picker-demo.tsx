"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { IranMapPicker } from "@workspace/ui/components/iran-map-picker"
import { IRAN_PROVINCE_SHAPES } from "@workspace/ui/lib/iran-map-data"

export function IranMapPickerDemoExample() {
  const [value, setValue] = React.useState<string | null>("IR-23")
  const province = IRAN_PROVINCE_SHAPES.find((item) => item.id === value)

  return (
    <div className="flex w-full max-w-sm flex-col gap-4" dir="rtl">
      <IranMapPicker value={value} onValueChange={setValue} />
      <div className="flex min-h-10 items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {province ? province.fa : "استانی انتخاب نشده"}
          </span>
          {province && (
            <span className="text-xs text-muted-foreground" dir="ltr">
              {province.en} · {province.id}
            </span>
          )}
        </div>
        {province && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 shrink-0 px-3"
            onClick={() => setValue(null)}
          >
            پاک کردن
          </Button>
        )}
      </div>
    </div>
  )
}
