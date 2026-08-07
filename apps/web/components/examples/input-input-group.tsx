import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

export function InputInputGroupExample() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Search components" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
