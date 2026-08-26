"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
} from "@workspace/ui/components/input-group"
import { PriceInput } from "@workspace/ui/components/price-input"
import { numberToPersianWords } from "@workspace/ui/lib/number-to-persian-words"
import { cn } from "@workspace/ui/lib/utils"

const UNITS = ["تومان", "ریال"] as const

export function NumberToPersianWordsUnitExample() {
  const [value, setValue] = React.useState<number | null>(12500000)
  const [unit, setUnit] = React.useState<string>("تومان")

  const words = numberToPersianWords(value ?? "", {
    suffix: unit,
    mode: "mixed",
  })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3" dir="rtl">
      <InputGroup>
        <PriceInput
          value={value}
          onValueChange={setValue}
          data-slot="input-group-control"
          className="flex-1 rounded-none border-0 bg-transparent text-center shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
        <InputGroupAddon align="inline-end">{unit}</InputGroupAddon>
      </InputGroup>
      <div className="flex items-center gap-2">
        {UNITS.map((item) => (
          <Button
            key={item}
            type="button"
            variant="outline"
            size="sm"
            className={cn("h-7 px-3", unit === item && "bg-secondary")}
            onClick={() => setUnit(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <p className="min-h-6 text-sm leading-6 font-medium">{words}</p>
    </div>
  )
}
