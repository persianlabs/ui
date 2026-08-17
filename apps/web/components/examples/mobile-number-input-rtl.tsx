"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { MobileNumberInput } from "@workspace/ui/components/mobile-number-input"

export function MobileNumberInputRtlExample() {
  const [phone, setPhone] = React.useState("")

  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field>
        <FieldLabel htmlFor="mobile-number-input-rtl-phone">
          شماره موبایل
        </FieldLabel>
        <MobileNumberInput
          id="mobile-number-input-rtl-phone"
          value={phone}
          onValueChange={setPhone}
        />
        <FieldDescription>
          می‌توانید شماره را با ۰۹، +۹۸ یا ۹۸ و با اعداد فارسی وارد یا جای‌گذاری
          کنید؛ به‌صورت خودکار به قالب ۰۹xxxxxxxxx یکدست می‌شود.
        </FieldDescription>
      </Field>
    </div>
  )
}
