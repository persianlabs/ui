import type * as React from "react"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { Hitbox } from "@workspace/ui/components/hitbox"

export function HitboxDemoExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <HitboxExample label="Default size">
        <Hitbox debug>
          <Checkbox />
        </Hitbox>
      </HitboxExample>
      <HitboxExample label="Full radius">
        <Hitbox radius="full" debug>
          <Checkbox />
        </Hitbox>
      </HitboxExample>
      <HitboxExample label="Bottom position">
        <Hitbox position="bottom" debug>
          <Checkbox />
        </Hitbox>
      </HitboxExample>
    </div>
  )
}

function HitboxExample({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      {children}
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
