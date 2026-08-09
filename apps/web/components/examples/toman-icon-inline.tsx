import { TomanIcon } from "@workspace/ui/components/toman-icon"

export function TomanIconInlineExample() {
  return (
    <div className="inline-flex items-center gap-1 text-lg font-semibold">
      <span dir="ltr">125,000</span>
      <TomanIcon className="size-4" />
    </div>
  )
}
