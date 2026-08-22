import type { Metadata } from "next"

import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { CopyMarkdownButton } from "@/components/copy-markdown-button"
import { Credits } from "@/components/credits"
import { DataTableDemoExample } from "@/components/examples/data-table-demo"
import { DataTableRtlExample } from "@/components/examples/data-table-rtl"
import { DocsPageFooter } from "@/components/docs-page-footer"
import { InstallCommand } from "@/components/install-command"
import { LastUpdated } from "@/components/last-updated"
import { CopyCommand } from "@/components/copy-command"
import { Step, Steps } from "@/components/steps"
import { TableOfContents } from "@/components/table-of-contents"
import { getExampleSource } from "@/lib/example-source"
import { getLastEditedDate } from "@/lib/last-edited"
import { CODE_FENCE } from "@/lib/markdown"

const SOURCE_PATH = "apps/web/app/docs/components/data-table/page.tsx"

export const metadata: Metadata = {
  title: "Data Table",
  description:
    "Powerful table and datagrids built using TanStack Table on top of the Table component.",
}

const tocItems = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "prerequisites", title: "Prerequisites" },
  { id: "set-up-table-features", title: "Set up Table Features" },
  { id: "basic-table", title: "Basic Table" },
  { id: "cell-formatting", title: "Cell Formatting" },
  { id: "row-actions", title: "Row Actions" },
  { id: "pagination", title: "Pagination" },
  { id: "sorting", title: "Sorting" },
  { id: "filtering", title: "Filtering" },
  { id: "visibility", title: "Visibility" },
  { id: "row-selection", title: "Row Selection" },
  { id: "rtl", title: "RTL" },
]

const prerequisitesSnippet = `type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]`

const featuresSnippet = `import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table"

// TanStack Table v9 is feature-based: declare the features this table uses —
// anything you don't register is tree-shaken out of the bundle.
export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

// Pass this as the first generic argument to ColumnDef, Column, Table, and
// Row so each type knows which feature APIs are available.
export type DataTableFeatures = typeof features`

const columnsSnippet = `"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

// Use accessor for data columns and display for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>()

export const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
])`

const dataTableSnippet = `"use client"

import { useTable } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { features, type DataTableFeatures } from "./data-table-features"
import { columns, type Payment } from "./columns"

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
}

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

  return (
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}`

const renderSnippet = `import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}`

const cellFormattingSnippet = `export const columns = columnHelper.columns([
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  }),
])`

const rowActionsSnippet = `columnHelper.display({
  id: "actions",
  cell: ({ row }) => {
    const payment = row.original

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="size-8 p-0" />}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(payment.id)}
          >
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
})`

const paginationSnippet = `<div className="flex items-center justify-end space-x-2 py-4">
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Next
  </Button>
</div>`

const sortingStateSnippet = `"use client"

import * as React from "react"
import { useTable, type SortingState } from "@tanstack/react-table"

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  // ...
}`

const sortableHeaderSnippet = `columnHelper.accessor("email", {
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="size-4" />
      </Button>
    )
  },
})`

const filteringSnippet = `const [sorting, setSorting] = React.useState<SortingState>([])
const [columnFilters, setColumnFilters] =
  React.useState<ColumnFiltersState>([])

const table = useTable({
  features,
  data,
  columns,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  state: {
    sorting,
    columnFilters,
  },
})

return (
  <Input
    placeholder="Filter emails..."
    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("email")?.setFilterValue(event.target.value)
    }
    className="max-w-sm"
  />
)`

const visibilitySnippet = `const [columnVisibility, setColumnVisibility] =
  React.useState<ColumnVisibilityState>({})

const table = useTable({
  features,
  data,
  columns,
  onColumnVisibilityChange: setColumnVisibility,
  state: {
    columnVisibility,
  },
})

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" className="ms-auto" />}>
    Columns
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    {table
      .getAllColumns()
      .filter((column) => column.getCanHide())
      .map((column) => (
        <DropdownMenuCheckboxItem
          key={column.id}
          className="capitalize"
          checked={column.getIsVisible()}
          onCheckedChange={(value) => column.toggleVisibility(!!value)}
        >
          {column.id}
        </DropdownMenuCheckboxItem>
      ))}
  </DropdownMenuContent>
</DropdownMenu>`

const rowSelectionColumnsSnippet = `columnHelper.display({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={
        table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
})`

const rowSelectionStateSnippet = `const [rowSelection, setRowSelection] =
  React.useState<RowSelectionState>({})

const table = useTable({
  features,
  data,
  columns,
  onRowSelectionChange: setRowSelection,
  state: {
    rowSelection,
  },
})`

const selectedRowsSnippet = `<div className="flex-1 text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>`

export const dataTableMarkdown = [
  "# Data Table",
  "",
  "Powerful table and datagrids built using TanStack Table on top of the Table component.",
  "",
  "## Installation",
  "",
  `${CODE_FENCE}bash`,
  "npx shadcn@latest add @persianlabsui/table",
  "npm install @tanstack/react-table",
  CODE_FENCE,
].join("\n")

export default function DataTableDocPage() {
  const lastEdited = getLastEditedDate(SOURCE_PATH)

  return (
    <div className="flex gap-10">
      <article className="max-w-3xl min-w-0 flex-1">
        <div className="flex flex-col items-end justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="self-start text-3xl font-semibold tracking-tight sm:self-auto">
            Data Table
          </h1>
          <CopyMarkdownButton markdown={dataTableMarkdown} />
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Powerful tables and datagrids built with{" "}
          <a
            href="https://tanstack.com/table/latest/docs/introduction"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            TanStack Table
          </a>{" "}
          on top of the Table component.
        </p>
        <LastUpdated date={lastEdited} />
        <Credits
          sources={[
            { label: "shadcn/ui", href: "https://ui.shadcn.com" },
            {
              label: "TanStack Table",
              href: "https://tanstack.com/table/latest/docs/introduction",
            },
          ]}
          changed={false}
        />

        <p className="mt-6 leading-relaxed text-muted-foreground">
          Every data table or datagrid is unique: they behave differently, have
          specific sorting and filtering requirements, and work with different
          data sources. Rather than one rigid component, this guide shows how to
          build your own on top of the headless{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            @tanstack/react-table
          </code>{" "}
          library and our{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            &lt;Table /&gt;
          </code>{" "}
          component.
        </p>

        <h2
          id="overview"
          className="mt-10 text-xl font-semibold tracking-tight"
        >
          Overview
        </h2>
        <div className="mt-4">
          <ComponentPreview
            preview={<DataTableDemoExample />}
            code={
              <CodeBlock
                code={getExampleSource("data-table-demo")}
                lang="tsx"
              />
            }
          />
        </div>

        <h2
          id="installation"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <Steps className="mt-4">
          <Step>Add the Table component to your project</Step>
          <div className="mt-2">
            <CopyCommand command="npx shadcn@latest add @persianlabsui/table" />
          </div>
          <Step>Add the TanStack Table dependency. This guide uses v9:</Step>
          <div className="mt-2">
            <InstallCommand packages="@tanstack/react-table" />
          </div>
        </Steps>

        <h2
          id="prerequisites"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Prerequisites
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          We&apos;re going to build a table showing recent payments:
        </p>
        <div className="mt-3">
          <CodeBlock code={prerequisitesSnippet} lang="tsx" />
        </div>

        <h2
          id="set-up-table-features"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Set up Table Features
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          TanStack Table v9 is feature-based: you opt into behavior — sorting,
          filtering, pagination — by declaring it with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            tableFeatures()
          </code>
          . Anything you don&apos;t list is tree-shaken out of your bundle.
        </p>
        <div className="mt-3">
          <CodeBlock code={featuresSnippet} lang="tsx" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The core row model is always included. Row models for optional
          features are created with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            create*RowModel()
          </code>{" "}
          and registered on the features object — there are no more{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            get*RowModel
          </code>{" "}
          table options.
        </p>

        <h2
          id="basic-table"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Basic Table
        </h2>
        <Steps className="mt-4">
          <Step>Define your columns</Step>
          <div className="mt-2">
            <CodeBlock code={columnsSnippet} lang="tsx" />
          </div>
          <Step>Create the DataTable component</Step>
          <div className="mt-2">
            <CodeBlock code={dataTableSnippet} lang="tsx" />
          </div>
          <Step>Render the table in your page</Step>
          <div className="mt-2">
            <CodeBlock code={renderSnippet} lang="tsx" />
          </div>
        </Steps>

        <h2
          id="cell-formatting"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Cell Formatting
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Format the amount cell to display a dollar amount, aligned right:
        </p>
        <div className="mt-3">
          <CodeBlock code={cellFormattingSnippet} lang="tsx" />
        </div>

        <h2
          id="row-actions"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Row Actions
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Access row data with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            row.original
          </code>{" "}
          inside a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            display
          </code>{" "}
          column to drive actions like copying an ID or calling your API:
        </p>
        <div className="mt-3">
          <CodeBlock code={rowActionsSnippet} lang="tsx" />
        </div>

        <h2
          id="pagination"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Pagination
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          With{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            rowPaginationFeature
          </code>{" "}
          registered, rows paginate into pages of 10 automatically — wire up
          controls with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            table.previousPage()
          </code>{" "}
          and{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            table.nextPage()
          </code>
          :
        </p>
        <div className="mt-3">
          <CodeBlock code={paginationSnippet} lang="tsx" />
        </div>

        <h2 id="sorting" className="mt-12 text-xl font-semibold tracking-tight">
          Sorting
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Wire up the sorting state, then make any header sortable by toggling
          it:
        </p>
        <div className="mt-3">
          <CodeBlock code={sortingStateSnippet} lang="tsx" />
        </div>
        <div className="mt-3">
          <CodeBlock code={sortableHeaderSnippet} lang="tsx" />
        </div>

        <h2
          id="filtering"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Filtering
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Add a search input that filters the email column through the
          registered{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            includesString
          </code>{" "}
          filter function:
        </p>
        <div className="mt-3">
          <CodeBlock code={filteringSnippet} lang="tsx" />
        </div>

        <h2
          id="visibility"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Visibility
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Toggle columns via the visibility state and a dropdown of checkboxes:
        </p>
        <div className="mt-3">
          <CodeBlock code={visibilitySnippet} lang="tsx" />
        </div>

        <h2
          id="row-selection"
          className="mt-12 text-xl font-semibold tracking-tight"
        >
          Row Selection
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Add a checkbox column with a select-all header, then read the
          selection from the filtered row model:
        </p>
        <div className="mt-3 space-y-3">
          <CodeBlock code={rowSelectionColumnsSnippet} lang="tsx" />
          <CodeBlock code={rowSelectionStateSnippet} lang="tsx" />
          <CodeBlock code={selectedRowsSnippet} lang="tsx" />
        </div>

        <h2 id="rtl" className="mt-12 text-xl font-semibold tracking-tight">
          RTL
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The Table component is built entirely on logical CSS properties, so
          data tables mirror automatically under{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            dir=&quot;rtl&quot;
          </code>{" "}
          — headers, cells, and action menus included. Format amounts with a
          locale-aware formatter such as{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            fa-IR
          </code>{" "}
          to show Toman values with Persian digits.
        </p>
        <div className="mt-3">
          <ComponentPreview
            dir="rtl"
            preview={<DataTableRtlExample />}
            code={
              <CodeBlock code={getExampleSource("data-table-rtl")} lang="tsx" />
            }
          />
        </div>

        <DocsPageFooter
          href="/docs/components/data-table"
          sourcePath={SOURCE_PATH}
        />
      </article>

      <aside className="hidden w-44 shrink-0 xl:block">
        <div className="sticky top-24">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  )
}
