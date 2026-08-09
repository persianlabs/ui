"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { useControllableState } from "@workspace/ui/hooks/use-controllable-state"

function Counter({
  value,
  defaultValue = 0,
  onValueChange,
}: {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
}) {
  const [count, setCount] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: "Counter",
  })

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => setCount((current) => current - 1)}
      >
        -
      </Button>
      <span className="w-6 text-center font-mono text-sm">{count}</span>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => setCount((current) => current + 1)}
      >
        +
      </Button>
    </div>
  )
}

export function UseControllableStateDemoExample() {
  const [controlledValue, setControlledValue] = React.useState(5)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">
          Uncontrolled — Counter owns its own state
        </span>
        <Counter defaultValue={3} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">
          Controlled — parent state is {controlledValue}
        </span>
        <Counter value={controlledValue} onValueChange={setControlledValue} />
      </div>
    </div>
  )
}
