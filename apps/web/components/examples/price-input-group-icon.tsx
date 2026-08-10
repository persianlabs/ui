"use client"

import * as React from "react"

import {
  InputGroup,
  InputGroupAddon,
} from "@workspace/ui/components/input-group"
import { PriceInput } from "@workspace/ui/components/price-input"
import { TomanIcon } from "@workspace/ui/components/toman-icon"

export function PriceInputGroupIconExample() {
  const [value, setValue] = React.useState<number | null>(1250000)

  return (
    <InputGroup className="w-full max-w-xs">
      <InputGroupAddon>
        <TomanIcon />
      </InputGroupAddon>
      <PriceInput
        data-slot="input-group-control"
        value={value}
        onValueChange={setValue}
        className="flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent"
      />
    </InputGroup>
  )
}
