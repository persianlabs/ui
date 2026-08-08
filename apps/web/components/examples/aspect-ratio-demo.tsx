import { AspectRatio } from "@workspace/ui/components/aspect-ratio"

export function AspectRatioDemoExample() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio
        ratio={16 / 9}
        className="flex items-center justify-center rounded-lg bg-muted"
      >
        <span className="text-sm text-muted-foreground">16 / 9</span>
      </AspectRatio>
    </div>
  )
}
