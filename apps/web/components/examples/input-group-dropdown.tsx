import { ChevronDownIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

export function InputGroupDropdownExample() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Filter by status" />
      <InputGroupAddon align="inline-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <InputGroupButton aria-label="Filter">
                <ChevronDownIcon />
              </InputGroupButton>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Active</DropdownMenuItem>
            <DropdownMenuItem>Pending</DropdownMenuItem>
            <DropdownMenuItem>Closed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
    </InputGroup>
  )
}
