"use client"

import { LockIcon, LockOpenIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

import {
  useLocks,
  type LockableParam,
} from "@/components/create/hooks/use-locks"

export function LockButton({
  param,
  className,
}: {
  param: LockableParam
  className?: string
}) {
  const { isLocked, toggleLock } = useLocks()
  const locked = isLocked(param)

  return (
    <button
      type="button"
      title={locked ? "Unlock" : "Lock"}
      aria-label={locked ? "Unlock" : "Lock"}
      onClick={() => toggleLock(param)}
      data-locked={locked}
      className={cn(
        "flex size-4 cursor-pointer items-center justify-center rounded opacity-0 ring-foreground/60 transition-opacity outline-none group-focus-within/picker:opacity-100 group-hover/picker:opacity-100 focus:opacity-100 focus-visible:ring-1 data-[locked=true]:opacity-100 pointer-coarse:hidden",
        className
      )}
    >
      <LockIcon
        strokeWidth={2}
        className={cn("size-5 text-foreground", !locked && "hidden")}
      />
      <LockOpenIcon
        strokeWidth={2}
        className={cn("size-5 text-foreground", locked && "hidden")}
      />
    </button>
  )
}
