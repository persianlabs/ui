"use client"

import * as React from "react"

import {
  CitySelector,
  type CitySelectorValue,
} from "@workspace/ui/components/city-selector"

export function CitySelectorControlledFaExample() {
  const [value, setValue] = React.useState<CitySelectorValue>({
    province: null,
    city: null,
  })

  return (
    <div className="flex flex-col gap-3">
      <CitySelector locale="fa" value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">
        {value.city
          ? `${value.province?.name} — ${value.city.name}`
          : "شهری انتخاب نشده است."}
      </p>
    </div>
  )
}
