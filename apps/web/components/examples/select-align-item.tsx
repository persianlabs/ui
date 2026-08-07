"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]

export function SelectAlignItemExample() {
  const [alignItemWithTrigger, setAlignItemWithTrigger] = React.useState(true)

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setAlignItemWithTrigger((current) => !current)}
      >
        alignItemWithTrigger: {alignItemWithTrigger ? "true" : "false"}
      </Button>
      <Select defaultValue="Banana">
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={alignItemWithTrigger}>
          <SelectGroup>
            {fruits.map((fruit) => (
              <SelectItem key={fruit} value={fruit}>
                {fruit}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
