import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputInvalidExample() {
  return (
    <Field data-invalid className="max-w-xs">
      <FieldLabel htmlFor="input-invalid">Email</FieldLabel>
      <Input id="input-invalid" aria-invalid defaultValue="not-an-email" />
      <FieldDescription>Enter a valid email address.</FieldDescription>
    </Field>
  )
}
