"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { usePresetCode } from "@/components/create/hooks/use-preset-code"

// Simplified from the shadcn OpenPreset dialog: opens the current preset in
// a new tab instead of pasting a preset code.
export function OpenPreset({
  className,
  label = "Open Preset",
}: React.ComponentProps<typeof Button> & {
  label?: string
}) {
  const presetCode = usePresetCode()

  return (
    <Button
      variant="outline"
      onClick={() =>
        window.open(`/create?preset=${presetCode}`, "_blank", "noopener")
      }
      title={`--preset ${presetCode}`}
      className={cn(
        "touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!",
        className
      )}
    >
      <span className="block min-w-0 truncate">{label}</span>
    </Button>
  )
}
