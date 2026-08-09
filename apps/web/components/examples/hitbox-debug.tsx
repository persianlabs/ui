import { Checkbox } from "@workspace/ui/components/checkbox"
import { Hitbox } from "@workspace/ui/components/hitbox"

export function HitboxDebugExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <Hitbox debug={false}>
          <Checkbox />
        </Hitbox>
        <p className="text-sm text-muted-foreground">debug=false</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Hitbox debug>
          <Checkbox />
        </Hitbox>
        <p className="text-sm text-muted-foreground">debug=true</p>
      </div>
    </div>
  )
}
