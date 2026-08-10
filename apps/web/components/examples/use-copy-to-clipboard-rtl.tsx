"use client"

import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { useCopyToClipboard } from "@workspace/ui/hooks/use-copy-to-clipboard"

export function UseCopyToClipboardRtlExample() {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <Button variant="outline" onClick={() => copyToClipboard("۰۹۱۲۳۴۵۶۷۸۹")}>
      {isCopied ? (
        <CheckIcon aria-hidden="true" />
      ) : (
        <CopyIcon aria-hidden="true" />
      )}
      {isCopied ? "کپی شد" : "کپی شماره"}
    </Button>
  )
}
