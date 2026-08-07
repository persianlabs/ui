import { ChevronDownIcon, SendIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group"

export function ButtonGroupSplitExample() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <SendIcon data-icon="inline-start" />
        Send
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon" aria-label="More options">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  )
}
