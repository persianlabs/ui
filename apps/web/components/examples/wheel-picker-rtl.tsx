"use client"

import type { WheelPickerOption } from "@workspace/ui/components/wheel-picker"
import {
  WheelPicker,
  WheelPickerWrapper,
} from "@workspace/ui/components/wheel-picker"

const months: WheelPickerOption[] = [
  { label: "فروردین", value: "farvardin" },
  { label: "اردیبهشت", value: "ordibehesht" },
  { label: "خرداد", value: "khordad" },
  { label: "تیر", value: "tir" },
  { label: "مرداد", value: "mordad" },
]

export function WheelPickerRtlExample() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">
        ماه مورد نظر را انتخاب کنید
      </p>
      <WheelPickerWrapper>
        <WheelPicker options={months} defaultValue="ordibehesht" />
      </WheelPickerWrapper>
    </div>
  )
}
