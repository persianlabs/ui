"use client"

import { QrCode, QrCodeFrame } from "@workspace/ui/components/qr-code"

export function QrCodeGradientExample() {
  return (
    <QrCode
      value="https://ui.persian-labs.ir"
      color={{ type: "linear", from: "#7c3aed", to: "#06b6d4", angle: 45 }}
    >
      <QrCodeFrame />
    </QrCode>
  )
}
