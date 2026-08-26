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

const UNITS = ["Toman", "Rial"] as const

export function NumberToPersianWordsLtrExample() {
  const [value, setValue] = React.useState<number | null>(12500000)
  const [unit, setUnit] = React.useState<string>("Toman")

  const words = numberToPersianWords(value ?? "", {
    suffix: unit === "Toman" ? "تومان" : "ریال",
    mode: "mixed",
  })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3" dir="ltr">
      <InputGroup dir="ltr">
        <InputGroupAddon align="inline-start">{unit}</InputGroupAddon>
        <PriceInput
          value={value}
          onValueChange={setValue}
          data-slot="input-group-control"
          dir="ltr"
          className="flex-1 rounded-none border-0 bg-transparent text-center shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
      </InputGroup>
      <div className="flex items-center gap-2" dir="ltr">
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
      <p dir="rtl" className="min-h-6 text-start text-sm leading-6 font-medium">
        {words}
      </p>
    </div>
  )
}
