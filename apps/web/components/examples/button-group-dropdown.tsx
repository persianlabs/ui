import { ChevronDownIcon, SendIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

export function ButtonGroupDropdownExample() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <SendIcon data-icon="inline-start" />
        Send
      </Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" aria-label="More options">
              <ChevronDownIcon />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Send now</DropdownMenuItem>
          <DropdownMenuItem>Schedule send</DropdownMenuItem>
          <DropdownMenuItem>Save as draft</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
