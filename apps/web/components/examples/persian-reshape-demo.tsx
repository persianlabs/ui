"use client"

import * as React from "react"

import { Input } from "@workspace/ui/components/input"
import { reshapePersian } from "@workspace/ui/lib/persian-reshape"

/**
 * Disabling ligatures/contextual-alternates is what makes a real browser
 * render Persian text the same broken, disconnected way Satori does — this
 * is the "before" simulation, with no image generation involved.
 */
const noShapeStyle: React.CSSProperties = {
  fontFeatureSettings: '"liga" 0, "clig" 0, "calt" 0, "rlig" 0',
  fontVariantLigatures: "none",
}

export function PersianReshapeDemoExample() {
  const [value, setValue] = React.useState("راهنمای خرید")

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Input
        dir="rtl"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="متن فارسی..."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-[#191817] p-4">
          <p className="mb-2 text-[10px] font-medium tracking-wide text-white/40 uppercase">
            Before — raw Satori
          </p>
          <p
            dir="rtl"
            className="min-h-7 text-lg text-white"
            style={noShapeStyle}
          >
            {value || " "}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-[#191817] p-4">
          <p className="mb-2 text-[10px] font-medium tracking-wide text-white/40 uppercase">
            After — reshapePersian
          </p>
          <p
            dir="rtl"
            className="min-h-7 text-lg text-white"
            style={noShapeStyle}
          >
            {reshapePersian(value) || " "}
          </p>
        </div>
      </div>
    </div>
  )
}
