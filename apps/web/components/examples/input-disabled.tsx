import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputDisabledExample() {
  return (
    <Field data-disabled className="max-w-xs">
      <FieldLabel htmlFor="input-disabled">Email</FieldLabel>
      <Input id="input-disabled" placeholder="you@example.com" disabled />
    </Field>
  )
}
