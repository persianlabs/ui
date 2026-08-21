"use client"

import { QrCode } from "@workspace/ui/components/qr-code"

export function QrCodeRtlExample() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border dark:border-input [&_svg]:h-auto [&_svg]:w-full">
        <QrCode
          value="https://persian-labs.ir/card/sara-ahmadi"
          size={140}
          errorCorrectionLevel="H"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        کارت ویزیت دیجیتال سارا احمدی
      </p>
    </div>
  )
}
