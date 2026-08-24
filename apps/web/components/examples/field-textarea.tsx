import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Textarea } from "@workspace/ui/components/textarea"

export function FieldTextareaExample() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="field-textarea-bio">Bio</FieldLabel>
      <FieldControl
        render={
          <Textarea
            id="field-textarea-bio"
            placeholder="Tell us about yourself..."
            maxLength={500}
          />
        }
      />
      <FieldDescription>
        Write a short bio. Maximum 500 characters.
      </FieldDescription>
    </Field>
  )
}
