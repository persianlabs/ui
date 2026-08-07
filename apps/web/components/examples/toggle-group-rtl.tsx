import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

export function ToggleGroupRtlExample() {
  return (
    <ToggleGroup>
      <ToggleGroupItem value="bold" aria-label="ضخیم">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="مورب">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="زیرخط‌دار">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
