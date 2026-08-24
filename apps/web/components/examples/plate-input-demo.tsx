"use client"

import { PlateInput } from "@workspace/ui/components/plate-input"

export function PlateInputDemoExample() {
  return (
    <PlateInput
      defaultValue={{
        twoDigit: "57",
        letter: "ا",
        threeDigit: "555",
        serial: "11",
      }}
    />
  )
}
