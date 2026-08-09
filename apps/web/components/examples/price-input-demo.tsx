"use client"

import * as React from "react"

import { PriceInput } from "@workspace/ui/components/price-input"

export function PriceInputDemoExample() {
  const [value, setValue] = React.useState<number | null>(125000)

  return (
    <PriceInput
      value={value}
      onValueChange={setValue}
      className="w-full max-w-48"
    />
  )
}
