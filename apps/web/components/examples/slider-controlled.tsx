"use client"

import * as React from "react"

import { Slider } from "@workspace/ui/components/slider"

export function SliderControlledExample() {
  const [value, setValue] = React.useState([33])

  return (
    <div className="flex w-64 flex-col gap-3">
      <Slider
        value={value}
        onValueChange={(next) => setValue(next as number[])}
        max={100}
        step={1}
      />
      <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
    </div>
  )
}
