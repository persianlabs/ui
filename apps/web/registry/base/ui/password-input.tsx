"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

export type PasswordInputProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "type" | "dir"
>

function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    // Passwords are opaque strings, not RTL-meaningful text, so the field
    // (and the toggle button's position within it) always renders LTR
    // regardless of the surrounding document direction — same rationale as
    // CardNumberInput/ShabaInput in bank-input.tsx.
    <InputGroup className={cn("h-auto", className)} dir="ltr">
      <InputGroupInput
        {...props}
        dir="ltr"
        spellCheck={false}
        type={showPassword ? "text" : "password"}
      />
      {/* `align="inline-end"` resolves relative to the InputGroup's own
          forced `dir="ltr"`, so it always lands on the physical right,
          independent of the host page's direction. */}
      <InputGroupAddon align="inline-end">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? (
            <EyeOffIcon className="size-4" aria-hidden="true" />
          ) : (
            <EyeIcon className="size-4" aria-hidden="true" />
          )}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { PasswordInput }
