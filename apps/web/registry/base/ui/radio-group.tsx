"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { Hitbox } from "@/components/ui/hitbox"
import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <Hitbox size="sm" radius="full">
      <RadioPrimitive.Root
        data-slot="radio-group-item"
        className={cn(
          "peer relative aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 data-checked:border-primary",
          className
        )}
        {...props}
      >
        <RadioPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="absolute inset-0 flex scale-0 items-center justify-center transition-[scale] duration-150 ease-out data-ending-style:scale-0 data-starting-style:scale-0 data-checked:scale-100"
        >
          <span className="size-2 rounded-full bg-primary" />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>
    </Hitbox>
  )
}

export { RadioGroup, RadioGroupItem }
