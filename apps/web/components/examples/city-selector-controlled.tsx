"use client"

import * as React from "react"

import {
  CitySelector,
  type CitySelectorValue,
} from "@workspace/ui/components/city-selector"

export function CitySelectorControlledExample() {
  const [value, setValue] = React.useState<CitySelectorValue>({
    province: null,
    city: null,
  })

  return (
    <div className="flex flex-col gap-3">
      <CitySelector locale="en" value={value} onValueChange={setValue} />
      <p className="text-muted-foreground text-sm">
        {value.city
          ? `${value.province?.nameEn} — ${value.city.nameEn}`
          : "No city selected."}
      </p>
    </div>
  )
}
