"use client"

import { Check, Copy } from "lucide"
import { MorphIcon } from "morphicons/react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AnchoredToastProvider, ToastPrimitive } from "@/components/ui/toast"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { cn } from "@/lib/utils"

export interface CopyStateIconProps {
  copied: boolean
  idleIcon?: React.ReactNode
  doneIcon?: React.ReactNode
}

export function CopyStateIcon({
  copied,
  idleIcon,
  doneIcon,
}: CopyStateIconProps) {
  if (!copied && idleIcon) return idleIcon
  if (copied && doneIcon) return doneIcon

  return (
    <MorphIcon
      icon={copied ? Check : Copy}
      spring="snappy"
      className="size-4"
    />
  )
}

export interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  text: string | (() => string)
  label?: string
  /**
   * Toast manager the "copied" feedback anchors to. By default CopyButton
   * brings its own manager and provider, so it works with zero setup. Pass
   * your app's own manager (alongside a matching ancestor
   * `AnchoredToastProvider`) only if you want this button's confirmation to
   * share state with other anchored toasts elsewhere on the page.
   */
  toastManager?: ReturnType<typeof ToastPrimitive.createToastManager>
  /** Which side of the button the confirmation toast anchors to. @default "top" */
  side?: NonNullable<ToastPrimitive.Positioner.Props["side"]>
  onCopySuccess?: (text: string) => void
  idleIcon?: React.ReactNode
  doneIcon?: React.ReactNode
}

/**
 * An icon button that copies `text` to the clipboard, morphs its icon to
 * reflect the result, and anchors a toast to itself confirming the copy —
 * self-contained, no `AnchoredToastProvider` wrapper needed.
 */
export function CopyButton({
  className,
  size = "icon",
  children,
  text,
  label = "کپی",
  toastManager,
  side = "top",
  idleIcon,
  doneIcon,
  onClick,
  onCopySuccess,
  ...props
}: CopyButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const pendingValue = React.useRef("")
  const timeout = 2000
  const ownManager = React.useMemo(
    () => ToastPrimitive.createToastManager(),
    []
  )
  const manager = toastManager ?? ownManager

  const { copyToClipboard, isCopied } = useCopyToClipboard({
    timeout,
    onCopy: () => {
      if (ref.current) {
        manager.add({
          title: "کپی شد!",
          timeout,
          positionerProps: { anchor: ref.current, side },
        })
      }
      onCopySuccess?.(pendingValue.current)
    },
  })

  const button = (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            ref={ref}
            className={cn("will-change-transform", className)}
            size={size}
            aria-label={label}
            onClick={(event) => {
              const value = typeof text === "function" ? text() : text
              pendingValue.current = value
              copyToClipboard(value)
              onClick?.(event)
            }}
            {...props}
          >
            <CopyStateIcon
              copied={isCopied}
              idleIcon={idleIcon}
              doneIcon={doneIcon}
            />
            {children}
          </Button>
        }
      />
      <TooltipContent sideOffset={8}>{label}</TooltipContent>
    </Tooltip>
  )

  if (toastManager) {
    return button
  }

  return (
    <AnchoredToastProvider toastManager={ownManager}>
      {button}
    </AnchoredToastProvider>
  )
}
