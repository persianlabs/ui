import type { ApiReferenceRow } from "@/components/api-reference"

export const useMediaQueryApi: ApiReferenceRow[] = [
  {
    prop: "query",
    type: "BreakpointQuery | MediaQueryInput | string",
    default: "—",
    description:
      'A breakpoint shorthand ("md", "max-md", "md:max-lg"), an object ({ min, max, pointer }), or a raw CSS media query string.',
  },
]

export const mediaQueryInputApi: ApiReferenceRow[] = [
  {
    prop: "min",
    type: "Breakpoint | number",
    default: "—",
    description: "Min-width breakpoint name or px value.",
  },
  {
    prop: "max",
    type: "Breakpoint | number",
    default: "—",
    description: "Max-width breakpoint name or px value.",
  },
  {
    prop: "pointer",
    type: '"coarse" | "fine"',
    default: "—",
    description: 'Pointer type — "coarse" for touch, "fine" for mouse/trackpad.',
  },
]

export const breakpoints = [
  { name: "sm", value: "640px" },
  { name: "md", value: "800px" },
  { name: "lg", value: "1024px" },
  { name: "xl", value: "1280px" },
  { name: "2xl", value: "1536px" },
  { name: "3xl", value: "1600px" },
  { name: "4xl", value: "2000px" },
]
