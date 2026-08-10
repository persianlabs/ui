"use client"

import type { WheelPickerOption } from "@workspace/ui/components/wheel-picker"
import {
  WheelPicker,
  WheelPickerWrapper,
} from "@workspace/ui/components/wheel-picker"

const hours = createOptions(12, 1)
const minutes = createOptions(60)
const periods: WheelPickerOption[] = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
]

export function WheelPickerDemoExample() {
  return (
    <WheelPickerWrapper>
      <WheelPicker options={hours} defaultValue={9} infinite />
      <WheelPicker options={minutes} defaultValue={30} infinite />
      <WheelPicker options={periods} defaultValue="AM" />
    </WheelPickerWrapper>
  )
}

function createOptions(length: number, add = 0): WheelPickerOption<number>[] {
  return Array.from({ length }, (_, index) => {
    const value = index + add
    return { label: value.toString().padStart(2, "0"), value }
  })
}
