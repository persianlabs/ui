import { Field, FieldDescription, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function InputRtlExample() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-rtl">ایمیل</FieldLabel>
      <Input id="input-rtl" type="email" placeholder="you@example.com" />
      <FieldDescription>ایمیل شما با کسی به اشتراک گذاشته نمی‌شود.</FieldDescription>
    </Field>
  )
}
