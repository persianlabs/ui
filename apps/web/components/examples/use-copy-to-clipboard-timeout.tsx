"use client"

import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { useCopyToClipboard } from "@workspace/ui/hooks/use-copy-to-clipboard"

export function UseCopyToClipboardTimeoutExample() {
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 5000 })

  return (
    <Button
      variant="outline"
      onClick={() => copyToClipboard("https://persian-labs.ir")}
    >
      {isCopied ? (
        <CheckIcon aria-hidden="true" />
      ) : (
        <CopyIcon aria-hidden="true" />
      )}
      {isCopied ? "Copied for 5s" : "Copy link"}
    </Button>
  )
}
