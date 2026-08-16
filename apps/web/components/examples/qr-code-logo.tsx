"use client"

import { AppLogo } from "@/components/app-logo"
import {
  QrCode,
  QrCodeFrame,
  QrCodeOverlay,
} from "@workspace/ui/components/qr-code"

export function QrCodeLogoExample() {
  return (
    <QrCode value="https://ui.persian-labs.ir">
      <QrCodeFrame />
      <QrCodeOverlay>
        <AppLogo />
      </QrCodeOverlay>
    </QrCode>
  )
}
