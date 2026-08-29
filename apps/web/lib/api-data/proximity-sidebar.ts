import type { ApiReferenceRow } from "@/components/api-reference"

export const proximitySidebarApi: ApiReferenceRow[] = [
  {
    prop: "sections",
    type: "ProximitySection[]",
    typeDetail:
      'Array<{ id: string; label: string; kind?: "title" | "subtitle" | "section" | "body"; level?: 1 | 2 | 3 | 4 | 5 | 6 }>',
    default: "required",
    description:
      "Ordered section map used for rendering dashes and scroll targeting. Each id must match an element id present in the page. Without kind or level, the visual weight is inferred from the first heading inside the target element.",
  },
  {
    prop: "side",
    type: '"left" | "right"',
    default: '"left"',
    description:
      "Pins the minimap to the chosen side and flips the dash transform origin accordingly. Flips again automatically under RTL so dashes keep expanding from the outer rail edge.",
  },
  {
    prop: "activeOffset",
    type: "number",
    default: "0.4",
    description:
      "Viewport anchor ratio used to detect the active section while scrolling (0 = top, 1 = bottom).",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: "auto (from <html dir>)",
    description:
      "Force the text direction instead of auto-detecting it from the document element.",
  },
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional classes for the outer nav wrapper.",
  },
]
