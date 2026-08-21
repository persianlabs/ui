import * as React from "react"
// qrcode does not bundle TypeScript declarations.
// @ts-expect-error qrcode has no bundled TypeScript declarations.
import QRCodePackage from "qrcode"

import { cn } from "@workspace/ui/lib/utils"

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"

interface QrModules {
  size: number
  get(row: number, col: number): boolean
}

interface QrData {
  modules: QrModules
}

interface CirclePoint {
  cx: number
  cy: number
}

const QRCodeLib = QRCodePackage as {
  create(
    value: string,
    options: { errorCorrectionLevel: ErrorCorrectionLevel }
  ): QrData
}

function isInFinderPattern(row: number, col: number, size: number) {
  return (
    (row < 7 && col < 7) ||
    (row < 7 && col >= size - 7) ||
    (row >= size - 7 && col < 7)
  )
}

export interface QrCodeProps extends Omit<
  React.ComponentProps<"svg">,
  "color"
> {
  /** The value to encode. */
  value: string
  /** The width and height of the rendered code in pixels. @default 268 */
  size?: number
  /** The color of the QR modules. @default "var(--foreground)" */
  fgColor?: string
  /** The color of the QR code background. @default "var(--background)" */
  bgColor?: string
  /** The QR encoding error correction level. @default "M" */
  errorCorrectionLevel?: ErrorCorrectionLevel
  /** An element rendered centered over the code, on a background chip matching `bgColor`. Prefer `errorCorrectionLevel="H"` so the code stays scannable. */
  logo?: React.ReactNode
}

const LOGO_SIZE_RATIO = 0.25

function QrCode({
  value,
  size = 268,
  fgColor = "var(--foreground)",
  bgColor = "var(--background)",
  errorCorrectionLevel = "M",
  logo,
  className,
  ...props
}: QrCodeProps) {
  const qrData = React.useMemo(() => {
    try {
      return QRCodeLib.create(value, { errorCorrectionLevel })
    } catch {
      return null
    }
  }, [errorCorrectionLevel, value])

  const moduleCount = qrData?.modules.size ?? 0
  const moduleSize = moduleCount ? size / moduleCount : 0
  const circleRadius = moduleSize / 3
  const finderPositions = [
    [0, 0],
    [0, moduleCount - 7],
    [moduleCount - 7, 0],
  ] as const

  const circles = React.useMemo(() => {
    if (!qrData) return [] as CirclePoint[]

    const nextCircles: CirclePoint[] = []

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (
          qrData.modules.get(row, col) &&
          !isInFinderPattern(row, col, moduleCount)
        ) {
          nextCircles.push({
            cx: (col + 0.5) * moduleSize,
            cy: (row + 0.5) * moduleSize,
          })
        }
      }
    }

    return nextCircles
  }, [moduleCount, moduleSize, qrData])

  if (!qrData) return null

  const finderSize = 7 * moduleSize
  const innerPadding = moduleSize
  const innerWhiteSize = 5 * moduleSize
  const innerBlackSize = 3 * moduleSize

  const logoSize = size * LOGO_SIZE_RATIO
  const logoX = (size - logoSize) / 2
  const logoY = (size - logoSize) / 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`QR code for ${value}`}
      className={cn("block", className)}
      data-slot="qr-code"
      {...props}
    >
      <rect width={size} height={size} fill={bgColor} rx="12" ry="12" />

      {finderPositions.map(([row, col]) => {
        const x = col * moduleSize
        const y = row * moduleSize

        return (
          <g key={`${row}-${col}`}>
            <rect
              x={x}
              y={y}
              width={finderSize}
              height={finderSize}
              fill={fgColor}
              rx="12"
              ry="12"
            />
            <rect
              x={x + innerPadding}
              y={y + innerPadding}
              width={innerWhiteSize}
              height={innerWhiteSize}
              fill={bgColor}
              rx="8"
              ry="8"
            />
            <rect
              x={x + innerPadding * 2}
              y={y + innerPadding * 2}
              width={innerBlackSize}
              height={innerBlackSize}
              fill={fgColor}
              rx="3"
              ry="3"
            />
          </g>
        )
      })}

      {circles.map(({ cx, cy }, index) => (
        <circle
          key={`${cx}-${cy}-${index}`}
          cx={cx}
          cy={cy}
          r={circleRadius}
          fill={fgColor}
        />
      ))}

      {logo ? (
        <>
          <rect
            x={logoX}
            y={logoY}
            width={logoSize}
            height={logoSize}
            fill={bgColor}
            rx={logoSize / 5}
            ry={logoSize / 5}
          />
          <foreignObject x={logoX} y={logoY} width={logoSize} height={logoSize}>
            <div
              aria-hidden="true"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              {logo}
            </div>
          </foreignObject>
        </>
      ) : null}
    </svg>
  )
}

/**
 * A loading placeholder rendered as an SVG with the same footprint as
 * `QrCode`, so any CSS that scales the code (e.g. `[&_svg]:w-full`) styles
 * both identically and swapping between them causes zero layout shift.
 */
function QrCodeSkeleton({
  size = 268,
  className,
  ...props
}: Omit<React.ComponentProps<"svg">, "viewBox"> & Pick<QrCodeProps, "size">) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${size} ${size}`}
      className={cn("block animate-pulse text-muted", className)}
      data-slot="qr-code-skeleton"
      width={size}
      height={size}
      {...props}
    >
      <rect width={size} height={size} rx="12" ry="12" fill="currentColor" />
    </svg>
  )
}

export { QrCode, QrCodeSkeleton }
