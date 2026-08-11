"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  CardNumberInput,
  ShabaInput,
} from "@workspace/ui/components/bank-input"

export function BankInputRtlExample() {
  const [cardNumber, setCardNumber] = React.useState("")
  const [shaba, setShaba] = React.useState("")

  return (
    <div className="grid w-full max-w-md gap-5">
      <Field>
        <FieldLabel htmlFor="bank-input-rtl-card">شماره کارت</FieldLabel>
        <CardNumberInput
          id="bank-input-rtl-card"
          value={cardNumber}
          onValueChange={setCardNumber}
        />
        <FieldDescription>
          اعداد فارسی و جداکننده‌ها هنگام تایپ یا جای‌گذاری به‌صورت خودکار یکدست
          می‌شوند.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="bank-input-rtl-shaba">شماره شبا</FieldLabel>
        <ShabaInput
          id="bank-input-rtl-shaba"
          value={shaba}
          onValueChange={setShaba}
        />
      </Field>
    </div>
  )
}
