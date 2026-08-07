import { Button } from "@workspace/ui/components/button"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputInlineExample() {
  return (
    <Field orientation="horizontal" className="max-w-xs">
      <FieldLabel htmlFor="input-inline" className="sr-only">
        Search
      </FieldLabel>
      <Input id="input-inline" placeholder="Search components" />
      <Button variant="outline">Search</Button>
    </Field>
  )
}
