import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Switch } from "@workspace/ui/components/switch"

export function FieldHorizontalExample() {
  return (
    <Field orientation="horizontal" className="w-full max-w-xs">
      <FieldLabel htmlFor="field-horizontal-marketing">
        Marketing emails
      </FieldLabel>
      <Switch id="field-horizontal-marketing" />
    </Field>
  )
}
