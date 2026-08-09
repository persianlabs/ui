import { Input } from "@workspace/ui/components/input"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field"

export function FieldErrorExample() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="field-error-email">Email</FieldLabel>
      <Input
        id="field-error-email"
        type="email"
        defaultValue="not-an-email"
        aria-invalid="true"
      />
      <FieldError match={true}>Enter a valid email address.</FieldError>
    </Field>
  )
}
