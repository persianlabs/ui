"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { useCopyToClipboard } from "@workspace/ui/hooks/use-copy-to-clipboard"

export function UseCopyToClipboardCallbackExample() {
  const [log, setLog] = React.useState<string | null>(null)
  const { copyToClipboard, isCopied } = useCopyToClipboard({
    onCopy: () => setLog("Copied to clipboard"),
  })

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="outline"
        onClick={() => copyToClipboard("https://persian-labs.ir")}
      >
        {isCopied ? (
          <CheckIcon aria-hidden="true" />
        ) : (
          <CopyIcon aria-hidden="true" />
        )}
        {isCopied ? "Copied" : "Copy link"}
      </Button>
      {log && <span className="text-xs text-muted-foreground">{log}</span>}
    </div>
  )
}
