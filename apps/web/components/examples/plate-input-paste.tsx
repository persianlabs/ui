"use client"

import { CopyButton } from "@workspace/ui/components/copy-button"
import { PlateInput } from "@workspace/ui/components/plate-input"

const SAMPLES = [
  { text: "57-ا-555-11", label: "۵۷-الف-۵۵۵-۱۱" },
  { text: "77 ب 444 ایران 22", label: "۷۷ ب ۴۴۴ ایران ۲۲" },
  { text: "36ث91843", label: "۳۶ ث ۹۱۸ ۴۳" },
]

export function PlateInputPasteExample() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {SAMPLES.map((sample) => (
          <CopyButton
            key={sample.text}
            text={sample.text}
            label={`کپی ${sample.label}`}
            variant="outline"
            size="sm"
            className="font-mono"
          >
            <span dir="ltr">{sample.text}</span>
          </CopyButton>
        ))}
      </div>

      <PlateInput />
    </div>
  )
}
