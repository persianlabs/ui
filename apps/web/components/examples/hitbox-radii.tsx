import { Checkbox } from "@workspace/ui/components/checkbox"
import { Hitbox } from "@workspace/ui/components/hitbox"

const radii = ["none", "sm", "md", "lg", "full"] as const

export function HitboxRadiiExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {radii.map((radius) => (
        <div key={radius} className="flex flex-col items-center gap-4">
          <Hitbox radius={radius} debug>
            <Checkbox />
          </Hitbox>
          <p className="text-sm text-muted-foreground">{radius}</p>
        </div>
      ))}
    </div>
  )
}
