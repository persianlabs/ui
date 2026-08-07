import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/** Keyboard shortcuts are always Latin characters, so they read left-to-right in Geist Mono even inside an RTL page. */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      dir="ltr"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-[family-name:var(--font-geist-mono)] text-[0.7rem] font-medium select-none",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
