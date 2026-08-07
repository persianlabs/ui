import { ItalicIcon } from "lucide-react"

import { Toggle } from "@workspace/ui/components/toggle"

export function ToggleOutlineExample() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <ItalicIcon />
    </Toggle>
  )
}
