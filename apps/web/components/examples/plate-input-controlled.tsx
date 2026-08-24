"use client"

import * as React from "react"

import {
  DEFAULT_PLATE_VALUE,
  PlateInput,
  type PlateValue,
} from "@workspace/ui/components/plate-input"

export function PlateInputControlledExample() {
  const [value, setValue] = React.useState<PlateValue>(DEFAULT_PLATE_VALUE)

  return (
    <div className="flex flex-col items-center gap-3">
      <PlateInput onValueChange={setValue} />
      <code
        dir="ltr"
        className="max-w-full truncate rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
      >
        {JSON.stringify(value)}
      </code>
    </div>
  )
}
