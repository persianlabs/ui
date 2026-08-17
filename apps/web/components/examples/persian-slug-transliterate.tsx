"use client"

import * as React from "react"

import { Input } from "@workspace/ui/components/input"
import { toPersianSlug } from "@workspace/ui/lib/persian-slug"

export function PersianSlugTransliterateExample() {
  const [title, setTitle] = React.useState("سلام دنیا")

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input
        dir="rtl"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="عنوان مقاله را وارد کنید..."
      />
      <div
        dir="ltr"
        className="rounded-lg border border-border px-3 py-2 font-mono text-sm break-all"
      >
        {toPersianSlug(title, { transliterate: true }) || " "}
      </div>
    </div>
  )
}
