import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function FieldDisabledExample() {
  return (
    <Field disabled className="w-full max-w-xs">
      <FieldLabel htmlFor="field-disabled-email">Email</FieldLabel>
      <Input
        id="field-disabled-email"
        type="email"
        placeholder="you@example.com"
        disabled
      />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  )
}
