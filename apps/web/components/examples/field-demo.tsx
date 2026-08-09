import { Input } from "@workspace/ui/components/input"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"

export function FieldDemoExample() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="field-demo-email">Email</FieldLabel>
      <Input id="field-demo-email" type="email" placeholder="you@example.com" />
      <FieldDescription>We&apos;ll never share your email.</FieldDescription>
    </Field>
  )
}
