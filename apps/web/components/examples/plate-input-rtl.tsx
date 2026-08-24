"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  PlateInput,
  type PlateValue,
} from "@workspace/ui/components/plate-input"

function isComplete(value: PlateValue) {
  return (
    value.twoDigit.length === 2 &&
    value.letter !== "" &&
    value.threeDigit.length === 3 &&
    value.serial.length === 2
  )
}

export function PlateInputRtlExample() {
  const [value, setValue] = React.useState<PlateValue | null>(null)
  const [submitted, setSubmitted] = React.useState(false)

  const invalid = submitted && (value === null || !isComplete(value))

  return (
    <form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      {/* `|| undefined` matters: data-invalid="false" would still match the
          label's destructive styling. */}
      <Field data-invalid={invalid || undefined}>
        <FieldLabel htmlFor="plate-input-rtl">پلاک خودرو</FieldLabel>
        <PlateInput
          id="plate-input-rtl"
          invalid={invalid}
          onValueChange={(next) => {
            setValue(next)
            if (isComplete(next)) setSubmitted(false)
          }}
        />
        {invalid ? (
          <FieldError match>همه بخش‌های پلاک را کامل وارد کنید.</FieldError>
        ) : (
          <FieldDescription>
            ارقام دو‌رقمی، حرف، ارقام سه‌رقمی و کد ایران را وارد کنید.
          </FieldDescription>
        )}
      </Field>

      <Button type="submit" className="self-start">
        ثبت
      </Button>
    </form>
  )
}
