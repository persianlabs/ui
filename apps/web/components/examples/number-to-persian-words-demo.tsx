"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { PriceInput } from "@workspace/ui/components/price-input"
import { numberToPersianWords } from "@workspace/ui/lib/number-to-persian-words"
import { cn } from "@workspace/ui/lib/utils"

const SUFFIXES = ["", "تومان", "ریال"] as const
const MODES = [
  { value: "words", label: "حروف کامل" },
  { value: "mixed", label: "خلاصه رقومی" },
] as const

export function NumberToPersianWordsDemoExample() {
  const [value, setValue] = React.useState<number | null>(12500000)
  const [suffix, setSuffix] = React.useState<string>("")
  const [mode, setMode] = React.useState<"words" | "mixed">("words")
  const [rialToToman, setRialToToman] = React.useState(false)

  const words = numberToPersianWords(value ?? "", {
    suffix,
    mode,
    rialToToman,
  })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3" dir="rtl">
      <PriceInput
        value={value}
        onValueChange={setValue}
        className="w-full text-center"
      />
      <div className="flex items-center gap-2">
        {SUFFIXES.map((item) => (
          <Button
            key={item || "none"}
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "h-7 px-3",
              !rialToToman && item && suffix === item && "bg-secondary",
              rialToToman && "pointer-events-none opacity-50"
            )}
            onClick={() => setSuffix(item)}
          >
            {item || "بدون واحد"}
          </Button>
        ))}
        <span className="ms-auto text-xs text-muted-foreground">واحد</span>
      </div>
      <div className="flex items-center gap-2">
        {MODES.map((item) => (
          <Button
            key={item.value}
            type="button"
            variant="outline"
            size="sm"
            className={cn("h-7 px-3", mode === item.value && "bg-secondary")}
            onClick={() => setMode(item.value)}
          >
            {item.label}
          </Button>
        ))}
        <span className="ms-auto text-xs text-muted-foreground">سبک</span>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={cn("h-7 w-fit px-3", rialToToman && "bg-secondary")}
        onClick={() => setRialToToman((current) => !current)}
      >
        ورودی ریالی، نمایش به تومان
      </Button>
      <p className="min-h-6 text-sm leading-6 font-medium">
        {words || (
          <span className="text-muted-foreground">یک عدد وارد کنید…</span>
        )}
      </p>
    </div>
  )
}
