"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { NationalIdInput } from "@workspace/ui/components/national-id-input"

export function NationalIdInputRtlExample() {
  const [nationalId, setNationalId] = React.useState("")

  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field>
        <FieldLabel htmlFor="national-id-input-rtl-code">کد ملی</FieldLabel>
        <NationalIdInput
          id="national-id-input-rtl-code"
          value={nationalId}
          onValueChange={setNationalId}
        />
        <FieldDescription>
          می‌توانید کد ملی را با اعداد فارسی وارد یا جای‌گذاری کنید؛ اعداد
          به‌صورت خودکار به رقم‌های لاتین یکدست می‌شوند و درستی کد با رقم کنترل
          بررسی می‌شود.
        </FieldDescription>
      </Field>
    </div>
  )
}
