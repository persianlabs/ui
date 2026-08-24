import { ArrowRightIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

export function FieldInputGroupExample() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="field-input-group-email">Subscribe</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="field-input-group-email"
          placeholder="Your best email"
          type="email"
        />
        <InputGroupAddon align="inline-end">
          <Button aria-label="Subscribe" size="icon-xs" variant="ghost">
            <ArrowRightIcon aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
