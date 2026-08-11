"use client"

import * as React from "react"
import * as z from "zod"

import { Button } from "@workspace/ui/components/button"
import {
  CardNumberInput,
  ShabaInput,
} from "@workspace/ui/components/bank-input"
import {
  validateIranianCard,
  validateIranianShaba,
} from "@workspace/ui/lib/iranian-bank"

const schema = z.object({
  card: z.string().refine(validateIranianCard, "شماره کارت معتبر نیست"),
  shaba: z.string().refine(validateIranianShaba, "شماره شبا معتبر نیست"),
})

export function BankInputZodExample() {
  const [card, setCard] = React.useState("")
  const [shaba, setShaba] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [attempted, setAttempted] = React.useState(false)
  const complete = card.length === 16 && shaba.length === 24
  const cardError = attempted && !validateIranianCard(card)
  const shabaError = attempted && !validateIranianShaba(shaba)

  return (
    <form
      className="grid w-full max-w-md gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        setAttempted(true)
        setSubmitted(schema.safeParse({ card, shaba }).success)
      }}
    >
      <div className="grid gap-1.5">
        <CardNumberInput
          value={card}
          onValueChange={(value) => {
            setCard(value)
            setSubmitted(false)
          }}
          bankLogo="mono"
          aria-invalid={cardError}
        />
        {cardError && (
          <p className="text-xs text-destructive">شماره کارت معتبر نیست</p>
        )}
      </div>
      <div className="grid gap-1.5">
        <ShabaInput
          value={shaba}
          onValueChange={(value) => {
            setShaba(value)
            setSubmitted(false)
          }}
          aria-invalid={shabaError}
        />
        {shabaError && (
          <p className="text-xs text-destructive">شماره شبا معتبر نیست</p>
        )}
      </div>
      <Button type="submit" disabled={!complete}>
        ثبت اطلاعات بانکی
      </Button>
      {submitted && (
        <p className="text-sm text-muted-foreground">
          اطلاعات بانکی معتبر است.
        </p>
      )}
    </form>
  )
}
