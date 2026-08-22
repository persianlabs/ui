import type { ApiReferenceRow } from "@/components/api-reference"

export const breadcrumbLinkApi: ApiReferenceRow[] = [
  {
    prop: "render",
    type: "ReactElement | (props, state) => ReactElement",
    default: "undefined",
    description:
      "Renders a different element (e.g. a routing library's Link) in place of the native anchor, keeping the same styles.",
  },
]

export const breadcrumbSeparatorApi: ApiReferenceRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    default: "ChevronRightIcon",
    description: "Custom content to replace the default separator icon.",
  },
]
