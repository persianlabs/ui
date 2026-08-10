"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { mergeProps } from "@base-ui/react/merge-props"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { useRender } from "@base-ui/react/use-render"
import { CheckIcon, ChevronRightIcon, XIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const DrawerCreateHandle: typeof DrawerPrimitive.createHandle =
  DrawerPrimitive.createHandle

type DrawerPosition = "right" | "left" | "top" | "bottom" | "start" | "end"
type PhysicalDrawerPosition = "right" | "left" | "top" | "bottom"

/**
 * DrawerPopup renders through a Portal, so it doesn't inherit `dir` from a
 * nearby wrapper (only from document.documentElement). DrawerTrigger
 * measures the ambient direction where it's actually rendered and pushes it
 * here so a logical position="start"/"end" resolves to the correct physical
 * edge, and so the portaled content picks up the right text direction.
 */
const DrawerDirContext = React.createContext<{
  dir: "ltr" | "rtl"
  setDir: (dir: "ltr" | "rtl") => void
}>({ dir: "ltr", setDir: () => {} })

const DrawerPositionContext = React.createContext<{ position: DrawerPosition }>(
  { position: "bottom" }
)
const DrawerPopupVariantContext = React.createContext<
  "default" | "straight" | "inset"
>("default")

function resolvePosition(
  position: DrawerPosition,
  dir: "ltr" | "rtl"
): PhysicalDrawerPosition {
  if (position === "start") return dir === "rtl" ? "right" : "left"
  if (position === "end") return dir === "rtl" ? "left" : "right"
  return position
}

function useResolvedDrawerPosition(
  positionProp?: DrawerPosition
): PhysicalDrawerPosition {
  const { position: contextPosition } = React.useContext(DrawerPositionContext)
  const { dir } = React.useContext(DrawerDirContext)
  return resolvePosition(positionProp ?? contextPosition, dir)
}

const directionMap: Record<
  PhysicalDrawerPosition,
  DrawerPrimitive.Root.Props["swipeDirection"]
> = {
  bottom: "down",
  left: "left",
  right: "right",
  top: "up",
}

function now(): number {
  return typeof performance !== "undefined" ? performance.now() : Date.now()
}

function Drawer({
  swipeDirection,
  position = "bottom",
  onOpenChange,
  open,
  ...props
}: DrawerPrimitive.Root.Props & {
  position?: DrawerPosition
}) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")
  const dirContextValue = React.useMemo(() => ({ dir, setDir }), [dir])
  const positionContextValue = React.useMemo(() => ({ position }), [position])
  const resolvedPosition = resolvePosition(position, dir)

  // Guard against a spurious "open then instantly dismiss" that appears as the
  // drawer flashing with no animation. In re-render-heavy apps, the
  // interaction that opens the drawer can produce a follow-up click that Base
  // UI catches as an outside-press and closes it in the same tick. Detected
  // by timing: a real outside-press happens well after opening, so any
  // outside-press within a short window of opening is treated as the bogus
  // self-close and cancelled. Later outside-presses still dismiss normally.
  const openedAtRef = React.useRef(0)
  React.useEffect(() => {
    if (open) openedAtRef.current = now()
  }, [open])

  return (
    <DrawerDirContext.Provider value={dirContextValue}>
      <DrawerPositionContext.Provider value={positionContextValue}>
        <DrawerPrimitive.Root
          open={open}
          swipeDirection={swipeDirection ?? directionMap[resolvedPosition]}
          onOpenChange={(open, details) => {
            if (open) {
              openedAtRef.current = now()
            } else if (details?.reason === "outside-press") {
              if (now() - openedAtRef.current < 200) {
                details.cancel?.()
                return
              }
            }
            onOpenChange?.(open, details)
          }}
          {...props}
        />
      </DrawerPositionContext.Provider>
    </DrawerDirContext.Provider>
  )
}

const DrawerPortal = DrawerPrimitive.Portal

function DrawerTrigger({ className, ...props }: DrawerPrimitive.Trigger.Props) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const { setDir } = React.useContext(DrawerDirContext)

  React.useEffect(() => {
    function update() {
      if (!ref.current) return
      setDir(getComputedStyle(ref.current).direction === "rtl" ? "rtl" : "ltr")
    }

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
      subtree: true,
    })

    return () => observer.disconnect()
  }, [setDir])

  return (
    <DrawerPrimitive.Trigger
      ref={ref}
      data-slot="drawer-trigger"
      className={className}
      {...props}
    />
  )
}

function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerSwipeArea({
  className,
  position: positionProp,
  ...props
}: DrawerPrimitive.SwipeArea.Props & {
  position?: DrawerPosition
}) {
  const position = useResolvedDrawerPosition(positionProp)

  return (
    <DrawerPrimitive.SwipeArea
      data-slot="drawer-swipe-area"
      className={cn(
        "fixed z-50 touch-none",
        position === "bottom" && "inset-x-0 bottom-0 h-8",
        position === "top" && "inset-x-0 top-0 h-8",
        position === "left" && "inset-y-0 left-0 w-8",
        position === "right" && "inset-y-0 right-0 w-8",
        className
      )}
      {...props}
    />
  )
}

function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={cn(
        "fixed inset-0 z-50 bg-black/45 opacity-[calc(1-var(--drawer-swipe-progress))] backdrop-blur-md transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute",
        className
      )}
      {...props}
    />
  )
}

function DrawerViewport({
  className,
  position: positionProp,
  variant = "default",
  ...props
}: DrawerPrimitive.Viewport.Props & {
  position?: DrawerPosition
  variant?: "default" | "straight" | "inset"
}) {
  const { dir } = React.useContext(DrawerDirContext)
  const position = useResolvedDrawerPosition(positionProp)

  return (
    <DrawerPrimitive.Viewport
      dir={dir}
      data-slot="drawer-viewport"
      className={cn(
        // `--inset` feeds the popup's enter/exit transform
        // `translateY(calc(100% + env(...) + var(--inset)))`. It MUST carry a
        // length unit: Tailwind ≥4.3.1 compiles `--spacing(0)` to a unitless
        // `0`, which makes that calc invalid (`length + 0`) so the transform
        // resolves to `none` and the drawer stops animating. Use `0px`.
        "fixed inset-0 z-50 [--bleed:--spacing(12)] [--inset:0px]",
        "touch-none",
        // flex + align to an edge, not CSS grid: with snapPoints, the popup's
        // own max-height (see DrawerPopup) clamps its border-box, and
        // padding-bottom eats into that clamped box to leave only the
        // snapped-to amount of content visible before translateY pushes the
        // rest off-screen. That box-model interaction needs the popup to
        // just be a normal flex item pinned to an edge — a grid "auto" row
        // sizes itself from the popup's un-padded content instead, which
        // left snap points with nothing to shrink against.
        position === "bottom" && "flex items-end justify-center pt-12",
        position === "top" && "flex items-start justify-center pb-12",
        // justify-start/justify-end (flex-start/flex-end) are direction-
        // sensitive and reverse once `dir="rtl"` is set below, undoing the
        // physical position this branch already resolved to. The CSS
        // `justify-content: left`/`right` keywords stay physical regardless
        // of writing direction — but they aren't part of Tailwind's
        // justify-content value scale, so the value-only `justify-[right]`
        // shorthand silently fails to generate a rule. The full arbitrary
        // property syntax below works.
        position === "left" && "flex [justify-content:left]",
        position === "right" && "flex [justify-content:right]",
        variant === "inset" && "px-(--inset) sm:[--inset:--spacing(4)]",
        variant === "inset" && position !== "bottom" && "pt-(--inset)",
        variant === "inset" && position !== "top" && "pb-(--inset)",
        className
      )}
      {...props}
    />
  )
}

function DrawerPopup({
  className,
  children,
  position: positionProp,
  variant = "default",
  showCloseButton = false,
  showBar = false,
  portalProps,
  ...props
}: DrawerPrimitive.Popup.Props & {
  position?: DrawerPosition
  variant?: "default" | "straight" | "inset"
  showCloseButton?: boolean
  showBar?: boolean
  portalProps?: DrawerPrimitive.Portal.Props
}) {
  const position = useResolvedDrawerPosition(positionProp)

  return (
    <DrawerPortal {...portalProps}>
      <DrawerBackdrop />
      <DrawerViewport position={position} variant={variant}>
        <DrawerPopupVariantContext.Provider value={variant}>
          <DrawerPrimitive.Popup
            data-slot="drawer-popup"
            className={cn(
              "relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover text-popover-foreground shadow-lg/5 transition-[transform,box-shadow,height,background-color] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform outline-none [--peek:calc(--spacing(6)-1px)] [--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))] [--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--shrink:calc(1-var(--scale))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-step:0.05] not-dark:bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] after:pointer-events-none after:absolute after:bg-popover data-nested-drawer-open:overflow-hidden data-nested-drawer-open:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(2%*(var(--nested-drawers)-var(--stack-progress))))] data-swiping:select-none data-[ending-style]:shadow-transparent data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:shadow-transparent dark:before:shadow-[0_-1px_--theme(--color-white/6%)] dark:data-nested-drawer-open:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(6%*(var(--nested-drawers)-var(--stack-progress))))]",
              "touch-none",
              position === "bottom" &&
                "max-w-[400px] transform-[translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] border-t border-border pb-[max(0px,calc(env(safe-area-inset-bottom,0px)+var(--drawer-snap-point-offset,0px)+clamp(0,1,var(--drawer-snap-point-offset,0px)/1px)*var(--drawer-swipe-movement-y,0px)))] not-data-[starting-style]:not-data-[ending-style]:transition-[transform,box-shadow,height,background-color,padding] after:inset-x-0 after:top-full after:h-(--bleed) has-data-[slot=drawer-bar]:pt-2 data-[ending-style]:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))] data-[ending-style]:pb-0 data-[starting-style]:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))] data-[starting-style]:pb-0",
              position === "top" &&
                "transform-[translateY(var(--drawer-swipe-movement-y))] border-b border-border after:inset-x-0 after:bottom-full after:h-(--bleed) has-data-[slot=drawer-bar]:pb-2 data-[ending-style]:transform-[translateY(calc(-100%-var(--inset)))] data-[starting-style]:transform-[translateY(calc(-100%-var(--inset)))]",
              position === "left" &&
                "w-[calc(100%-(--spacing(12)))] max-w-md transform-[translateX(var(--drawer-swipe-movement-x))] border-r border-border after:inset-y-0 after:right-full after:w-(--bleed) has-data-[slot=drawer-bar]:pr-2 data-[ending-style]:transform-[translateX(calc(-100%-var(--inset)))] data-[starting-style]:transform-[translateX(calc(-100%-var(--inset)))]",
              position === "right" &&
                "w-[calc(100%-(--spacing(12)))] max-w-md transform-[translateX(var(--drawer-swipe-movement-x))] border-l border-border after:inset-y-0 after:left-full after:w-(--bleed) has-data-[slot=drawer-bar]:pl-2 data-[ending-style]:transform-[translateX(calc(100%+var(--inset)))] data-[starting-style]:transform-[translateX(calc(100%+var(--inset)))]",
              variant !== "straight" &&
                cn(
                  position === "bottom" && "rounded-t-2xl",
                  position === "top" &&
                    "rounded-b-2xl **:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",
                  position === "left" &&
                    "rounded-r-2xl **:data-[slot=drawer-footer]:rounded-br-[calc(var(--radius-2xl)-1px)]",
                  position === "right" &&
                    "rounded-l-2xl **:data-[slot=drawer-footer]:rounded-bl-[calc(var(--radius-2xl)-1px)]"
                ),
              variant === "default" &&
                cn(
                  position === "bottom" &&
                    "before:rounded-t-[calc(var(--radius-2xl)-1px)]",
                  position === "top" &&
                    "before:rounded-b-[calc(var(--radius-2xl)-1px)]",
                  position === "left" &&
                    "before:rounded-r-[calc(var(--radius-2xl)-1px)]",
                  position === "right" &&
                    "before:rounded-l-[calc(var(--radius-2xl)-1px)]"
                ),
              variant === "inset" &&
                // The footer paints its own bleed rectangle below itself (see
                // DrawerFooter) to cover DrawerPopup's own bleed color during
                // drag/overscroll. The inset variant floats as a fully
                // rounded, bordered card instead — nothing sits behind it to
                // cover, so that rectangle just pokes out past the rounded
                // bottom corner as a stray patch of color. Kill it here the
                // same way the popup's own bleed is killed below.
                "before:hidden sm:rounded-2xl sm:border sm:border-border sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:after:bg-transparent sm:**:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)] sm:**:data-[slot=drawer-footer]:after:border-transparent sm:**:data-[slot=drawer-footer]:after:bg-transparent",
              variant === "straight" && "[--stack-step:0]",
              (position === "bottom" || position === "top") &&
                // max-h-full is a no-op here: the viewport lays these two
                // positions out with CSS grid (row 2 is auto-sized to fit the
                // popup itself), so percentage heights have nothing definite
                // to resolve against and the popup can grow past the viewport
                // with tall content. Cap it against the viewport directly —
                // this is also what lets snapPoints do anything: Base UI
                // derives --drawer-snap-point-offset from how much taller the
                // popup's *actual* rendered height is than each snap target,
                // so a popup that's never allowed to grow past its content
                // always measures the same height as every snap point and the
                // offset comes out to 0.
                "h-(--drawer-height,auto) max-h-[calc(100dvh-(--spacing(12)))] [--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))))] data-nested-drawer-open:h-(--height)",
              position === "bottom" &&
                "origin-[50%_calc(100%-var(--inset))] data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))]",
              position === "top" &&
                "origin-[50%_var(--inset)] data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--shrink)*var(--height))))_scale(var(--scale))]",
              position === "left" &&
                "origin-right data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)))_scale(var(--scale))]",
              position === "right" &&
                "origin-left data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)))_scale(var(--scale))]",
              className
            )}
            {...props}
          >
            {children}
            {showCloseButton && (
              <DrawerPrimitive.Close
                aria-label="Close"
                className="absolute end-2 top-2"
                render={<Button size="icon-sm" variant="ghost" />}
              >
                <XIcon />
              </DrawerPrimitive.Close>
            )}
            {showBar && <DrawerBar position={position} />}
          </DrawerPrimitive.Popup>
        </DrawerPopupVariantContext.Provider>
      </DrawerViewport>
    </DrawerPortal>
  )
}

function DrawerHeader({
  className,
  allowSelection = false,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  allowSelection?: boolean
}) {
  const defaultProps = {
    className: cn(
      "flex flex-col gap-2 p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pb-3 max-sm:pb-4",
      !allowSelection && "cursor-default",
      className
    ),
    "data-slot": "drawer-header",
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  })
}

function DrawerFooter({
  className,
  variant = "default",
  allowSelection = true,
  position: positionProp,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  variant?: "default" | "bare"
  allowSelection?: boolean
  position?: DrawerPosition
}) {
  const position = useResolvedDrawerPosition(positionProp)
  const popupVariant = React.useContext(DrawerPopupVariantContext)

  const defaultProps = {
    className: cn(
      "flex flex-col-reverse gap-2 px-6 pb-(--safe-area-inset-bottom,0px) sm:flex-row sm:justify-end",
      !allowSelection && "cursor-default",
      variant === "default" &&
        // The footer is always the last item in the popup's column, so
        // dragging/overscrolling exposes the area past its bottom edge.
        // That area is otherwise filled by DrawerPopup's own bleed
        // (bg-popover), which doesn't match the footer's muted background —
        // paint a matching bleed here so the footer's color and border
        // appear to continue instead of cutting to a different shade.
        //
        // after:z-10 is load-bearing: DrawerPopup has its own after: bleed
        // (bg-popover) covering the same region, and since that bleed is
        // *generated content of the popup itself* — which has a transform
        // and so establishes its own stacking context — it paints as if it
        // were the popup's last child, i.e. after and on top of this
        // footer (an earlier child) and this pseudo-element, even though
        // this is declared later in the DOM. Without an explicit z-index
        // this fix is invisible: the popup's own solid bleed just paints
        // over it.
        "relative border-t border-border bg-muted/72 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+--spacing(4))] after:pointer-events-none after:absolute after:z-10 after:bg-muted/72",
      // Bottom and top drawers leave space below the footer, so their bleed
      // continues downward.
      variant === "default" &&
        position !== "right" &&
        position !== "left" &&
        "after:inset-x-0 after:top-full after:h-[200px]",
      // Side drawers stretch sideways. Continue the footer into the gap on
      // the outer edge, including its top border, so the muted footer color
      // does not cut back to the popup color while dragging. Offset by the
      // footer border so the bleed's border-box matches its rendered height
      // as the footer content changes.
      variant === "default" &&
        position === "right" &&
        popupVariant === "default" &&
        "after:-top-px after:bottom-0 after:left-full after:w-[200px] after:border-t after:border-border",
      variant === "default" &&
        position === "left" &&
        popupVariant === "default" &&
        "after:-top-px after:right-full after:bottom-0 after:w-[200px] after:border-t after:border-border",
      variant === "bare" &&
        "pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+--spacing(6))] in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pt-3",
      // DrawerPopup reserves space for the drag bar via padding on itself
      // (e.g. pr-2 for a left drawer), which insets every child equally —
      // including the footer's own background. Cancel that inset here with
      // a matching negative margin, only when a bar sibling is actually
      // present, so the footer's background still reaches the handle edge.
      position === "left" && "has-[~[data-slot=drawer-bar]]:-mr-2",
      position === "right" && "has-[~[data-slot=drawer-bar]]:-ml-2",
      position === "top" && "has-[~[data-slot=drawer-bar]]:-mb-2",
      className
    ),
    "data-slot": "drawer-footer",
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  })
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-heading text-xl leading-none font-semibold",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function DrawerPanel({
  className,
  scrollable = true,
  allowSelection = true,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  scrollable?: boolean
  allowSelection?: boolean
}) {
  const defaultProps = {
    className: cn(
      "p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-footer]:not(.border-t))]:pb-1 in-[[data-slot=drawer-popup]:has([data-slot=drawer-header])]:pt-1",
      !allowSelection && "cursor-default",
      className
    ),
    "data-slot": "drawer-panel",
  }

  const content = useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render: allowSelection ? <DrawerContent render={render} /> : render,
  })

  if (scrollable) {
    // ScrollArea's own root has no intrinsic height — as a flex item inside
    // DrawerPopup's column it needs min-h-0 too, not just flex-1, or it
    // refuses to shrink below its content's natural height (the default
    // `min-height: auto` on flex items) and the popup grows to fit
    // everything instead of scrolling internally.
    return (
      <ScrollArea className="min-h-0 flex-1 touch-auto">{content}</ScrollArea>
    )
  }

  return content
}

function DrawerBar({
  className,
  position: positionProp,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  position?: DrawerPosition
}) {
  const position = useResolvedDrawerPosition(positionProp)
  const horizontal = position === "left" || position === "right"
  const defaultProps = {
    "aria-hidden": true as const,
    className: cn(
      "absolute flex touch-none items-center justify-center p-3 before:rounded-full before:bg-input",
      horizontal
        ? "inset-y-0 before:h-12 before:w-1"
        : "inset-x-0 before:h-1 before:w-12",
      position === "top" && "bottom-0",
      position === "bottom" && "top-0",
      position === "left" && "right-0",
      position === "right" && "left-0",
      className
    ),
    "data-slot": "drawer-bar",
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  })
}

const DrawerContent = DrawerPrimitive.Content

function DrawerMenu({
  className,
  render,
  ...props
}: useRender.ComponentProps<"nav">) {
  const defaultProps = {
    className: cn("-m-2 flex flex-col", className),
    "data-slot": "drawer-menu",
  }

  return useRender({
    defaultTagName: "nav",
    props: mergeProps<"nav">(defaultProps, props),
    render,
  })
}

function DrawerMenuItem({
  className,
  variant = "default",
  render,
  disabled,
  ...props
}: useRender.ComponentProps<"button"> & {
  variant?: "default" | "destructive"
}) {
  const defaultProps = {
    className: cn(
      "flex min-h-9 w-full cursor-default items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none select-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[variant=destructive]:text-destructive sm:min-h-8 sm:text-sm [&>svg]:pointer-events-none [&>svg]:-mx-0.5 [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4",
      className
    ),
    "data-slot": "drawer-menu-item",
    "data-variant": variant,
    disabled,
    type: "button" as const,
  }

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  })
}

function DrawerMenuSeparator({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn("mx-2 my-1 h-px bg-border", className),
    "data-slot": "drawer-menu-separator",
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  })
}

function DrawerMenuGroup({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn("flex flex-col", className),
    "data-slot": "drawer-menu-group",
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  })
}

function DrawerMenuGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  const defaultProps = {
    className: cn(
      "px-2 py-1.5 text-xs font-medium text-muted-foreground",
      className
    ),
    "data-slot": "drawer-menu-group-label",
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  })
}

function DrawerMenuTrigger({
  className,
  children,
  ...props
}: DrawerPrimitive.Trigger.Props) {
  return (
    <DrawerTrigger
      data-slot="drawer-menu-trigger"
      className={cn(
        "flex min-h-9 w-full cursor-default items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none select-none hover:bg-accent hover:text-accent-foreground sm:min-h-8 sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto opacity-80 rtl:-scale-x-100" />
    </DrawerTrigger>
  )
}

function DrawerMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  variant = "default",
  disabled,
  render,
  ...props
}: CheckboxPrimitive.Root.Props & {
  variant?: "default" | "switch"
  render?: React.ReactElement
}) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      className={cn(
        "group grid min-h-9 w-full cursor-default items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none select-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 sm:min-h-8 sm:text-sm [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        variant === "switch"
          ? "grid-cols-[1fr_auto] gap-4 pe-1.5"
          : "grid-cols-[1rem_1fr] pe-4",
        className
      )}
      data-slot="drawer-menu-checkbox-item"
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      render={render}
      {...props}
    >
      {variant === "switch" ? (
        <>
          <span className="col-start-1">{children}</span>
          <CheckboxPrimitive.Indicator
            className="col-start-2 inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px transition-[background-color,box-shadow] duration-200 outline-none [--thumb-size:--spacing(4)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-[checked]:bg-primary data-[disabled]:opacity-50 data-[unchecked]:bg-input sm:[--thumb-size:--spacing(3)]"
            keepMounted
          >
            <span className="pointer-events-none block aspect-square h-full origin-left rounded-(--thumb-size) bg-background shadow-sm transition-transform group-data-[checked]:translate-x-[calc(var(--thumb-size)-4px)] rtl:group-data-[checked]:-translate-x-[calc(var(--thumb-size)-4px)]" />
          </CheckboxPrimitive.Indicator>
        </>
      ) : (
        <>
          <CheckboxPrimitive.Indicator className="col-start-1">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
          <span className="col-start-2">{children}</span>
        </>
      )}
    </CheckboxPrimitive.Root>
  )
}

function DrawerMenuRadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="drawer-menu-radio-group"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function DrawerMenuRadioItem({
  className,
  children,
  value,
  disabled,
  render,
  ...props
}: RadioPrimitive.Root.Props & {
  value: string
  render?: React.ReactElement
}) {
  return (
    <RadioPrimitive.Root
      data-slot="drawer-menu-radio-item"
      className={cn(
        "grid min-h-9 w-full cursor-default items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none select-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 sm:min-h-8 sm:text-sm [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4",
        "grid-cols-[1rem_1fr] items-center pe-4",
        className
      )}
      disabled={disabled}
      render={render}
      value={value}
      {...props}
    >
      <RadioPrimitive.Indicator className="col-start-1">
        <CheckIcon />
      </RadioPrimitive.Indicator>
      <span className="col-start-2">{children}</span>
    </RadioPrimitive.Root>
  )
}

export {
  Drawer,
  DrawerBackdrop,
  DrawerBar,
  DrawerClose,
  DrawerContent,
  DrawerCreateHandle,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuCheckboxItem,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuItem,
  DrawerMenuRadioGroup,
  DrawerMenuRadioItem,
  DrawerMenuSeparator,
  DrawerMenuTrigger,
  DrawerPanel,
  DrawerPopup,
  DrawerPortal,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
}
