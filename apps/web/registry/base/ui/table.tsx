import type * as React from "react"

import { cn } from "@/lib/utils"

function Table({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"table"> & {
  /** `"card"` separates each row into its own bordered, elevated surface. */
  variant?: "default" | "card"
}) {
  return (
    <div
      data-slot="table-container"
      data-variant={variant}
      className="group/table relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-sm",
          "group-data-[variant=card]/table:border-separate group-data-[variant=card]/table:border-spacing-y-2",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "[&_tr]:border-b group-data-[variant=card]/table:[&_tr]:border-none",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        "group-data-[variant=card]/table:border-none group-data-[variant=card]/table:bg-transparent",
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
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        "group-data-[variant=card]/table:rounded-lg group-data-[variant=card]/table:border group-data-[variant=card]/table:border-border group-data-[variant=card]/table:bg-card group-data-[variant=card]/table:shadow-sm group-data-[variant=card]/table:hover:bg-muted/30",
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
        "h-10 px-2 text-start align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pe-0",
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
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
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
  TableCaption,
}
