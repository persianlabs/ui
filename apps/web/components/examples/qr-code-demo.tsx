"use client"

import { DownloadIcon } from "lucide-react"

import {
  QrCode,
  QrCodeDownload,
  QrCodeFrame,
} from "@workspace/ui/components/qr-code"

export function QrCodeDemoExample() {
  return (
    <QrCode value="https://ui.persian-labs.ir">
      <QrCodeFrame />
      <QrCodeDownload fileName="qr-code.png" mimeType="image/png">
        <DownloadIcon className="size-3.5" aria-hidden="true" />
        Download
      </QrCodeDownload>
    </QrCode>
  )
}
