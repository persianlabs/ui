import { TomanIcon } from "@workspace/ui/components/toman-icon"

export function TomanIconSizesExample() {
  return (
    <div className="flex items-end gap-4 text-foreground">
      <TomanIcon className="size-3" />
      <TomanIcon className="size-4" />
      <TomanIcon className="size-6" />
      <TomanIcon className="size-8" />
    </div>
  )
}
