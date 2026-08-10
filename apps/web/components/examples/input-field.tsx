import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputFieldExample() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-field-email">Email</FieldLabel>
      <Input
        id="input-field-email"
        type="email"
        placeholder="you@example.com"
      />
      <FieldDescription>We&apos;ll never share your email.</FieldDescription>
    </Field>
  )
}
