"use client"

import * as React from "react"

import { Input } from "@workspace/ui/components/input"
import { normalizePersianText } from "@workspace/ui/lib/normalize-persian-text"

/**
 * Search-key pipeline: every lossy option turned on, producing a stable key
 * from messy Arabic-codepage, vocalized, half-space-broken input.
 */
export function NormalizePersianTextSearchExample() {
  const [raw, setRaw] = React.useState("كتاب‌‌هاي  خـواندني؟")

  const searchKey = normalizePersianText(raw, {
    digits: true,
    diacritics: true,
  })

  return (
    <div className="flex w-full max-w-sm flex-col gap-3" dir="rtl">
      <Input
        dir="rtl"
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        placeholder="عبارت جست‌وجو…"
        className="font-mono text-sm"
      />
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>search key</span>
        <span aria-hidden="true">→</span>
        <code
          dir="ltr"
          className="flex-1 rounded-md border border-border px-2 py-1 text-left font-mono text-[13px]"
        >
          {searchKey || "—"}
        </code>
      </div>
    </div>
  )
}
