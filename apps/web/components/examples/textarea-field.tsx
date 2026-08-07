import { Field, FieldDescription, FieldLabel } from "@workspace/ui/components/field"
import { Textarea } from "@workspace/ui/components/textarea"

export function TextareaFieldExample() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="textarea-field-bio">Bio</FieldLabel>
      <Textarea id="textarea-field-bio" placeholder="Tell us about yourself" />
      <FieldDescription>This will be shown on your profile.</FieldDescription>
    </Field>
  )
}
