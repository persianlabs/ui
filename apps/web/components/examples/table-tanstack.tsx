"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Badge } from "@workspace/ui/components/badge"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

type Project = {
  id: string
  project: string
  status: "Paid" | "Unpaid" | "Pending" | "Failed"
  team: string
  budget: number
}

const data: Project[] = [
  { id: "1", project: "Website Redesign", status: "Paid", team: "Frontend Team", budget: 12500 },
  { id: "2", project: "Mobile App", status: "Unpaid", team: "Mobile Team", budget: 8750 },
  { id: "3", project: "API Integration", status: "Pending", team: "Backend Team", budget: 5200 },
  { id: "4", project: "Security Audit", status: "Failed", team: "Security Team", budget: 2100 },
]

const statusDotClass: Record<Project["status"], string> = {
  Paid: "bg-emerald-500",
  Unpaid: "bg-muted-foreground/50",
  Pending: "bg-amber-500",
  Failed: "bg-destructive",
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("project")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<Project["status"]>("status")
      return (
        <Badge variant="outline" className="gap-1.5">
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${statusDotClass[status]}`}
          />
          {status}
        </Badge>
      )
    },
  },
  { accessorKey: "team", header: "Team" },
  {
    accessorKey: "budget",
    header: () => <div className="text-end">Budget</div>,
    cell: ({ row }) => (
      <div className="text-end">
        {currencyFormatter.format(row.getValue<number>("budget"))}
      </div>
    ),
  },
]

export function TableTanstackExample() {
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  })

  const totalBudget = data.reduce((sum, project) => sum + project.budget, 0)

  return (
    <Table variant="card" className="w-full max-w-xl">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Budget</TableCell>
          <TableCell className="text-end">
            {currencyFormatter.format(totalBudget)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
