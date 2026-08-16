"use client"

import { QrCode, QrCodeFrame } from "@workspace/ui/components/qr-code"

export function QrCodeDottedExample() {
  return (
    <QrCode value="https://ui.persian-labs.ir" variant="dotted">
      <QrCodeFrame />
    </QrCode>
  )
}
