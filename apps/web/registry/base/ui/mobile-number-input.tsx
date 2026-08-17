"use client"

import * as React from "react"
import { CheckIcon, CircleAlertIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useControllableState } from "@/hooks/use-controllable-state"
import { isValidIranPhone, normalizeIranPhone } from "@/lib/iranian-mobile"
import { cn } from "@/lib/utils"

export interface MobileNumberInputProps extends Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "defaultValue" | "onChange" | "type" | "dir"
> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

function MobileNumberInput({
  value,
  defaultValue = "",
  onValueChange,
  className,
  ...props
}: MobileNumberInputProps) {
  const [number, setNumber] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: "MobileNumberInput",
  })
  const normalized = normalizeIranPhone(number)
  const complete = normalized.length === 11
  const valid = complete && isValidIranPhone(normalized)

  return (
    // Like CardNumberInput/ShabaInput in bank-input.tsx, a phone number is
    // display-formatted, non-RTL-meaningful text, so the field always
    // renders LTR regardless of the surrounding document direction.
    <InputGroup className={cn("h-10", className)} dir="ltr">
      <InputGroupInput
        {...props}
        dir="ltr"
        inputMode="numeric"
        autoComplete="tel"
        spellCheck={false}
        translate="no"
        aria-invalid={complete && !valid}
        value={normalized}
        onChange={(event) =>
          // Runs for both typing and pasting — a paste event updates the
          // native input's value first, which fires this same handler, so
          // pasted Persian digits or +98/0098/98-prefixed numbers are
          // normalized immediately without needing a separate paste handler
          // (and without ever blocking the paste itself).
          setNumber(normalizeIranPhone(event.target.value).slice(0, 11))
        }
        placeholder="0912 123 4567"
        className="font-mono text-base tracking-wide"
      />
      {complete && (
        <InputGroupAddon align="inline-end">
          {valid ? (
            <CheckIcon
              role="img"
              aria-label="شماره موبایل معتبر است"
              className="size-4 text-success"
            />
          ) : (
            <CircleAlertIcon
              role="img"
              aria-label="شماره موبایل معتبر نیست"
              className="size-4 text-destructive"
            />
          )}
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

export { MobileNumberInput }
