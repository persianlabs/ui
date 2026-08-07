import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputGridExample() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <Field>
        <FieldLabel htmlFor="input-grid-first">First name</FieldLabel>
        <Input id="input-grid-first" placeholder="Jane" />
      </Field>
      <Field>
        <FieldLabel htmlFor="input-grid-last">Last name</FieldLabel>
        <Input id="input-grid-last" placeholder="Doe" />
      </Field>
    </div>
  )
}
