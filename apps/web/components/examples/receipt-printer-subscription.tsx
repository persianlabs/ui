"use client"

import { Button } from "@workspace/ui/components/button"
import {
  ReceiptPrinterHeader,
  ReceiptPrinterMachine,
  ReceiptPrinterOutput,
  ReceiptPrinterPaper,
  ReceiptPrinterRoot,
  ReceiptPrinterScreen,
  ReceiptPrinterStatus,
} from "@workspace/ui/components/receipt-printer"
import type { ReceiptPrinterStage } from "@workspace/ui/components/receipt-printer"
import * as React from "react"

const ReceiptPrinter = {
  Root: ReceiptPrinterRoot,
  Machine: ReceiptPrinterMachine,
  Header: ReceiptPrinterHeader,
  Screen: ReceiptPrinterScreen,
  Status: ReceiptPrinterStatus,
  Output: ReceiptPrinterOutput,
  Paper: ReceiptPrinterPaper,
}

export function ReceiptPrinterSubscriptionExample() {
  const [stage, setStage] = React.useState<ReceiptPrinterStage>("complete")
  const replay = async () => {
    setStage("processing")
    await new Promise((resolve) => setTimeout(resolve, 700))
    setStage("printing")
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setStage("complete")
  }
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <ReceiptPrinter.Root stage={stage}>
        <ReceiptPrinter.Machine>
          <ReceiptPrinter.Header>
            <ReceiptPrinter.Status>
              {stage === "processing"
                ? "Renewing membership"
                : stage === "printing"
                  ? "Preparing your receipt"
                  : "Membership renewed"}
            </ReceiptPrinter.Status>
            <span className="relative z-10 size-2 rounded-full bg-sky-300 shadow-[0_0_12px_#7dd3fc]" />
          </ReceiptPrinter.Header>
          <ReceiptPrinter.Screen>MEMBERSHIP RENEWAL</ReceiptPrinter.Screen>
        </ReceiptPrinter.Machine>
        {stage !== "processing" && (
          <ReceiptPrinter.Output>
            <ReceiptPrinter.Paper>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black tracking-[.18em]">
                    STUDIO NOTE
                  </p>
                  <p className="mt-1 text-[10px] text-stone-500">
                    Creative tools, monthly
                  </p>
                </div>
                <span className="rounded-full bg-violet-100 px-2 py-1 text-[9px] font-bold text-violet-700">
                  ACTIVE
                </span>
              </div>
              <div className="my-4 flex items-center gap-3 border-y border-dashed border-stone-300 py-3">
                <img
                  className="size-12 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=120&q=80"
                  alt="Paint brushes"
                />
                <div>
                  <p className="text-xs font-bold">Pro membership</p>
                  <p className="mt-1 text-[10px] text-stone-500">
                    Sep 01 — Oct 01, 2026
                  </p>
                </div>
              </div>
              <p className="flex justify-between text-[11px]">
                <span>Monthly plan</span>
                <span>$18.00</span>
              </p>
              <p className="mt-1.5 flex justify-between text-[11px] text-stone-500">
                <span>Member saving</span>
                <span>−$3.00</span>
              </p>
              <div className="mt-4 flex justify-between border-t-2 border-stone-800 pt-3 text-sm font-black">
                <span>PAID</span>
                <span>$15.00</span>
              </div>
              <p className="mt-5 text-center text-[9px] text-stone-500">
                Your next renewal is Oct 01, 2026
              </p>
            </ReceiptPrinter.Paper>
          </ReceiptPrinter.Output>
        )}
      </ReceiptPrinter.Root>
      <Button
        variant="outline"
        size="sm"
        onClick={replay}
        disabled={stage !== "complete"}
      >
        {stage === "complete" ? "Replay renewal" : "Processing…"}
      </Button>
    </div>
  )
}
