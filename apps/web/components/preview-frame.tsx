"use client"

import * as React from "react"

export function PreviewFrame({
  category,
  slug,
  example,
}: {
  category: "components" | "utilities"
  slug: string
  example: string
}) {
  const source = `/docs/${category}/${slug}?preview=${encodeURIComponent(example)}&embed=1`

  return (
    <iframe
      title={`${slug} preview`}
      src={source}
      className="fixed inset-0 h-svh w-full border-0 bg-background"
    />
  )
}
