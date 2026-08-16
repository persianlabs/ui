"use client"

import * as React from "react"
import qrcodegen from "qrcode-generator"

import { buttonVariants } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useControllableState } from "@workspace/ui/hooks/use-controllable-state"
import { cn } from "@workspace/ui/lib/utils"

/** A gradient fill for the QR pattern, painted via an SVG `<linearGradient>`/`<radialGradient>`. */
export interface QrCodeGradient {
  type: "linear" | "radial"
  from: string
  to: string
  /** Rotation in degrees, only applies to `type: "linear"`. @default 0 */
  angle?: number
}

/** A solid CSS color, or a gradient config. */
export type QrCodeColor = string | QrCodeGradient

/**
 * The center overlay's diameter as a fraction of the frame's total size.
 * Must stay in sync with the `--qr-code-overlay-size` CSS variable set on
 * the `QrCode` root (`calc(var(--qr-code-size)/4)`, i.e. 1/4) — this is the
 * same ratio used both to size `QrCodeOverlay` in CSS and to punch a
 * matching blank circle out of the QR pattern itself in `QrCodeFrame`.
 */
const OVERLAY_SIZE_RATIO = 0.25

/**
 * The module shape used to render the QR pattern. `"dotted"` is implemented
 * via SVG masking (see QrCodeFrame) rather than a per-module render loop —
 * the whole matrix is traced into a single `<path>`, then used as a stencil
 * so any fill (solid, gradient, or a tiled dot pattern) is clipped to
 * exactly the QR module shape. The type stays open (`string & {}`) so new
 * variants can be added without a breaking change, but only `"square"` and
 * `"dotted"` are implemented.
 */
export type QrCodeVariant = "square" | "dotted" | (string & {})

/** Options controlling how the value is encoded into a QR matrix. */
export interface QrCodeGenerateOptions {
  /**
   * The error correction level — higher levels tolerate more damage or
   * occlusion (e.g. a center logo overlay) at the cost of a denser matrix.
   * @default "M"
   */
  errorCorrectionLevel?: "L" | "M" | "Q" | "H"
  /**
   * The QR version/type number (1-40, each step adds more modules). `0`
   * lets the encoder pick the smallest version that fits the data.
   * @default 0
   */
  typeNumber?: number
}

interface ValueChangeDetails {
  value: string
}

interface QrCodeContextValue {
  value: string
  setValue: (value: string) => void
  moduleCount: number
  isDark: (row: number, col: number) => boolean
  variant: QrCodeVariant
  color: QrCodeColor
  pixelSize: number
  size: number
  maskId: string
  gradientId: string
  dotsId: string
  frameRef: React.RefObject<SVGSVGElement | null>
  /**
   * Whether a `QrCodeOverlay` is currently mounted — set via the effect in
   * `QrCodeOverlay` itself, since it's a sibling of `QrCodeFrame`, not a
   * child, so `QrCodeFrame` has no direct way to know it exists otherwise.
   * When true, `QrCodeFrame` punches a matching blank circle out of the
   * pattern (like Telegram's QR codes) instead of just letting the overlay
   * visually cover whatever modules happen to render underneath it.
   */
  hasOverlay: boolean
  setHasOverlay: (hasOverlay: boolean) => void
}

const QrCodeContext = React.createContext<QrCodeContextValue | null>(null)

function useQrCodeInternalContext(component: string) {
  const context = React.useContext(QrCodeContext)
  if (!context) {
    throw new Error(`${component} must be used within a <QrCode>`)
  }
  return context
}

/**
 * Access the encoded value and download helper from anywhere inside a
 * `<QrCode>` tree — e.g. to build a custom download control instead of
 * `<QrCodeDownload>`, or to read/set the encoded value programmatically.
 * Throws if called outside `<QrCode>`.
 */
export function useQrCode() {
  const { value, setValue, frameRef } = useQrCodeInternalContext("useQrCode")

  const getDataUrl = React.useCallback(
    (type: string = "image/png", quality?: number) =>
      svgFrameToDataUrl(frameRef.current, type, quality),
    [frameRef]
  )

  return { value, setValue, getDataUrl }
}

/** Empty-string sentinel so an empty `value` still renders a well-formed (all-light) matrix instead of throwing. */
const EMPTY_MODULE_COUNT = 1

function encodeQrValue(value: string, encoding?: QrCodeGenerateOptions) {
  if (!value) {
    return {
      moduleCount: EMPTY_MODULE_COUNT,
      isDark: () => false,
    }
  }

  const typeNumber = (encoding?.typeNumber ?? 0) as Parameters<
    typeof qrcodegen
  >[0]
  const errorCorrectionLevel = encoding?.errorCorrectionLevel ?? "M"

  const qr = qrcodegen(typeNumber, errorCorrectionLevel)
  qr.addData(value)
  qr.make()

  const moduleCount = qr.getModuleCount()
  return {
    moduleCount,
    isDark: (row: number, col: number) => qr.isDark(row, col),
  }
}

export interface QrCodeProps
  // `color` is a deprecated native HTML attribute (typed `string` by React)
  // that would otherwise conflict with our richer `QrCodeColor` prop below.
  extends Omit<React.ComponentProps<"div">, "color" | "defaultValue"> {
  /** The controlled value to encode. */
  value?: string
  /** The initial value to encode when uncontrolled. */
  defaultValue?: string
  /** Called when the encoded value changes. */
  onValueChange?: (details: ValueChangeDetails) => void
  /**
   * The shape used to render each QR module.
   * @default "square"
   */
  variant?: QrCodeVariant
  /**
   * The fill for the QR pattern — a solid CSS color, or a gradient config.
   * @default "black"
   */
  color?: QrCodeColor
  /**
   * The size of each QR module, in pixels of the SVG's own coordinate
   * system (not CSS pixels — the whole code is scaled to `--qr-code-size`
   * via CSS regardless). Also controls the pitch of the `"dotted"` variant.
   * @default 10
   */
  pixelSize?: number
  /** QR code encoding options (error correction level, version). */
  encoding?: QrCodeGenerateOptions
}

function QrCode(props: QrCodeProps) {
  const {
    className,
    variant = "square",
    color = "black",
    pixelSize = 10,
    value: valueProp,
    defaultValue,
    onValueChange,
    encoding,
    ...rest
  } = props

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? "",
    onChange: (next) => onValueChange?.({ value: next }),
    caller: "QrCode",
  })

  const { moduleCount, isDark } = React.useMemo(
    () => encodeQrValue(value, encoding),
    [value, encoding]
  )

  const reactId = React.useId()
  const maskId = `qr-code-mask-${reactId}`
  const gradientId = `qr-code-gradient-${reactId}`
  const dotsId = `qr-code-dots-${reactId}`

  const frameRef = React.useRef<SVGSVGElement>(null)
  const [hasOverlay, setHasOverlay] = React.useState(false)

  const contextValue = React.useMemo<QrCodeContextValue>(
    () => ({
      value,
      setValue,
      moduleCount,
      isDark,
      variant,
      color,
      pixelSize,
      size: moduleCount * pixelSize,
      maskId,
      gradientId,
      dotsId,
      frameRef,
      hasOverlay,
      setHasOverlay,
    }),
    [
      value,
      setValue,
      moduleCount,
      isDark,
      variant,
      color,
      pixelSize,
      maskId,
      gradientId,
      dotsId,
      hasOverlay,
      setHasOverlay,
    ]
  )

  return (
    <QrCodeContext.Provider value={contextValue}>
      <div
        className={cn(
          "[--qr-code-overlay-size:calc(var(--qr-code-size)/4)] [--qr-code-size:--spacing(32)]",
          // Grid, not flex: QrCodeFrame and QrCodeOverlay are siblings (not
          // nested), so they're both pinned to the same [grid-area:1/1] cell
          // to stack them — any other sibling (e.g. QrCodeDownload) falls
          // through to its own row below instead. Positioning the overlay
          // via `absolute` relative to this whole root would center it
          // against the root's FULL height (frame + gap + download button),
          // not just the frame square, which is exactly what caused it to
          // drift off-center whenever a download button was present.
          "grid w-fit shrink-0 justify-items-center gap-4",
          className
        )}
        data-slot="qr-code"
        {...rest}
      />
    </QrCodeContext.Provider>
  )
}

function QrCodeFrame(props: React.ComponentProps<"svg">) {
  const { className, children, ...rest } = props
  const {
    variant,
    color,
    pixelSize,
    size,
    maskId,
    gradientId,
    dotsId,
    moduleCount,
    isDark,
    frameRef,
    hasOverlay,
  } = useQrCodeInternalContext("QrCodeFrame")

  const isGradient = typeof color === "object"
  const dotted = variant === "dotted"
  const solidColor = isGradient ? undefined : color
  const fill = dotted
    ? `url(#${dotsId})`
    : isGradient
      ? `url(#${gradientId})`
      : solidColor
  // Roughly a 60% dot diameter relative to the module pitch — dense enough
  // to still read as a QR code, open enough to look distinct from "square".
  const dotRadius = pixelSize * 0.3

  // Walk the module grid once and trace every dark cell into a single SVG
  // path (`M x,y h w v h h -w z` per cell) — the same "one path covering
  // every dark module" shape a QR renderer needs, generated directly from
  // the encoded matrix rather than any per-module render loop.
  const patternPath = React.useMemo(() => {
    let d = ""
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (!isDark(row, col)) continue
        const x = col * pixelSize
        const y = row * pixelSize
        d += `M${x},${y}h${pixelSize}v${pixelSize}h${-pixelSize}z`
      }
    }
    return d
  }, [moduleCount, isDark, pixelSize])

  return (
    <svg
      ref={frameRef}
      viewBox={`0 0 ${size} ${size}`}
      className={cn(
        "size-(--qr-code-size) overflow-hidden rounded-md bg-white p-3 [grid-area:1/1]",
        className
      )}
      data-slot="qr-code-frame"
      {...rest}
    >
      <defs>
        {/*
          Rendering the traced path invisibly inside a <mask> turns it into
          a reusable stencil: SVG luminance masks treat white content as
          fully visible and black (or absent) as fully hidden, so any fill
          painted through this mask (solid, gradient, or a tiled dot
          pattern) is clipped to exactly the QR module shape, without
          needing to paint each cell individually.
        */}
        <mask id={maskId}>
          <path d={patternPath} className="fill-white" />
          {/*
            A logo doesn't sit ON TOP of the pattern (like the previous
            implementation, which just let QrCodeOverlay's div visually
            cover whatever modules happened to render underneath it) — it
            sits IN a genuine gap punched out of the pattern itself, same as
            Telegram's QR codes. Painted after the path, in the mask's own
            luminance space (black = hidden here), so it subtracts from the
            visible fill regardless of variant/color.
          */}
          {hasOverlay && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={(size * OVERLAY_SIZE_RATIO) / 2}
              className="fill-black"
            />
          )}
        </mask>
        {isGradient && color.type === "linear" && (
          <linearGradient
            id={gradientId}
            gradientTransform={`rotate(${color.angle ?? 0} 0.5 0.5)`}
          >
            <stop offset="0%" stopColor={color.from} />
            <stop offset="100%" stopColor={color.to} />
          </linearGradient>
        )}
        {isGradient && color.type === "radial" && (
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor={color.from} />
            <stop offset="100%" stopColor={color.to} />
          </radialGradient>
        )}
        {dotted && (
          <pattern
            id={dotsId}
            patternUnits="userSpaceOnUse"
            width={pixelSize}
            height={pixelSize}
          >
            <circle
              cx={pixelSize / 2}
              cy={pixelSize / 2}
              r={dotRadius}
              fill={isGradient ? `url(#${gradientId})` : solidColor}
            />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" mask={`url(#${maskId})`} fill={fill} />
      {children}
    </svg>
  )
}

/** The overlay's background chrome behind the logo/icon. */
export type QrCodeOverlayBackground = "solid" | "none"

export interface QrCodeOverlayProps extends React.ComponentProps<"div"> {
  /**
   * `"solid"` renders an opaque circle behind the logo so the QR pattern
   * never shows through it. `"none"` renders no background at all, letting
   * a transparent logo blend directly over the code — useful for logos that
   * already have their own backdrop, or a deliberately subtle mark.
   * @default "solid"
   */
  background?: QrCodeOverlayBackground
}

function QrCodeOverlay(props: QrCodeOverlayProps) {
  const {
    className,
    background = "solid",
    "aria-hidden": ariaHidden = true,
    ...rest
  } = props
  const { setHasOverlay } = useQrCodeInternalContext("QrCodeOverlay")

  // Registers with QrCodeFrame (a sibling, not a parent/child, so this is
  // the only way it can know an overlay exists) so the pattern punches a
  // matching blank circle instead of rendering modules underneath this.
  React.useEffect(() => {
    setHasOverlay(true)
    return () => setHasOverlay(false)
  }, [setHasOverlay])

  // Shares QrCodeFrame's [grid-area:1/1] cell (see QrCode root) and
  // self-centers within it via `place-self-center` — a single, unambiguous
  // geometric center with no `left`/`right`/`inset`/`translate` involved, so
  // there's nothing for `direction` to resolve differently between LTR and
  // RTL, and no dependence on this being the root's only/last child.
  return (
    <div
      aria-hidden={ariaHidden}
      data-background={background}
      className={cn(
        "size-(--qr-code-overlay-size) place-self-center [grid-area:1/1]",
        "flex items-center justify-center",
        background === "solid" && "rounded-full bg-black p-2 text-white",
        "[&_svg,&_img]:size-full [&_svg,&_img]:object-contain",
        className
      )}
      data-slot="qr-code-overlay"
      {...rest}
    />
  )
}

async function svgFrameToDataUrl(
  svgEl: SVGSVGElement | null,
  mimeType: string,
  quality?: number
): Promise<string> {
  if (!svgEl) return ""

  const clone = svgEl.cloneNode(true) as SVGSVGElement
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg")

  const viewBox = clone.viewBox.baseVal
  // Render at a higher pixel density than the SVG's own module coordinate
  // system so the exported image stays crisp at typical download sizes.
  const exportSize = Math.max(viewBox.width, 512)

  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(clone)
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`

  const image = new Image()
  const loaded = new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error("Failed to load QR code SVG"))
  })
  image.src = svgDataUrl
  await loaded

  const canvas = document.createElement("canvas")
  canvas.width = exportSize
  canvas.height = exportSize
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""

  // PNG/JPEG/WebP don't preserve SVG transparency the same way — paint a
  // white backdrop first so JPEG exports (which have no alpha channel)
  // don't fall back to black.
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, exportSize, exportSize)
  ctx.drawImage(image, 0, 0, exportSize, exportSize)

  return canvas.toDataURL(mimeType, quality)
}

export interface QrCodeDownloadProps extends Omit<
  React.ComponentProps<"button">,
  "onClick"
> {
  /** The downloaded file's name. */
  fileName: string
  /** The image format to export. */
  mimeType?: "image/png" | "image/jpeg" | "image/webp"
  /** The image quality, for lossy mime types. */
  quality?: number
}

function QrCodeDownload(props: QrCodeDownloadProps) {
  const {
    className,
    fileName,
    mimeType = "image/png",
    quality,
    disabled,
    ...rest
  } = props
  const { frameRef } = useQrCodeInternalContext("QrCodeDownload")
  const [pending, setPending] = React.useState(false)

  const handleClick = React.useCallback(async () => {
    setPending(true)
    try {
      const dataUrl = await svgFrameToDataUrl(
        frameRef.current,
        mimeType,
        quality
      )
      if (!dataUrl) return

      const anchor = document.createElement("a")
      anchor.href = dataUrl
      anchor.download = fileName
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
    } finally {
      setPending(false)
    }
  }, [frameRef, mimeType, quality, fileName])

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || pending}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        className
      )}
      data-slot="qr-code-download-trigger"
      {...rest}
    />
  )
}

function QrCodeSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return (
    <Skeleton
      data-slot="qr-code-skeleton"
      className={cn(
        "[--qr-code-size:--spacing(32)]",
        "size-(--qr-code-size) rounded-md",
        className
      )}
      {...props}
    />
  )
}

export { QrCode, QrCodeFrame, QrCodeOverlay, QrCodeDownload, QrCodeSkeleton }
