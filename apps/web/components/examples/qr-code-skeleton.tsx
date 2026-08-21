"use client"

import * as React from "react"
import { RefreshCwIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { QrCode, QrCodeSkeleton } from "@workspace/ui/components/qr-code"

export function QrCodeSkeletonExample() {
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    if (loaded) return

    const timeout = setTimeout(() => setLoaded(true), 3000)
    return () => clearTimeout(timeout)
  }, [loaded])

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border dark:border-input [&_svg]:h-auto [&_svg]:w-full">
        {loaded ? (
          <QrCode value="https://ui.persian-labs.ir" size={140} />
        ) : (
          <QrCodeSkeleton size={140} />
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setLoaded(false)}
        aria-label="بارگذاری مجدد کد QR"
      >
        <RefreshCwIcon className="size-3.5" aria-hidden="true" />
        بارگذاری مجدد
      </Button>
    </div>
  )
}
