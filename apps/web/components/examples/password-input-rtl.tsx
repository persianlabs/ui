"use client"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { PasswordInput } from "@workspace/ui/components/password-input"

export function PasswordInputRtlExample() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="password-input-rtl">رمز عبور</FieldLabel>
        <PasswordInput
          id="password-input-rtl"
          autoComplete="current-password"
        />
        <FieldDescription>
          فیلد رمز عبور همیشه چپ‌به‌راست نمایش داده می‌شود، حتی در صفحات
          راست‌به‌چپ.
        </FieldDescription>
      </Field>
    </div>
  )
}
