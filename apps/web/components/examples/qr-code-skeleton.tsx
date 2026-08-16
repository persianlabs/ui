"use client"

import * as React from "react"

import {
  QrCode,
  QrCodeFrame,
  QrCodeSkeleton,
} from "@workspace/ui/components/qr-code"

export function QrCodeSkeletonExample() {
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 1600)
    return () => clearTimeout(timeout)
  }, [])

  if (!loaded) {
    return <QrCodeSkeleton />
  }

  return (
    <QrCode value="https://ui.persian-labs.ir">
      <QrCodeFrame />
    </QrCode>
  )
}
