import { CheckIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

export function InputGroupInlineEndExample() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput defaultValue="jane_doe" />
      <InputGroupAddon align="inline-end">
        <CheckIcon className="text-primary" />
      </InputGroupAddon>
    </InputGroup>
  )
}
