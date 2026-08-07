import { Button } from "@workspace/ui/components/button"
import { Field } from "@workspace/ui/components/field"
import { Textarea } from "@workspace/ui/components/textarea"

export function TextareaButtonExample() {
  return (
    <Field className="max-w-xs gap-3">
      <Textarea placeholder="Type your message here." />
      <Button className="self-end">Send message</Button>
    </Field>
  )
}
