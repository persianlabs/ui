import { SearchIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

export function ButtonGroupInputGroupExample() {
  return (
    <ButtonGroup>
      <InputGroup className="w-56">
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search components" />
      </InputGroup>
      <Button variant="outline">Search</Button>
    </ButtonGroup>
  )
}
