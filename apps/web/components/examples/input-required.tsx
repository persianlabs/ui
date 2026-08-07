import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputRequiredExample() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-required">
        Email <span aria-hidden="true">*</span>
      </FieldLabel>
      <Input id="input-required" type="email" required />
    </Field>
  )
}
