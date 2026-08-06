"use client"

import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

const steps = ["details", "shipping", "payment"] as const
type Step = (typeof steps)[number]

export function TabsControlledExample() {
  const [step, setStep] = React.useState<Step>("details")

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Tabs value={step} onValueChange={(value) => setStep(value as Step)}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent
          value="details"
          className="text-muted-foreground mt-4 text-sm leading-relaxed"
        >
          Step 1 of 3 — tell us about the order.
        </TabsContent>
        <TabsContent
          value="shipping"
          className="text-muted-foreground mt-4 text-sm leading-relaxed"
        >
          Step 2 of 3 — where should it go.
        </TabsContent>
        <TabsContent
          value="payment"
          className="text-muted-foreground mt-4 text-sm leading-relaxed"
        >
          Step 3 of 3 — how you&apos;ll pay.
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            const index = steps.indexOf(step)
            setStep(steps[(index + 1) % steps.length]!)
          }}
          className="border-border hover:bg-muted rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
        >
          Next step
        </button>
      </div>
    </div>
  )
}
