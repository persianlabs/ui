"use client"

import * as React from "react"

import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerRadioGroup,
  PickerRadioItem,
  PickerTrigger,
} from "@/components/create/picker"

// We build on top of shadcn's nova style — it's the only style for now,
// shown as the locked first row of the customizer like shadcn's.
const STYLES: { value: string; title: string }[] = [
  { value: "nova", title: "Nova" },
]

export function StylePicker() {
  return (
    <Picker>
      <PickerTrigger disabled>
        <div className="flex flex-col justify-start text-left">
          <div className="text-muted-foreground text-xs">Style</div>
          <div className="text-foreground text-sm font-medium">
            {STYLES[0]?.title}
          </div>
        </div>
      </PickerTrigger>
      <PickerContent side="right" align="start">
        <PickerRadioGroup value="nova">
          <PickerGroup>
            {STYLES.map((style) => (
              <PickerRadioItem key={style.value} value={style.value}>
                {style.title}
              </PickerRadioItem>
            ))}
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
  )
}
