import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputFieldGroupExample() {
  return (
    <FieldGroup className="max-w-xs">
      <Field>
        <FieldLabel htmlFor="input-fg-name">Name</FieldLabel>
        <Input id="input-fg-name" placeholder="Jane Doe" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-fg-email">Email</FieldLabel>
        <Input id="input-fg-email" type="email" placeholder="you@example.com" />
        <FieldDescription>We&apos;ll never share your email.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}
