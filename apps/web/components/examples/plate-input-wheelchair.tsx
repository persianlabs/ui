"use client"

import {
  DISABLED_PLATE_LETTER,
  PlateInput,
} from "@workspace/ui/components/plate-input"

export function PlateInputWheelchairExample() {
  return <PlateInput defaultValue={{ letter: DISABLED_PLATE_LETTER }} />
}
