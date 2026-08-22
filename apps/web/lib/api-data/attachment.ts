import type { ApiReferenceRow } from "@/components/api-reference"

export const attachmentApi: ApiReferenceRow[] = [
  {
    prop: "state",
    type: '"idle" | "uploading" | "processing" | "error" | "done"',
    default: '"done"',
    description:
      "The upload state. Drives styling and the title shimmer while in progress.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "xs"',
    default: '"default"',
    description: "The attachment size.",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Lay the media beside or above the content.",
  },
  {
    prop: "class",
    type: "string",
    default: "-",
    description: "Additional classes to apply to the root element.",
  },
]

export const attachmentMediaApi: ApiReferenceRow[] = [
  {
    prop: "variant",
    type: '"icon" | "image"',
    default: '"icon"',
    description: "Whether the media holds an icon or an <img>.",
  },
  {
    prop: "class",
    type: "string",
    default: "-",
    description: "Additional classes to apply to the media slot.",
  },
]

export const attachmentContentApi: ApiReferenceRow[] = [
  {
    prop: "class",
    type: "string",
    default: "-",
    description: "Additional classes to apply to the content slot.",
  },
]

export const attachmentTitleApi: ApiReferenceRow[] = [
  {
    prop: "class",
    type: "string",
    default: "-",
    description:
      "Additional classes to apply to the title. Shimmers while the attachment is uploading or processing.",
  },
]

export const attachmentDescriptionApi: ApiReferenceRow[] = [
  {
    prop: "class",
    type: "string",
    default: "-",
    description:
      "Secondary metadata such as the file type, size, or upload status.",
  },
]

export const attachmentActionsApi: ApiReferenceRow[] = [
  {
    prop: "class",
    type: "string",
    default: "-",
    description:
      "Additional classes to apply to the actions container, aligned to the end of the attachment.",
  },
]

export const attachmentActionApi: ApiReferenceRow[] = [
  {
    prop: "size",
    type: 'Button["size"]',
    default: '"icon-xs"',
    description: "The button size.",
  },
  {
    prop: "…props",
    type: "React.ComponentProps<typeof Button>",
    default: "-",
    description: "Props spread to the underlying Button.",
  },
]

export const attachmentTriggerApi: ApiReferenceRow[] = [
  {
    prop: "render",
    type: "ReactElement | function",
    default: "-",
    description: "Render as a different element, such as a link.",
  },
  {
    prop: "…props",
    type: `React.ComponentProps<"button">`,
    default: "-",
    description: "Props spread to the trigger element.",
  },
]

export const attachmentGroupApi: ApiReferenceRow[] = [
  {
    prop: "class",
    type: "string",
    default: "-",
    description:
      "Lays out attachments in a horizontally scrollable, snapping row.",
  },
]
