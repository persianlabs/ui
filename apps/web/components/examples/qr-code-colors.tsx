"use client"

import { QrCode } from "@workspace/ui/components/qr-code"

const cards = [
  { value: "https://ui.persian-labs.ir", fgColor: "#c2410c" },
  { value: "https://persian-labs.ir", fgColor: "#1d4ed8" },
  { value: "https://github.com/persianlabs", fgColor: "#15803d" },
]

export function QrCodeColorsExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {cards.map(({ value, fgColor }) => (
        <div
          key={value}
          className="w-[105px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] md:w-[140px] dark:border dark:border-input [&_svg]:h-auto [&_svg]:w-full"
        >
          <QrCode value={value} size={140} fgColor={fgColor} />
        </div>
      ))}
    </div>
  )
}
