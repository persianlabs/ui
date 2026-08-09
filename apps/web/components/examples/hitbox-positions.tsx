import { Checkbox } from "@workspace/ui/components/checkbox"
import { Hitbox } from "@workspace/ui/components/hitbox"

const positions = [
  "all",
  "top",
  "bottom",
  "left",
  "right",
  "vertical",
  "horizontal",
] as const

export function HitboxPositionsExample() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
      {positions.map((position) => (
        <div key={position} className="flex flex-col items-center gap-4">
          <Hitbox position={position} debug>
            <Checkbox />
          </Hitbox>
          <p className="text-sm text-muted-foreground">{position}</p>
        </div>
      ))}
    </div>
  )
}
