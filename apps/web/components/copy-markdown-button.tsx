"use client"

import { Check, Clipboard } from "lucide"
import { MorphIcon } from "morphicons/react"
import * as React from "react"

export function CopyMarkdownButton({ markdown }: { markdown: string }) {
  const [copied, setCopied] = React.useState(false)

  async function onCopy() {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="border-border text-muted-foreground hover:text-foreground hover:bg-muted inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors"
    >
      <MorphIcon icon={copied ? Check : Clipboard} spring="snappy" className="size-3.5" />
      {copied ? "Copied" : "Copy page"}
    </button>
  )
}
