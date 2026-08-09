import { Checkbox } from "@workspace/ui/components/checkbox"
import { Hitbox } from "@workspace/ui/components/hitbox"

const sizes = ["sm", "default", "lg", "18px"] as const

export function HitboxSizesExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-4">
          <Hitbox size={size} debug>
            <Checkbox />
          </Hitbox>
          <p className="text-sm text-muted-foreground">{size}</p>
        </div>
      ))}
    </div>
  )
}
