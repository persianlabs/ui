import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Switch } from "@workspace/ui/components/switch"

export function FieldSwitchExample() {
  return (
    <Field>
      <FieldLabel>
        <Switch />
        Email notifications
      </FieldLabel>
    </Field>
  )
}
