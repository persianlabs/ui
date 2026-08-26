"use client"

import * as React from "react"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  normalizePersianText,
  type NormalizePersianTextOptions,
} from "@workspace/ui/lib/normalize-persian-text"

const SAMPLE = "كتاب‌‌هاي  خـواندني  را ديدم؟"

const TOGGLES = [
  { key: "digits", label: "تبدیل ارقام" },
  { key: "diacritics", label: "حذف اعراب و کشیده" },
  { key: "zwnj", label: "اصلاح نیم‌فاصله" },
  { key: "spaces", label: "مرتب‌سازی فاصله‌ها" },
] as const

type ToggleKey = (typeof TOGGLES)[number]["key"]

export function NormalizePersianTextDemoExample() {
  const [raw, setRaw] = React.useState(SAMPLE)
  const [options, setOptions] = React.useState<NormalizePersianTextOptions>({})

  return (
    <div className="flex w-full max-w-sm flex-col gap-4" dir="rtl">
      <Input
        dir="rtl"
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        placeholder="متن آزمایشی…"
        className="font-mono text-sm"
      />
      <div className="flex flex-col gap-2.5">
        {TOGGLES.map((item) => (
          <Label
            key={item.key}
            className="flex cursor-pointer items-center gap-2.5 text-sm font-normal"
          >
            <Checkbox
              checked={Boolean(options[item.key as ToggleKey])}
              onCheckedChange={(checked) =>
                setOptions((current) => ({
                  ...current,
                  [item.key]: checked === true,
                }))
              }
            />
            {item.label}
          </Label>
        ))}
      </div>
      <div
        dir="rtl"
        className="min-h-16 rounded-lg border border-border px-3 py-2 font-mono text-sm leading-6 break-words"
      >
        {normalizePersianText(raw, options) || (
          <span className="text-muted-foreground">متنی وارد کنید…</span>
        )}
      </div>
    </div>
  )
}
