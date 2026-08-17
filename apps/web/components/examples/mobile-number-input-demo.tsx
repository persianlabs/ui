"use client"

import * as React from "react"

import { MobileNumberInput } from "@workspace/ui/components/mobile-number-input"
import { isValidIranPhone } from "@workspace/ui/lib/iranian-mobile"

export function MobileNumberInputDemoExample() {
  const [phone, setPhone] = React.useState("")
  const complete = phone.length === 11

  return (
    <div className="grid w-full max-w-sm gap-2">
      <MobileNumberInput value={phone} onValueChange={setPhone} />
      <p className="text-xs text-muted-foreground">
        {complete
          ? isValidIranPhone(phone)
            ? "شماره موبایل معتبر است"
            : "شماره موبایل معتبر نیست"
          : "شماره موبایل را وارد کنید"}
      </p>
    </div>
  )
}
