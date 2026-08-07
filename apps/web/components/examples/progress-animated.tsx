"use client"

import * as React from "react"

import { Progress } from "@workspace/ui/components/progress"

export function ProgressAnimatedExample() {
  const [value, setValue] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={value} className="w-64" />
}
