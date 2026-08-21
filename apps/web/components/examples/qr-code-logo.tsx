"use client"

import { QrCode } from "@workspace/ui/components/qr-code"

import { AppLogo } from "@/components/app-logo"

export function QrCodeLogoExample() {
  return (
    <div className="w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border dark:border-input [&_svg]:h-auto [&_svg]:w-full">
      <QrCode
        value="https://ui.persian-labs.ir"
        size={140}
        errorCorrectionLevel="H"
        logo={<AppLogo className="size-8 text-foreground" />}
      />
    </div>
  )
}
