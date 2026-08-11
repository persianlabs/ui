"use client"

import * as React from "react"

import { CardNumberInput } from "@workspace/ui/components/bank-input"
import { validateIranianCard } from "@workspace/ui/lib/iranian-bank"

export function BankInputDemoExample() {
  const [card, setCard] = React.useState("")
  const complete = card.length === 16

  return (
    <div className="grid w-full max-w-sm gap-2">
      <CardNumberInput
        value={card}
        onValueChange={setCard}
        aria-invalid={complete && !validateIranianCard(card)}
      />
      <p className="text-xs text-muted-foreground">
        {complete
          ? validateIranianCard(card)
            ? "شماره کارت معتبر است"
            : "شماره کارت معتبر نیست"
          : "شماره کارت را وارد کنید"}
      </p>
    </div>
  )
}
