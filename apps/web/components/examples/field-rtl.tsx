import { Input } from "@workspace/ui/components/input"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"

export function FieldRtlExample() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="field-rtl-email">ایمیل</FieldLabel>
      <Input id="field-rtl-email" type="email" placeholder="you@example.com" />
      <FieldDescription>ایمیل شما با کسی به اشتراک گذاشته نمی‌شود.</FieldDescription>
    </Field>
  )
}
