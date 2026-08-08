import { AspectRatio } from "@workspace/ui/components/aspect-ratio"

export function AspectRatioRtlExample() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio
        ratio={16 / 9}
        className="flex items-end rounded-lg bg-muted p-3"
      >
        <span className="text-sm text-muted-foreground">
          تصویر با نسبت ۱۶ به ۹
        </span>
      </AspectRatio>
    </div>
  )
}
