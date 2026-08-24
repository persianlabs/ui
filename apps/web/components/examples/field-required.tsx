import { Field, FieldError, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function FieldRequiredExample() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="field-required-email">
        Email <span className="text-destructive">*</span>
      </FieldLabel>
      <Input
        id="field-required-email"
        type="email"
        placeholder="you@example.com"
        required
      />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
