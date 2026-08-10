import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Textarea } from "@workspace/ui/components/textarea"

export function TextareaRtlExample() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="textarea-rtl">بیوگرافی</FieldLabel>
      <Textarea id="textarea-rtl" placeholder="کمی درباره خودتان بنویسید" />
      <FieldDescription>
        این متن در نمایه شما نشان داده می‌شود.
      </FieldDescription>
    </Field>
  )
}
