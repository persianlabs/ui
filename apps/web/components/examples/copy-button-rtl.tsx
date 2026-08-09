"use client"

import { CopyButton } from "@workspace/ui/components/copy-button"

export function CopyButtonRtlExample() {
  return (
    <CopyButton
      text="۰۹۱۲۳۴۵۶۷۸۹"
      variant="outline"
      size="default"
      className="w-fit"
    >
      کپی شماره
    </CopyButton>
  )
}
