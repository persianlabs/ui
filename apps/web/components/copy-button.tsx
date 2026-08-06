"use client"

import { Check, Copy } from "lucide"
import { MorphIcon } from "morphicons/react"
import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

export function CopyButton({
  text,
  className,
  label = "Copy to clipboard",
}: {
  text: string
  className?: string
  label?: string
}) {
  const [copied, setCopied] = React.useState(false)

  async function onCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onCopy}
      className={cn(
        "text-muted-foreground hover:text-foreground shrink-0 transition-colors",
        className
      )}
    >
      <MorphIcon icon={copied ? Check : Copy} spring="snappy" className="size-4" />
    </button>
  )
}
