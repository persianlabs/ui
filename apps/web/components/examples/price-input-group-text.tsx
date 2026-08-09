"use client"

import * as React from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@workspace/ui/components/input-group"
import { PriceInput } from "@workspace/ui/components/price-input"

export function PriceInputGroupTextExample() {
  const [value, setValue] = React.useState<number | null>(450000)

  return (
    <InputGroup className="w-full max-w-xs">
      <PriceInput
        data-slot="input-group-control"
        value={value}
        onValueChange={setValue}
        className="flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>تومان</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
