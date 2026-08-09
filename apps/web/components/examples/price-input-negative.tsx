"use client"

import * as React from "react"

import { Field, FieldDescription, FieldLabel } from "@workspace/ui/components/field"
import { PriceInput } from "@workspace/ui/components/price-input"

export function PriceInputNegativeExample() {
  const [value, setValue] = React.useState<number | null>(-15000)

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="price-input-negative">Balance adjustment</FieldLabel>
      <PriceInput id="price-input-negative" value={value} onValueChange={setValue} />
      <FieldDescription>
        Negative amounts are allowed by default. Pass{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
          min={"{0}"}
        </code>{" "}
        to disallow them.
      </FieldDescription>
    </Field>
  )
}
