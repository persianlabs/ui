"use client"

import * as React from "react"
import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
  type SortingState,
} from "@tanstack/react-table"
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

type Payment = {
  id: string
  name: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
}

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
})

export type DataTableFeatures = typeof features

const statusLabels = {
  pending: "در انتظار",
  processing: "در حال پردازش",
  success: "موفق",
  failed: "ناموفق",
} as const

const payments: Payment[] = [
  {
    id: "m5gr84i9",
    name: "کنار رستگاری",
    amount: 3_160_000,
    status: "success",
  },
  {
    id: "derv1ws0",
    name: "منصوره احمدی",
    amount: 8_560_000,
    status: "processing",
  },
  { id: "728ed52f", name: "مریم کریمی", amount: 1_000_000, status: "pending" },
  { id: "bhqecj4p", name: "کریم عبدی", amount: 7_290_000, status: "failed" },
]

const columnHelper = createColumnHelper<DataTableFeatures, Payment>()

const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "پرداخت‌کننده",
  }),
  columnHelper.accessor("status", {
    header: "وضعیت",
    cell: ({ row }) => (
      <div className="capitalize">{statusLabels[row.original.status]}</div>
    ),
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-end">مبلغ</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("fa-IR").format(
        row.getValue("amount")
      )

      return (
        <div className="text-end font-medium tabular-nums">
          {formatted} تومان
        </div>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="size-8 p-0" />}
          >
            <span className="sr-only">باز کردن منو</span>
            <MoreHorizontalIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              کپی شناسه پرداخت
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>مشاهده مشتری</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
])

export function DataTableRtlExample() {
  // TanStack Table reads timing data while computing its initial state, so
  // the table only renders after mount to stay out of the static prerender.
  const [mounted, setMounted] = React.useState(false)
  const [sorting, setSorting] = React.useState<SortingState>([])

  React.useEffect(() => {
    const init = () => setMounted(true)
    init()
  }, [])

  const table = useTable({
    features,
    data: payments,
    columns,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  if (!mounted) {
    return (
      <div
        data-slot="data-table-skeleton"
        className="h-56 w-full max-w-2xl animate-pulse rounded-md bg-muted"
      />
    )
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        جدول با ویژگی‌های منطقی ساخته شده و در جهت RTL خودکار آینه می‌شود.
      </p>
    </div>
  )
}
