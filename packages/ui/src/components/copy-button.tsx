"use client"

import { CheckIcon, CopyIcon, XCircleIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import {
  AnchoredToastProvider,
  ToastPrimitive,
} from "@workspace/ui/components/toast"
import type { CopyState } from "@workspace/ui/hooks/use-copy-to-clipboard"
import { useCopyToClipboard } from "@workspace/ui/hooks/use-copy-to-clipboard"
import { cn } from "@workspace/ui/lib/utils"

function IconSwap({ children }: React.PropsWithChildren) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {children}
    </AnimatePresence>
  )
}

function IconSwapItem({
  className,
  ...props
}: React.ComponentProps<typeof motion.span>) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      className={cn("flex items-center justify-center", className)}
      {...props}
    />
  )
}

export interface CopyStateIconProps {
  state: CopyState
  idleIcon?: React.ReactNode
  doneIcon?: React.ReactNode
  errorIcon?: React.ReactNode
}

export function CopyStateIcon({
  state,
  idleIcon,
  doneIcon,
  errorIcon,
}: CopyStateIconProps) {
  return (
    <IconSwap>
      <IconSwapItem key={state}>
        {state === "idle" && (idleIcon ?? <CopyIcon className="size-4" />)}
        {state === "done" && (doneIcon ?? <CheckIcon className="size-4" />)}
        {state === "error" &&
          (errorIcon ?? <XCircleIcon className="size-4" />)}
      </IconSwapItem>
    </IconSwap>
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
  onCopyError?: (error: Error) => void
  idleIcon?: React.ReactNode
  doneIcon?: React.ReactNode
  errorIcon?: React.ReactNode
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
  errorIcon,
  onClick,
  onCopySuccess,
  onCopyError,
  ...props
}: CopyButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const timeout = 2000
  const ownManager = React.useMemo(
    () => ToastPrimitive.createToastManager(),
    []
  )
  const manager = toastManager ?? ownManager

  const { state, copy } = useCopyToClipboard({
    resetDelay: timeout,
    onCopySuccess: (copied) => {
      if (ref.current) {
        manager.add({
          title: "کپی شد!",
          timeout,
          positionerProps: { anchor: ref.current, side },
        })
      }
      onCopySuccess?.(copied)
    },
    onCopyError: (error) => {
      if (ref.current) {
        manager.add({
          title: "خطا در کپی",
          type: "error",
          timeout,
          positionerProps: { anchor: ref.current, side },
        })
      }
      onCopyError?.(error)
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
              copy(typeof text === "function" ? text() : text)
              onClick?.(event)
            }}
            {...props}
          >
            <CopyStateIcon
              state={state}
              idleIcon={idleIcon}
              doneIcon={doneIcon}
              errorIcon={errorIcon}
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
