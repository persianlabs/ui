import { Badge } from "@workspace/ui/components/badge"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputBadgeExample() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-badge">
        Username
        <Badge variant="secondary">Recommended</Badge>
      </FieldLabel>
      <Input id="input-badge" placeholder="jane_doe" />
    </Field>
  )
}
