import type { ApiReferenceRow } from "@/components/api-reference"

export const carouselApi: ApiReferenceRow[] = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description:
      "The axis the carousel scrolls on. Also drives the layout of items and the placement of the navigation buttons.",
  },
  {
    prop: "opts",
    type: "EmblaOptionsType",
    description:
      "Options passed through to Embla Carousel — align, loop, direction, and everything else in Embla's option list.",
  },
  {
    prop: "plugins",
    type: "EmblaPluginType[]",
    description:
      "Embla plugins such as Autoplay, applied when the carousel initializes.",
  },
  {
    prop: "setApi",
    type: "(api: CarouselApi) => void",
    default: "-",
    description:
      "Receives the Embla API instance so you can read state or listen to events.",
  },
  {
    prop: "class",
    type: "string",
    default: "-",
    description: "Additional classes to apply to the root region element.",
  },
]

export const carouselContentApi: ApiReferenceRow[] = [
  {
    prop: "class",
    type: "string",
    default: "-",
    description:
      "Applied to the scrolling container. The inner flex track defaults to a -ml-4 gap that pairs with CarouselItem's pl-4.",
  },
]

export const carouselItemApi: ApiReferenceRow[] = [
  {
    prop: "class",
    type: "string",
    default: '"basis-full"',
    description:
      "Override the slide width with basis utilities (e.g. basis-1/2 lg:basis-1/3) and adjust spacing with pl-*.",
  },
]

export const carouselButtonApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: 'Button["variant"]',
    default: '"outline"',
    description: "The navigation button variant. Renders a Button.",
  },
  {
    prop: "size",
    type: 'Button["size"]',
    default: '"icon-sm"',
    description: "The navigation button size.",
  },
  {
    prop: "class",
    type: "string",
    default: "-",
    description:
      "Positioned absolutely relative to the carousel; horizontal mode places Previous at -start-12 and Next at -end-12, mirroring automatically in RTL.",
  },
  {
    prop: "…props",
    type: "React.ComponentProps<typeof Button>",
    default: "-",
    description: "Props spread to the underlying Button.",
  },
]
