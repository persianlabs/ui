"use client"

import { CopyButton } from "@workspace/ui/components/copy-button"

export function CopyButtonWithTextExample() {
  return (
    <CopyButton
      text="npx shadcn@latest add https://ui.persian-labs.ir/r/copy-button.json"
      label="Copy install command"
      variant="outline"
      size="default"
      className="w-fit"
    >
      Copy command
    </CopyButton>
  )
}
