import type { ApiReferenceRow } from "@/components/api-reference"

export const qrCodeApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "string",
    default: "—",
    description: "The controlled value to encode.",
  },
  {
    prop: "defaultValue",
    type: "string",
    default: "—",
    description: "The initial value to encode when uncontrolled.",
  },
  {
    prop: "variant",
    type: '"square" | "dotted" | (string & {})',
    default: '"square"',
    description:
      'The module shape used to render the QR pattern. Only "square" and "dotted" are implemented; the type stays open for future variants.',
  },
  {
    prop: "color",
    type: "string | QrCodeGradient",
    typeDetail:
      'type QrCodeGradient = {\n  type: "linear" | "radial"\n  from: string\n  to: string\n  angle?: number\n}',
    default: '"black"',
    description:
      "The fill for the QR pattern — a solid CSS color, or a gradient config rendered via an SVG linearGradient/radialGradient. Keep enough contrast against the frame's white background for the code to stay scannable.",
  },
  {
    prop: "pixelSize",
    type: "number",
    default: "10",
    description:
      'The size of each QR module in the SVG\'s own coordinate system. Also sets the dot pitch for the "dotted" variant.',
  },
  {
    prop: "encoding",
    type: "QrCodeGenerateOptions",
    typeDetail:
      'type QrCodeGenerateOptions = {\n  errorCorrectionLevel?: "L" | "M" | "Q" | "H"\n  typeNumber?: number\n}',
    default: "—",
    description:
      "QR code encoding options — error correction level and version/type number.",
  },
  {
    prop: "onValueChange",
    type: "(details: { value: string }) => void",
    default: "—",
    description: "Called when the encoded value changes.",
  },
]

export const qrCodeFrameApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Applied to the underlying svg frame element.",
  },
  {
    prop: "…props",
    type: "React.ComponentProps<'svg'>",
    default: "—",
    description: "All other props are forwarded to the underlying svg.",
  },
]

export const qrCodeOverlayApi: ApiReferenceRow[] = [
  {
    prop: "background",
    type: '"solid" | "none"',
    default: '"solid"',
    description:
      '"solid" renders an opaque circle behind the logo so the QR pattern never shows through it. "none" renders no background, letting a transparent logo blend directly over the code.',
  },
  {
    prop: "aria-hidden",
    type: "boolean",
    default: "true",
    description:
      "The center logo is decorative — the QR code itself carries the meaning. Override to false if the overlay content is meaningful on its own.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Applied to the overlay container.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    default: "—",
    description: "The logo/icon/image rendered at the center of the code.",
  },
]

export const qrCodeDownloadApi: ApiReferenceRow[] = [
  {
    prop: "fileName",
    type: "string",
    default: "—",
    description: "The downloaded file's name.",
  },
  {
    prop: "mimeType",
    type: '"image/png" | "image/jpeg" | "image/webp"',
    default: '"image/png"',
    description: "The image format to export.",
  },
  {
    prop: "quality",
    type: "number",
    default: "—",
    description: "The image quality, for lossy mime types.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description:
      "Applied to the trigger, styled as an outline button by default.",
  },
]

export const qrCodeSkeletonApi: ApiReferenceRow[] = [
  {
    prop: "className",
    type: "string",
    default: "—",
    description:
      "Applied to the underlying Skeleton. Sized to exactly match QrCodeFrame's default footprint so swapping between the two causes zero layout shift.",
  },
]
