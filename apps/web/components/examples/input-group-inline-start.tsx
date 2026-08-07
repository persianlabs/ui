import { MailIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

export function InputGroupInlineStartExample() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput type="email" placeholder="you@example.com" />
      <InputGroupAddon align="inline-start">
        <MailIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
