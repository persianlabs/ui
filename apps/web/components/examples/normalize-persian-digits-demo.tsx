"use client"

import * as React from "react"

import { Input } from "@workspace/ui/components/input"
import { normalizePersianDigits } from "@workspace/ui/lib/normalize-persian-digits"

export function NormalizePersianDigitsDemoExample() {
  const [raw, setRaw] = React.useState("۱۲۳۴۵")

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input
        dir="ltr"
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        placeholder="۰۱۲۳..."
      />
      <div className="rounded-lg border border-border px-3 py-2 font-mono text-sm">
        {normalizePersianDigits(raw) || " "}
      </div>
    </div>
  )
}
