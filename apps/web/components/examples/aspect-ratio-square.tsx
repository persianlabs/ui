import { AspectRatio } from "@workspace/ui/components/aspect-ratio"

export function AspectRatioSquareExample() {
  return (
    <div className="w-40">
      <AspectRatio
        ratio={1}
        className="flex items-center justify-center rounded-lg bg-muted"
      >
        <span className="text-sm text-muted-foreground">1 / 1</span>
      </AspectRatio>
    </div>
  )
}
