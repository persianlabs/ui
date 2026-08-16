"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
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
import { joinWithNbsp } from "@workspace/ui/lib/join-with-nbsp"
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

export function ReceiptPrinterRtlExample() {
  const [stage, setStage] = React.useState<ReceiptPrinterStage>("complete")
  const replay = async () => {
    setStage("processing")
    await new Promise((resolve) => setTimeout(resolve, 700))
    setStage("printing")
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setStage("complete")
  }
  return (
    <div className="flex w-full flex-col items-center gap-5" dir="rtl">
      <ReceiptPrinter.Root stage={stage} dir="rtl">
        <ReceiptPrinter.Machine>
          <ReceiptPrinter.Header>
            <ReceiptPrinter.Status>
              {stage === "processing"
                ? "در حال تایید پرداخت"
                : stage === "printing"
                  ? "در حال چاپ رسید"
                  : "پرداخت با موفقیت انجام شد"}
            </ReceiptPrinter.Status>
            <span className="relative z-10 font-mono text-[10px] text-stone-500">
              ۲۴۸۱
            </span>
          </ReceiptPrinter.Header>
          <ReceiptPrinter.Screen>پرداخت موفق · ۱۴:۴۸</ReceiptPrinter.Screen>
        </ReceiptPrinter.Machine>
        {stage !== "processing" && (
          <ReceiptPrinter.Output>
            <ReceiptPrinter.Paper>
              <div className="text-center">
                <p className="text-xs font-black tracking-[.12em]">
                  فروشگاه کاغذی
                </p>
                <p className="mt-1 text-[10px] text-stone-500">رسید خرید شما</p>
              </div>
              <div className="my-4 flex items-center gap-3 border-y border-dashed border-stone-300 py-3">
                <Avatar className="size-11 rounded-sm">
                  <AvatarImage
                    className="rounded-sm"
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80"
                    alt="Sneaker"
                  />
                  <AvatarFallback className="rounded-sm text-xs">
                    ک
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold">کتانی روزمره</p>
                  <p className="mt-1 text-[10px] text-stone-500">۱ عدد</p>
                </div>
                <span className="text-xs font-bold">۱٬۹۹۰</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <p className="flex justify-between">
                  <span>مبلغ کالا</span>
                  <span>۱٬۹۹۰٬۰۰۰</span>
                </p>
                <p className="flex justify-between">
                  <span>ارسال</span>
                  <span>رایگان</span>
                </p>
              </div>
              <div className="mt-4 flex justify-between border-t-2 border-stone-800 pt-3">
                <span className="text-xs font-bold">مبلغ پرداختی</span>
                <span className="text-lg font-black">
                  {joinWithNbsp("۱٬۹۹۰٬۰۰۰", "تومان")}
                </span>
              </div>
              <p className="mt-5 text-center text-[9px] text-stone-500">
                سپاس از خرید شما
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
        {stage === "complete" ? "نمایش دوباره رسید" : "در حال پردازش…"}
      </Button>
    </div>
  )
}
