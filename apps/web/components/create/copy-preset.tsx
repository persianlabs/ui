"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { usePresetCode } from "@/components/create/hooks/use-preset-code"

async function copyToClipboardWithMeta(text: string) {
  await navigator.clipboard.writeText(text)
}

export function CopyPreset({ className }: React.ComponentProps<typeof Button>) {
  const presetCode = usePresetCode()
  const [hasCopied, setHasCopied] = React.useState(false)
  const label = hasCopied ? "Copied" : `--preset ${presetCode}`

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const handleCopy = React.useCallback(() => {
    copyToClipboardWithMeta(
      `npx persianlabsui init --preset ${presetCode}`
    ).catch(() => {})
    setHasCopied(true)
  }, [presetCode])

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      title={label}
      className={cn(
        "touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!",
        className
      )}
    >
      <span className="block min-w-0 truncate">{label}</span>
    </Button>
  )
}
