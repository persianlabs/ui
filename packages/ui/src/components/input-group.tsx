import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="input-group"
      className={cn(
        "group/input-group relative flex h-8 w-full flex-wrap items-center gap-1.5 rounded-lg border border-border bg-background px-1 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-[[data-disabled]]:pointer-events-none has-[[data-disabled]]:opacity-50 has-[textarea]:h-auto has-[textarea]:items-start",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex items-center justify-center gap-1.5 py-1 text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pe-1",
        "inline-end": "order-last ps-1",
        "block-start":
          "order-first w-full justify-start pb-1 group-has-[>textarea]/input-group:pt-2.5",
        "block-end":
          "order-last w-full justify-start pt-1 group-has-[>textarea]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      data-slot="input-group-addon"
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  size = "icon-xs",
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="input-group-button"
      size={size}
      variant={variant}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "flex items-center gap-1.5 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof InputPrimitive>) {
  return (
    <InputPrimitive
      data-slot="input-group-input"
      className={cn(
        "w-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="input-group-textarea"
      className={cn(
        "flex-1 resize-none bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  inputGroupAddonVariants,
}
