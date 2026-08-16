"use client"

import {
  OTPInput,
  OTPInputContext,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp"
import { MinusIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * OTP values are always digits, so the slots must read left-to-right even
 * inside an RTL page. `dir` on OTPInput itself only reaches the (invisible)
 * native input, not the visible slots it renders as children — so it's set
 * on this wrapper instead, which the slots actually inherit direction from.
 */
function InputOTP({
  className,
  containerClassName,
  autoComplete = "one-time-code",
  spellCheck = false,
  ...props
}: React.ComponentProps<typeof OTPInput>) {
  return (
    <div data-slot="input-otp" dir="ltr" className="contents">
      <OTPInput
        containerClassName={cn(
          "flex items-center gap-2 has-[[data-disabled]]:opacity-50",
          containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        {...props}
      />
    </div>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive || undefined}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-e border-input text-base outline-none first:rounded-s-lg first:border-s last:rounded-e-lg aria-invalid:border-destructive data-[active]:z-10 data-[active]:border-ring data-[active]:ring-3 data-[active]:ring-ring/50 md:text-sm dark:bg-input/30",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-pulse bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon className="size-4 text-muted-foreground" />
    </div>
  )
}

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
}
