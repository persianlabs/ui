import { Field, FieldDescription, FieldLabel } from "@workspace/ui/components/field"
import { Textarea } from "@workspace/ui/components/textarea"

export function TextareaInvalidExample() {
  return (
    <Field data-invalid className="max-w-xs">
      <FieldLabel htmlFor="textarea-invalid">Bio</FieldLabel>
      <Textarea id="textarea-invalid" aria-invalid defaultValue="x" />
      <FieldDescription>Bio must be at least 10 characters.</FieldDescription>
    </Field>
  )
}
