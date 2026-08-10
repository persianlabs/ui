import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Textarea } from "@workspace/ui/components/textarea"

export function TextareaDisabledExample() {
  return (
    <Field data-disabled className="max-w-xs">
      <FieldLabel htmlFor="textarea-disabled">Bio</FieldLabel>
      <Textarea
        id="textarea-disabled"
        placeholder="Tell us about yourself"
        disabled
      />
    </Field>
  )
}
