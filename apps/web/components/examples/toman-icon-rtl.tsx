import { TomanIcon } from "@workspace/ui/components/toman-icon"

export function TomanIconRtlExample() {
  return (
    <div className="flex items-center gap-1 text-lg font-semibold">
      <TomanIcon className="size-4" />
      <span dir="ltr">125,000</span>
    </div>
  )
}
