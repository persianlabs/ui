"use client"

import { toPersianSlug } from "@workspace/ui/lib/persian-slug"

export function PersianSlugRtlExample() {
  const title = "بهترین رستوران های تهران در سال ۱۴۰۴"
  const slug = toPersianSlug(title)

  return (
    <div dir="rtl" className="flex w-full max-w-sm flex-col gap-3 text-end">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div
        dir="ltr"
        className="rounded-lg border border-border px-3 py-2 text-end font-mono text-sm break-all"
      >
        {slug}
      </div>
    </div>
  )
}
