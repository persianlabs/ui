"use client"

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react"
import { arc } from "motion"
import { motion, useAnimate } from "motion/react"

import { cn } from "@/lib/utils"

const MotionLink = motion.create("a")

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export type BounceSidebarItem =
  | string
  | { label: string; href?: string; depth?: number }
  | { label: string; heading: true }

export type BounceSidebarProps = Omit<ComponentProps<"ul">, "onChange"> & {
  items: BounceSidebarItem[]
  value?: number
  defaultValue?: number
  onChange?: (index: number) => void
  dotColor?: string
}

export function BounceSidebar({
  items,
  value,
  defaultValue = 0,
  onChange,
  dotColor = "#FC4C01",
  className,
  ...props
}: BounceSidebarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const activeIndex = value ?? internalValue

  const [dot, animate] = useAnimate<HTMLSpanElement>()
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const prevY = useRef<number | null>(null)

  const [dotSize, setDotSize] = useState(6)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const init = () => {
      const dpr = window.devicePixelRatio || 1
      setDotSize(Math.round(6 * dpr) / dpr)
    }
    init()
  }, [])

  useIsomorphicLayoutEffect(() => {
    let cancelled = false
    const snap = () => {
      const el = itemRefs.current[activeIndex]
      if (cancelled || !el || !dot.current) return
      const dpr = window.devicePixelRatio || 1
      const size = Math.round(6 * dpr) / dpr
      const toY =
        Math.round((el.offsetTop + el.offsetHeight / 2 - size / 2) * dpr) / dpr
      animate(dot.current, { x: 0, y: toY }, { duration: 0 })
      prevY.current = toY
      setReady(true)
    }

    snap()
    const raf = requestAnimationFrame(snap)
    document.fonts?.ready.then(snap)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const el = itemRefs.current[activeIndex]
    if (!el || !dot.current) return

    const dpr = window.devicePixelRatio || 1
    const toY =
      Math.round((el.offsetTop + el.offsetHeight / 2 - dotSize / 2) * dpr) / dpr

    if (prevY.current === null) {
      animate(dot.current, { x: 0, y: toY }, { duration: 0 })
      prevY.current = toY
      return
    }

    const fromY = prevY.current
    const delta = toY - fromY
    prevY.current = toY
    if (delta === 0) return

    const distance = Math.abs(delta)
    const path = arc({
      // Peak horizontal sway ≈ strength × distance; capping it at 8px keeps
      // the dot (8px inset, 6px wide) fully inside the container even on
      // narrow rails instead of clipping out of view mid-arc.
      strength: Math.min(0.8, 8 / distance),
      direction: delta > 0 ? "ccw" : "cw",
    })

    animate(
      dot.current,
      { x: 0, y: toY },
      { duration: 0.25, ease: "easeOut", path }
    )
  }, [activeIndex, animate, dot, dotSize])

  const select = (index: number) => {
    if (value === undefined) setInternalValue(index)
    onChange?.(index)
  }

  return (
    <ul
      data-slot="bounce-sidebar"
      className={cn("relative flex flex-col gap-1 ps-6", className)}
      {...props}
    >
      <span
        ref={dot}
        aria-hidden
        className="absolute start-2 top-0 rounded-full transition-opacity duration-150"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
          opacity: ready ? 1 : 0,
        }}
      />

      {items.map((item, index) => {
        const label = typeof item === "string" ? item : item.label

        if (typeof item !== "string" && "heading" in item) {
          return (
            <li
              key={`${index}-${label}`}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              role="presentation"
              data-slot="bounce-sidebar-heading"
              style={{ color: dotColor }}
              className="px-1 pt-7 pb-1 text-[11px] font-semibold tracking-[0.14em] uppercase first:pt-0"
            >
              {label}
            </li>
          )
        }

        const href = typeof item === "string" ? undefined : item.href
        const depth =
          typeof item !== "string" && "depth" in item ? (item.depth ?? 0) : 0
        const isActive = index === activeIndex
        const itemClassName = cn(
          "flex w-full cursor-pointer items-center rounded-lg p-1 text-start text-sm transition-colors duration-200",
          isActive ? "text-foreground" : "text-foreground/50",
          depth === 1 && "ps-4",
          depth === 2 && "ps-8"
        )

        return (
          <li
            key={`${index}-${label}`}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
          >
            {href ? (
              <MotionLink
                href={href}
                data-slot="bounce-sidebar-item"
                data-active={isActive}
                onClick={() => select(index)}
                className={itemClassName}
              >
                {label}
              </MotionLink>
            ) : (
              <motion.button
                type="button"
                data-slot="bounce-sidebar-item"
                data-active={isActive}
                onClick={() => select(index)}
                className={itemClassName}
              >
                {label}
              </motion.button>
            )}
          </li>
        )
      })}
    </ul>
  )
}
