import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import type * as React from "react"

import { Empty } from "@workspace/ui/components/empty"
import { cn } from "@workspace/ui/lib/utils"

export type TableVariant = "default" | "card"

export type TableProps = React.ComponentProps<"table"> & {
  /** `"card"` wraps the body rows in a single elevated, rounded surface. */
  variant?: TableVariant
  render?: useRender.ComponentProps<"div">["render"]
}

function Table({
  className,
  variant = "default",
  render,
  ...props
}: TableProps) {
  const defaultProps = {
    children: (
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-sm in-data-[variant=card]:border-separate in-data-[variant=card]:border-spacing-0",
          className
        )}
        {...props}
      />
    ),
    className: "relative w-full overflow-x-auto",
    "data-slot": "table-container",
    "data-variant": variant,
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, {}),
    render,
  })
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "relative in-data-[variant=card]:rounded-xl in-data-[variant=card]:shadow-[var(--shadow-elevation-sm)]",
        "[&_tr:last-child]:border-0",
        "in-data-[variant=card]:*:[tr]:border-0",
        "in-data-[variant=card]:*:[tr]:*:[td]:border-b in-data-[variant=card]:*:[tr]:*:[td]:bg-card",
        "in-data-[variant=card]:*:[tr]:first:*:[td]:first:rounded-ss-xl in-data-[variant=card]:*:[tr]:first:*:[td]:border-t in-data-[variant=card]:*:[tr]:first:*:[td]:last:rounded-se-xl",
        "in-data-[variant=card]:*:[tr]:last:*:[td]:last:rounded-ee-xl in-data-[variant=card]:*:[tr]:last:*:[td]:first:rounded-es-xl",
        "in-data-[variant=card]:*:[tr]:*:[td]:first:border-s in-data-[variant=card]:*:[tr]:*:[td]:last:border-e",
        "in-data-[variant=card]:*:[tr]:hover:*:[td]:bg-[color-mix(in_srgb,var(--card),var(--color-black)_2%)] dark:in-data-[variant=card]:*:[tr]:hover:*:[td]:bg-[color-mix(in_srgb,var(--card),var(--color-white)_2%)]",
        "in-data-[variant=card]:*:[tr]:data-[state=selected]:*:[td]:bg-[color-mix(in_srgb,var(--card),var(--color-black)_4%)] dark:in-data-[variant=card]:*:[tr]:data-[state=selected]:*:[td]:bg-[color-mix(in_srgb,var(--card),var(--color-white)_4%)]",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-transparent font-medium not-in-data-[variant=card]:bg-[color-mix(in_srgb,var(--card),var(--color-black)_2%)] in-data-[variant=card]:border-none dark:not-in-data-[variant=card]:bg-[color-mix(in_srgb,var(--card),var(--color-white)_2%)] [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "relative border-b transition-colors not-in-data-[variant=card]:hover:bg-[color-mix(in_srgb,var(--background),var(--color-black)_2%)] not-in-data-[variant=card]:data-[state=selected]:bg-[color-mix(in_srgb,var(--background),var(--color-black)_4%)] dark:not-in-data-[variant=card]:hover:bg-[color-mix(in_srgb,var(--background),var(--color-white)_2%)] dark:not-in-data-[variant=card]:data-[state=selected]:bg-[color-mix(in_srgb,var(--background),var(--color-white)_4%)]",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2.5 text-start align-middle leading-none font-medium whitespace-nowrap text-muted-foreground has-[[role=checkbox]]:w-px first:has-[[role=checkbox]]:pe-0 last:has-[[role=checkbox]]:ps-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "bg-clip-padding p-2.5 align-middle leading-none whitespace-nowrap in-data-[slot=table-footer]:py-3.5 in-data-[variant=card]:first:ps-[calc(0.625rem-1px)] in-data-[variant=card]:last:pe-[calc(0.625rem-1px)] has-[[role=checkbox]]:w-px first:has-[[role=checkbox]]:pe-0 last:has-[[role=checkbox]]:ps-0",
        className
      )}
      {...props}
    />
  )
}

function TableEmpty({
  colSpan,
  className,
  children,
  ...props
}: React.ComponentProps<"tr"> & {
  /** Number of columns for the empty row's cell to span. */
  colSpan: number
}) {
  return (
    <TableRow
      data-slot="table-empty"
      className={cn(
        "not-in-data-[variant=card]:hover:bg-transparent dark:not-in-data-[variant=card]:hover:bg-transparent",
        className
      )}
      {...props}
    >
      <TableCell
        colSpan={colSpan}
        className="h-auto p-0 whitespace-normal in-data-[variant=card]:first:ps-0 in-data-[variant=card]:last:pe-0"
      >
        <Empty className="rounded-none border-none p-6 md:p-10">
          {children}
        </Empty>
      </TableCell>
    </TableRow>
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-4 text-sm text-muted-foreground in-data-[variant=card]:my-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableEmpty,
  TableCaption,
}
