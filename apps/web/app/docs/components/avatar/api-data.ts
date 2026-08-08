import type { ApiReferenceRow } from "@/components/api-reference"

export const avatarRootApi: ApiReferenceRow[] = [
  {
    prop: "size",
    type: '"default" | "sm" | "lg"',
    default: '"default"',
    description: "The size of the avatar.",
  },
]

export const avatarImageApi: ApiReferenceRow[] = [
  {
    prop: "src",
    type: "string",
    default: "—",
    description: "The image URL to render.",
  },
  {
    prop: "onLoadingStatusChange",
    type: '(status: "idle" | "loading" | "loaded" | "error") => void',
    default: "—",
    description: "Called when the image's loading status changes.",
  },
]

export const avatarFallbackApi: ApiReferenceRow[] = [
  {
    prop: "delay",
    type: "number",
    default: "0",
    description:
      "How long to wait (in ms) before showing the fallback, to avoid a flash while the image loads.",
  },
]
