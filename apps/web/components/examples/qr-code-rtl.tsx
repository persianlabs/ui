"use client"

import { DownloadIcon } from "lucide-react"

import {
  QrCode,
  QrCodeDownload,
  QrCodeFrame,
  QrCodeOverlay,
} from "@workspace/ui/components/qr-code"

import { AppLogo } from "@/components/app-logo"

export function QrCodeRtlExample() {
  return (
    <div className="flex flex-col items-center gap-3">
      <QrCode
        value="https://persian-labs.ir/card/sara-ahmadi"
        color={{ type: "linear", from: "#059669", to: "#0ea5e9", angle: 45 }}
      >
        <QrCodeFrame />
        <QrCodeOverlay>
          <AppLogo />
        </QrCodeOverlay>
        <QrCodeDownload fileName="کارت-ویزیت.png" mimeType="image/png">
          <DownloadIcon className="size-3.5" aria-hidden="true" />
          دانلود
        </QrCodeDownload>
      </QrCode>
      <p className="text-center text-sm text-muted-foreground">
        کارت ویزیت دیجیتال سارا احمدی
      </p>
    </div>
  )
}
