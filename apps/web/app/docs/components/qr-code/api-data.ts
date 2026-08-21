import type { ApiReferenceRow } from "@/components/api-reference"

export const qrCodeApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "string",
    default: "—",
    description: "The text or URL encoded into the code.",
  },
  {
    prop: "size",
    type: "number",
    default: "268",
    description:
      "The width and height of the rendered SVG in pixels. The SVG scales to its container when styled with CSS.",
  },
  {
    prop: "fgColor",
    type: "string",
    default: '"var(--foreground)"',
    description:
      "The fill color for the data modules and finder patterns. Keep enough contrast against bgColor for the code to stay scannable.",
  },
  {
    prop: "bgColor",
    type: "string",
    default: '"var(--background)"',
    description:
      "The background color of the QR surface, also used behind the logo chip.",
  },
  {
    prop: "errorCorrectionLevel",
    type: '"L" | "M" | "Q" | "H"',
    default: '"M"',
    description:
      'The QR error correction level passed to the generator. Use "H" when rendering a logo so the code survives the covered modules.',
  },
  {
    prop: "logo",
    type: "React.ReactNode",
    default: "—",
    description:
      "An element rendered centered over the code on an opaque chip matching bgColor. Decorative by default (aria-hidden).",
  },
  {
    prop: "class",
    type: "string",
    default: "''",
    description: "Custom classes merged onto the root SVG element.",
  },
  {
    prop: "…props",
    type: "React.ComponentProps<'svg'>",
    default: "—",
    description: "All other props are forwarded to the underlying svg.",
  },
]

export const qrCodeSkeletonApi: ApiReferenceRow[] = [
  {
    prop: "size",
    type: "number",
    default: "268",
    description:
      "Mirrors QrCode's size prop so the placeholder occupies exactly the same footprint — swapping between the two causes zero layout shift.",
  },
  {
    prop: "class",
    type: "string",
    default: "''",
    description: "Custom classes merged onto the root SVG element.",
  },
  {
    prop: "…props",
    type: "React.ComponentProps<'svg'>",
    default: "—",
    description: "All other props are forwarded to the underlying svg.",
  },
]
