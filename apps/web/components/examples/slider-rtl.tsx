"use client"

import * as React from "react"

import { Slider } from "@workspace/ui/components/slider"

export function SliderRtlExample() {
  const [value, setValue] = React.useState<number[]>([500000, 2000000])

  return (
    <div className="flex w-72 flex-col gap-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">محدوده قیمت</span>
        <span className="font-medium tabular-nums">
          {value[0]?.toLocaleString("fa-IR")} تا{" "}
          {value[1]?.toLocaleString("fa-IR")} تومان
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={(next) => setValue(next as number[])}
        min={0}
        max={5000000}
        step={50000}
      />
    </div>
  )
}
