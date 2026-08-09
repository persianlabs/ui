"use client"

import * as React from "react"

import { Field, FieldDescription, FieldLabel } from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@workspace/ui/components/input-group"
import { PriceInput } from "@workspace/ui/components/price-input"

export function PriceInputRtlExample() {
  const [value, setValue] = React.useState<number | null>(2500000)

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="price-input-rtl">قیمت</FieldLabel>
      <InputGroup>
        <PriceInput
          id="price-input-rtl"
          data-slot="input-group-control"
          value={value}
          onValueChange={setValue}
          className="flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>تومان</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>
        اعداد فارسی (۰-۹) هم هنگام تایپ به‌طور خودکار تبدیل می‌شوند.
      </FieldDescription>
    </Field>
  )
}
