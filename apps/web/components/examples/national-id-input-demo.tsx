"use client"

import * as React from "react"

import { NationalIdInput } from "@workspace/ui/components/national-id-input"
import { isValidNationalId } from "@workspace/ui/lib/national-id"

export function NationalIdInputDemoExample() {
  const [nationalId, setNationalId] = React.useState("")
  const complete = nationalId.length === 10

  return (
    <div className="grid w-full max-w-sm gap-2">
      <NationalIdInput value={nationalId} onValueChange={setNationalId} />
      <p className="text-xs text-muted-foreground">
        {complete
          ? isValidNationalId(nationalId)
            ? "کد ملی معتبر است"
            : "کد ملی معتبر نیست"
          : "کد ملی را وارد کنید"}
      </p>
    </div>
  )
}
