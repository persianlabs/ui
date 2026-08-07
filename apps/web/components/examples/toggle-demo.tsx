import { BoldIcon } from "lucide-react"

import { Toggle } from "@workspace/ui/components/toggle"

export function ToggleDemoExample() {
  return (
    <Toggle aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  )
}
