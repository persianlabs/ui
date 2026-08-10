"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"
import { useCountdown } from "@workspace/ui/hooks/use-countdown"

const RESEND_DELAY_SECONDS = 30

export function UseCountdownOtpRtlExample() {
  const [target, setTarget] = React.useState<string | null>(null)
  const countdown = useCountdown(target)

  const startResendTimer = React.useCallback(() => {
    setTarget(new Date(Date.now() + RESEND_DELAY_SECONDS * 1000).toISOString())
  }, [])

  React.useEffect(() => {
    const timeoutId = setTimeout(startResendTimer, 0)
    return () => clearTimeout(timeoutId)
  }, [startResendTimer])

  const canResend = Boolean(countdown?.isOverdue)

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="space-y-1 text-center">
        <p className="text-sm font-medium">کد تأیید را وارد کنید</p>
        <p className="text-xs text-muted-foreground">
          کد ۶ رقمی به شماره ۰۹۱۲ ۳۴۵ ۶۷۸۹ ارسال شد
        </p>
      </div>
      <InputOTP maxLength={6} aria-label="کد تأیید">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        size="sm"
        variant="outline"
        disabled={!canResend}
        onClick={startResendTimer}
      >
        {canResend ? (
          "ارسال دوباره کد"
        ) : (
          <>
            ارسال دوباره کد تا{" "}
            <span dir="ltr">{countdown?.formatted ?? "00:30"}</span>
          </>
        )}
      </Button>
    </div>
  )
}
