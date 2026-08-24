"use client"

import { CheckIcon } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react"
import { useEffect } from "react"
import type * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Spinner } from "@workspace/ui/components/spinner"
import { useControllableState } from "@workspace/ui/hooks/use-controllable-state"
import { cn } from "@workspace/ui/lib/utils"

export type ButtonStatus = "idle" | "loading" | "success"

const DEFAULT_SUCCESS_DURATION = 1500

const swapVariants: Variants = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
}

const reducedMotionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

// A spring keeps its velocity when the status changes mid-swap; a cubic-bezier
// would restart from zero.
const swapTransition: Transition = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
}

// Bounce only on the entrance, and only on movement: opacity and blur would
// overshoot.
const successVariants: Variants = {
  ...swapVariants,
  animate: {
    ...swapVariants.animate,
    transition: {
      type: "spring",
      duration: 0.45,
      bounce: 0.35,
      opacity: swapTransition,
      filter: swapTransition,
    },
  },
}

export type StatusButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "onClick" | "children" | "loading"
> & {
  children: React.ReactNode
  /**
   * Uncontrolled mode: loading while the returned promise is pending, then
   * success. Omit it when the form owns the submission.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  /** Controlled mode, e.g. derived from `useActionState`. */
  status?: ButtonStatus
  /** Also called for the automatic return to idle after `successDuration`. */
  onStatusChange?: (status: ButtonStatus) => void
  /** Shown next to the check icon, e.g. "Submitted" for a "Submit" button. */
  successLabel?: React.ReactNode
  successDuration?: number
}

export function StatusButton({
  children,
  className,
  onClick,
  status: statusProp,
  onStatusChange,
  successLabel,
  successDuration = DEFAULT_SUCCESS_DURATION,
  ...props
}: StatusButtonProps) {
  const [status, setStatus] = useControllableState({
    prop: statusProp,
    defaultProp: "idle",
    onChange: onStatusChange,
    caller: "StatusButton",
  })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (status !== "success") return

    const timeoutId = window.setTimeout(
      () => setStatus("idle"),
      successDuration
    )
    return () => window.clearTimeout(timeoutId)
  }, [status, successDuration, setStatus])

  const isBusy = status !== "idle"

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isBusy) {
      event.preventDefault()
      return
    }

    if (!onClick) return

    setStatus("loading")

    try {
      await onClick(event)
      setStatus("success")
    } catch (error) {
      setStatus("idle")
      throw error
    }
  }

  const variants = shouldReduceMotion ? reducedMotionVariants : swapVariants
  const transition = shouldReduceMotion ? { duration: 0 } : swapTransition

  const successContent = (
    <>
      <CheckIcon />
      {successLabel ?? <span className="sr-only">Success</span>}
    </>
  )

  return (
    <Button
      data-status={status}
      aria-busy={status === "loading"}
      // Not `disabled`: busy keeps focus and the normal look, and the click
      // handler ignores presses meanwhile.
      aria-disabled={isBusy || undefined}
      onClick={handleClick}
      className={cn(
        "inline-grid justify-items-center *:col-start-1 *:row-start-1 *:flex *:items-center *:gap-[inherit]",
        className
      )}
      {...props}
    >
      {/* Invisible copies of the widest states keep the button's width fixed. */}
      <span aria-hidden className="invisible">
        {children}
      </span>
      <span aria-hidden className="invisible">
        {successContent}
      </span>

      <AnimatePresence initial={false}>
        {status === "idle" && (
          <motion.span
            key="idle"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            {children}
          </motion.span>
        )}

        {status === "loading" && (
          <motion.span
            key="loading"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            <Spinner />
          </motion.span>
        )}

        {status === "success" && (
          <motion.span
            key="success"
            role="status"
            variants={shouldReduceMotion ? variants : successVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            {successContent}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}
