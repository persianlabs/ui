"use client"

import * as React from "react"
import { CheckIcon, CircleAlertIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { useControllableState } from "@workspace/ui/hooks/use-controllable-state"
import { isValidNationalId } from "@workspace/ui/lib/national-id"
import { normalizePersianDigits } from "@workspace/ui/lib/normalize-persian-digits"
import { cn } from "@workspace/ui/lib/utils"

function normalizeNationalId(value: string) {
  return normalizePersianDigits(value).replace(/\D/g, "").slice(0, 10)
}

export interface NationalIdInputProps extends Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "defaultValue" | "onChange" | "type" | "dir"
> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

function NationalIdInput({
  value,
  defaultValue = "",
  onValueChange,
  className,
  ...props
}: NationalIdInputProps) {
  const [nationalId, setNationalId] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: "NationalIdInput",
  })
  const normalized = normalizeNationalId(nationalId)
  const complete = normalized.length === 10
  const valid = complete && isValidNationalId(normalized)

  return (
    // Like CardNumberInput/ShabaInput in bank-input.tsx, a national ID is
    // display-formatted, non-RTL-meaningful text, so the field always
    // renders LTR regardless of the surrounding document direction.
    <InputGroup className={cn("h-10", className)} dir="ltr">
      <InputGroupInput
        {...props}
        dir="ltr"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        translate="no"
        aria-invalid={complete && !valid}
        value={normalized}
        onChange={(event) =>
          // Runs for both typing and pasting — a paste event updates the
          // native input's value first, which fires this same handler, so
          // pasted Persian or Arabic-Indic digits are normalized immediately
          // without needing a separate paste handler (and without ever
          // blocking the paste itself).
          setNationalId(normalizeNationalId(event.target.value))
        }
        placeholder="0012345678"
        className="font-mono text-base tracking-wide"
      />
      {complete && (
        <InputGroupAddon align="inline-end">
          {valid ? (
            <CheckIcon
              role="img"
              aria-label="کد ملی معتبر است"
              className="size-4 text-success"
            />
          ) : (
            <CircleAlertIcon
              role="img"
              aria-label="کد ملی معتبر نیست"
              className="size-4 text-destructive"
            />
          )}
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

export { NationalIdInput }
