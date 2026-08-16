"use client"

import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"
import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TOAST_ICONS = {
  success: CircleCheckIcon,
  info: InfoIcon,
  warning: TriangleAlertIcon,
  error: CircleAlertIcon,
  loading: Loader2Icon,
} as const

type ToastStatus = keyof typeof TOAST_ICONS

type SwipeDirection = "up" | "down" | "left" | "right"

type ToastVariant = "default" | "x"

interface ToastData {
  /** Visual style of the toast. Set per-toast via `toastManager.add({ data: { variant: "x" } })`. */
  variant?: ToastVariant
  /** Avatar/icon rendered in the `x` variant instead of the status icon. */
  avatar?: React.ReactNode
  /**
   * Forces this toast's own content direction, overriding the ambient
   * direction the provider otherwise measures automatically. Only affects
   * this toast's Root (text/logical spacing) — the stack's corner position
   * still follows the provider's ambient/measured direction.
   */
  dir?: "ltr" | "rtl"
  rootProps?: Omit<
    React.ComponentProps<typeof ToastPrimitive.Root>,
    "children" | "className" | "swipeDirection" | "toast"
  >
}

type ManagedToast = ReturnType<
  typeof ToastPrimitive.useToastManager
>["toasts"][number]

/**
 * Logical viewport corners — `start`/`end` follow reading direction instead
 * of a hardcoded screen side, so `bottom-end` lands bottom-right in LTR and
 * bottom-left in RTL. Resolved to a physical position at render time by
 * `ToastProvider`/`AnchoredToastProvider`, which track the ambient direction
 * (see the dir-tracking note below).
 */
export type ToastPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end"

type PhysicalToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

function resolveToastPosition(
  position: ToastPosition,
  dir: "ltr" | "rtl"
): PhysicalToastPosition {
  const [vertical, horizontal] = position.split("-") as [
    "top" | "bottom",
    "start" | "center" | "end",
  ]

  if (horizontal === "center") {
    return `${vertical}-center`
  }

  const isStart = horizontal === "start"
  const isPhysicalRight =
    (isStart && dir === "rtl") || (!isStart && dir === "ltr")

  return `${vertical}-${isPhysicalRight ? "right" : "left"}`
}

function getSwipeDirection(position: PhysicalToastPosition): SwipeDirection[] {
  const vertical: SwipeDirection = position.startsWith("top") ? "up" : "down"

  if (position.includes("center")) return [vertical]
  if (position.includes("left")) return ["left", vertical]
  return ["right", vertical]
}

function statusIconColor(type?: string) {
  switch (type) {
    case "success":
      return "text-success"
    case "info":
      return "text-info"
    case "warning":
      return "text-warning"
    case "error":
      return "text-destructive"
    default:
      return undefined
  }
}

function toastAppearance(variant: ToastVariant) {
  switch (variant) {
    case "x":
      return "rounded-full border-0 bg-neutral-900 text-white shadow-[var(--shadow-elevation-lg)] before:hidden dark:bg-neutral-50 dark:text-neutral-900"
    default:
      return "rounded-2xl border bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(1%*max(0,var(--toast-index,0))))] text-popover-foreground not-dark:bg-clip-padding shadow-[var(--shadow-elevation-md)] before:hidden data-expanded:bg-popover dark:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(6%*max(0,var(--toast-index,0))))] dark:data-expanded:bg-popover"
  }
}

const TOAST_ROOT_BASE = cn(
  "absolute z-[calc(9999-var(--toast-index))] h-(--toast-calc-height) w-full origin-[50%_0%] outline-none select-none [transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s,background-color_.5s]",
  "before:pointer-events-none before:absolute before:inset-0",
  // Horizontal positioning
  "data-[position*=right]:right-0 data-[position*=right]:left-auto",
  "data-[position*=left]:right-auto data-[position*=left]:left-0",
  "data-[position*=center]:right-0 data-[position*=center]:left-0",
  // Vertical positioning + stack origin
  "data-[position*=top]:top-0 data-[position*=top]:bottom-auto data-[position*=top]:origin-[50%_calc(50%-50%*min(var(--toast-index,0),1))]",
  "data-[position*=bottom]:top-auto data-[position*=bottom]:bottom-0 data-[position*=bottom]:origin-[50%_calc(50%+50%*min(var(--toast-index,0),1))]",
  // Gap fill so hovering the space between stacked toasts still counts as "hovering"
  "after:pointer-events-none after:absolute after:inset-x-0 after:h-[calc(var(--toast-gap)+1px)]",
  "data-[position*=bottom]:after:bottom-full data-[position*=top]:after:top-full",
  // Stack variables
  "[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))] [--toast-gap:--spacing(3)] [--toast-peek:--spacing(3)] [--toast-scale:calc(max(0,1-(var(--toast-index)*.1)))] [--toast-shrink:calc(1-var(--toast-scale))]",
  "data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]",
  "data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]",
  // Default (collapsed stack) transform
  "data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
  "data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
  // Limited / expanded
  "data-expanded:h-(--toast-height) data-limited:opacity-0",
  "data-position:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]",
  // Starting / ending animations
  "data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))]",
  "data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]",
  "data-ending-style:opacity-0",
  "data-[position*=top]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(-100%-var(--toast-inset)))]",
  "data-[position*=bottom]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))]",
  "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
  "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
  "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
  "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
  "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
  "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
  "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
  "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]"
)

const ANCHORED_ROOT_BASE =
  "relative z-50 max-w-[min(--spacing(72),var(--available-width))] text-start text-balance outline-none transition-[scale,opacity] data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0"

/**
 * Both providers render through a Portal, so their content doesn't inherit
 * `dir` from a nearby wrapper (only from document.documentElement). Each
 * provider wraps its (non-portaled) children in a zero-box `<span>` and
 * measures the ambient CSS direction there, then pushes it explicitly onto
 * the portaled Viewport/Positioner so logical spacing and swipe-to-dismiss
 * direction resolve correctly even when the provider itself sits in an
 * otherwise-LTR page.
 */
function useAmbientDir() {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")
  const anchorRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    function update() {
      if (!anchorRef.current) return
      setDir(
        getComputedStyle(anchorRef.current).direction === "rtl" ? "rtl" : "ltr"
      )
    }

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return { dir, anchorRef }
}

function ToastBody({
  toast,
  variant,
}: {
  toast: ManagedToast
  variant: ToastVariant
}) {
  const data = toast.data as ToastData | undefined
  const Icon = toast.type ? TOAST_ICONS[toast.type as ToastStatus] : undefined

  if (variant === "x") {
    return (
      <ToastPrimitive.Content
        data-slot="toast-content"
        className="pointer-events-auto flex items-start gap-2.5 overflow-hidden py-2.5 ps-2.5 pe-3 text-sm transition-opacity duration-250 data-behind:opacity-0 data-expanded:opacity-100"
      >
        <span className="flex size-9 shrink-0 items-center justify-center self-center overflow-hidden rounded-full bg-white/10 dark:bg-neutral-900/10 [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-4">
          {data?.avatar ??
            (Icon && (
              <Icon
                className={cn(
                  "in-data-[type=loading]:animate-spin",
                  statusIconColor(toast.type)
                )}
              />
            ))}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <ToastPrimitive.Title
            data-slot="toast-title"
            className="truncate text-sm font-semibold"
          />
          <ToastPrimitive.Description
            data-slot="toast-description"
            className="truncate text-xs text-white/60 dark:text-neutral-900/60"
          />
        </div>
        <ToastPrimitive.Action
          data-slot="toast-action"
          render={
            <button
              type="button"
              className={cn(
                buttonVariants({ size: "xs" }),
                "shrink-0 bg-white text-neutral-900 hover:bg-white/90 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-900/90"
              )}
            />
          }
        />
        <ToastPrimitive.Close
          aria-label="Close toast"
          data-slot="toast-close"
          render={<button type="button" />}
          className="relative shrink-0 self-center rounded-full p-1 text-white/60 after:absolute after:-inset-2 after:content-[''] hover:bg-white/10 hover:text-white dark:text-neutral-900/60 dark:hover:bg-neutral-900/10 dark:hover:text-neutral-900"
        >
          <XIcon className="size-3.5" />
        </ToastPrimitive.Close>
      </ToastPrimitive.Content>
    )
  }

  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className="pointer-events-auto flex items-start gap-3 overflow-hidden p-4 text-sm transition-opacity duration-250 data-behind:opacity-0 data-expanded:opacity-100"
    >
      {Icon && (
        <span
          data-slot="toast-icon"
          className="mt-0.5 shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
        >
          <Icon
            className={cn(
              "in-data-[type=loading]:animate-spin",
              statusIconColor(toast.type)
            )}
          />
        </span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <ToastPrimitive.Title
          data-slot="toast-title"
          className="text-sm font-medium"
        />
        <ToastPrimitive.Description
          data-slot="toast-description"
          className="text-sm text-muted-foreground"
        />
      </div>
      <ToastPrimitive.Action
        data-slot="toast-action"
        render={<Button variant="outline" size="xs" />}
        className="shrink-0"
      />
      <ToastPrimitive.Close
        aria-label="Close toast"
        data-slot="toast-close"
        render={<Button variant="ghost" size="icon-xs" />}
        className="relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground"
      >
        <XIcon />
      </ToastPrimitive.Close>
    </ToastPrimitive.Content>
  )
}

/**
 * Anchored toasts are tooltip-like confirmations next to the element that
 * triggered them, so they stay deliberately tiny — no action or close
 * button, just an icon/avatar and title/description at a compact size.
 */
function AnchoredToastBody({
  toast,
  variant,
}: {
  toast: ManagedToast
  variant: ToastVariant
}) {
  const data = toast.data as ToastData | undefined
  const Icon = toast.type ? TOAST_ICONS[toast.type as ToastStatus] : undefined

  if (variant === "x") {
    return (
      <ToastPrimitive.Content
        data-slot="toast-content"
        className="pointer-events-auto flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-xs transition-opacity duration-250 data-behind:opacity-0 data-expanded:opacity-100"
      >
        <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 dark:bg-neutral-900/10 [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-3">
          {data?.avatar ??
            (Icon && (
              <Icon
                className={cn(
                  "in-data-[type=loading]:animate-spin",
                  statusIconColor(toast.type)
                )}
              />
            ))}
        </span>
        <div className="flex min-w-0 flex-col">
          <ToastPrimitive.Title
            data-slot="toast-title"
            className="truncate text-xs font-semibold"
          />
          <ToastPrimitive.Description
            data-slot="toast-description"
            className="truncate text-[11px] text-white/60 dark:text-neutral-900/60"
          />
        </div>
      </ToastPrimitive.Content>
    )
  }

  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className="pointer-events-auto flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-xs transition-opacity duration-250 data-behind:opacity-0 data-expanded:opacity-100"
    >
      {Icon && (
        <span
          data-slot="toast-icon"
          className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5"
        >
          <Icon
            className={cn(
              "in-data-[type=loading]:animate-spin",
              statusIconColor(toast.type)
            )}
          />
        </span>
      )}
      <div className="flex min-w-0 flex-col">
        <ToastPrimitive.Title
          data-slot="toast-title"
          className="text-xs font-medium"
        />
        <ToastPrimitive.Description
          data-slot="toast-description"
          className="text-[11px] text-muted-foreground"
        />
      </div>
    </ToastPrimitive.Content>
  )
}

function Toasts({
  position = "bottom-end",
  dir = "ltr",
  portalProps,
}: {
  position?: ToastPosition
  dir?: "ltr" | "rtl"
  portalProps?: ToastPrimitive.Portal.Props
}) {
  const { toasts } = ToastPrimitive.useToastManager()
  const physicalPosition = resolveToastPosition(position, dir)
  const swipeDirection = getSwipeDirection(physicalPosition)

  return (
    <ToastPrimitive.Portal data-slot="toast-portal" {...portalProps}>
      <ToastPrimitive.Viewport
        dir={dir}
        data-slot="toast-viewport"
        data-position={physicalPosition}
        className={cn(
          "pointer-events-none fixed z-60 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-90 [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(8)]",
          "data-[position*=top]:top-(--toast-inset)",
          "data-[position*=bottom]:bottom-(--toast-inset)",
          "data-[position*=left]:left-(--toast-inset)",
          "data-[position*=right]:right-(--toast-inset)",
          "data-[position*=center]:left-1/2 data-[position*=center]:-translate-x-1/2"
        )}
      >
        {toasts.map((toastItem) => {
          const data = toastItem.data as ToastData | undefined
          const variant = data?.variant ?? "default"
          const toastDir = data?.dir ?? dir

          return (
            <ToastPrimitive.Root
              key={toastItem.id}
              dir={toastDir}
              data-slot="toast"
              data-position={physicalPosition}
              data-variant={variant}
              swipeDirection={swipeDirection}
              toast={toastItem}
              className={cn(TOAST_ROOT_BASE, toastAppearance(variant))}
              {...data?.rootProps}
            >
              <ToastBody toast={toastItem} variant={variant} />
            </ToastPrimitive.Root>
          )
        })}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  )
}

function AnchoredToasts({
  dir = "ltr",
  portalProps,
}: {
  dir?: "ltr" | "rtl"
  portalProps?: ToastPrimitive.Portal.Props
}) {
  const { toasts } = ToastPrimitive.useToastManager()

  return (
    <ToastPrimitive.Portal data-slot="toast-portal-anchored" {...portalProps}>
      <ToastPrimitive.Viewport
        dir={dir}
        data-slot="toast-viewport-anchored"
        className="outline-none"
      >
        {toasts.map((toastItem) => {
          const data = toastItem.data as ToastData | undefined
          const variant = data?.variant ?? "default"
          const toastDir = data?.dir ?? dir
          const positionerProps = toastItem.positionerProps

          if (!positionerProps?.anchor) {
            return null
          }

          return (
            <ToastPrimitive.Positioner
              key={toastItem.id}
              data-slot="toast-positioner"
              dir={dir}
              side="bottom"
              sideOffset={8}
              align="center"
              className="z-50"
              toast={toastItem}
              {...positionerProps}
            >
              <ToastPrimitive.Root
                dir={toastDir}
                data-slot="toast-popup"
                data-variant={variant}
                toast={toastItem}
                className={cn(ANCHORED_ROOT_BASE, toastAppearance(variant))}
                {...data?.rootProps}
              >
                <ToastBody toast={toastItem} variant={variant} />
              </ToastPrimitive.Root>
            </ToastPrimitive.Positioner>
          )
        })}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  )
}

export const toastManager: ReturnType<
  typeof ToastPrimitive.createToastManager
> = ToastPrimitive.createToastManager()

export const anchoredToastManager: ReturnType<
  typeof ToastPrimitive.createToastManager
> = ToastPrimitive.createToastManager()

export interface ToastProviderProps extends ToastPrimitive.Provider.Props {
  /** Which corner the toasts stack in. `start`/`end` follow reading direction. @default "bottom-end" */
  position?: ToastPosition
  portalProps?: ToastPrimitive.Portal.Props
}

function ToastProvider({
  children,
  position = "bottom-end",
  portalProps,
  toastManager: manager = toastManager,
  ...props
}: ToastProviderProps) {
  const { dir, anchorRef } = useAmbientDir()

  return (
    <ToastPrimitive.Provider toastManager={manager} {...props}>
      <span
        ref={anchorRef}
        data-slot="toast-dir-anchor"
        style={{ display: "contents" }}
      >
        {children}
      </span>
      <Toasts position={position} dir={dir} portalProps={portalProps} />
    </ToastPrimitive.Provider>
  )
}

export interface AnchoredToastProviderProps
  extends ToastPrimitive.Provider.Props {
  portalProps?: ToastPrimitive.Portal.Props
}

function AnchoredToastProvider({
  children,
  portalProps,
  toastManager: manager = anchoredToastManager,
  ...props
}: AnchoredToastProviderProps) {
  const { dir, anchorRef } = useAmbientDir()

  return (
    <ToastPrimitive.Provider toastManager={manager} {...props}>
      <span
        ref={anchorRef}
        data-slot="toast-dir-anchor"
        style={{ display: "contents" }}
      >
        {children}
      </span>
      <AnchoredToasts dir={dir} portalProps={portalProps} />
    </ToastPrimitive.Provider>
  )
}

export { ToastPrimitive }
export { ToastProvider, AnchoredToastProvider }
