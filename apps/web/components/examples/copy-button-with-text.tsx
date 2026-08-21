"use client"

import { CopyButton } from "@workspace/ui/components/copy-button"

export function CopyButtonWithTextExample() {
  return (
    <CopyButton
      text="npx shadcn@latest add @persianlabsui/copy-button"
      label="Copy install command"
      variant="outline"
      size="default"
      className="w-fit"
    >
      Copy command
    </CopyButton>
  )
}
