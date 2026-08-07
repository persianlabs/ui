import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputFileExample() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-file">Resume</FieldLabel>
      <Input id="input-file" type="file" />
    </Field>
  )
}
