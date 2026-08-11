"use client"

import * as React from "react"

import { ShabaInput } from "@workspace/ui/components/bank-input"
import { validateIranianShaba } from "@workspace/ui/lib/iranian-bank"

export function BankInputShabaExample() {
  const [shaba, setShaba] = React.useState("")
  const complete = shaba.length === 24

  return (
    <div className="grid w-full max-w-md gap-2">
      <ShabaInput
        value={shaba}
        onValueChange={setShaba}
        separator="-"
        aria-invalid={complete && !validateIranianShaba(shaba)}
      />
      <p className="text-xs text-muted-foreground">
        Paste with or without the IR prefix — the field normalizes it.
      </p>
    </div>
  )
}
