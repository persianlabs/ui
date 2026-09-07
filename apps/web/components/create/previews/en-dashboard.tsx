"use client"

// English preview item for the /create preview iframe: the same dashboard
// density as fa-dashboard, LTR with Latin digits, styled entirely by the
// design-system vars the DesignSystemProvider applies.

import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BellIcon,
  CreditCardIcon,
  PackageIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroupLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Progress } from "@workspace/ui/components/progress"
import { Separator } from "@workspace/ui/components/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

const STATS = [
  {
    title: "Monthly revenue",
    value: "$24,812",
    delta: "+12.4%",
    trend: "up" as const,
    icon: WalletIcon,
  },
  {
    title: "Orders",
    value: "1,842",
    delta: "+8.1%",
    trend: "up" as const,
    icon: ShoppingCartIcon,
  },
  {
    title: "Active customers",
    value: "593",
    delta: "-2.3%",
    trend: "down" as const,
    icon: UsersIcon,
  },
  {
    title: "Conversion rate",
    value: "3.6%",
    delta: "+0.4%",
    trend: "up" as const,
    icon: TrendingUpIcon,
  },
]

const WEEK_DAYS = [
  { label: "Sat", value: 42 },
  { label: "Sun", value: 65 },
  { label: "Mon", value: 51 },
  { label: "Tue", value: 88 },
  { label: "Wed", value: 73 },
  { label: "Thu", value: 96 },
  { label: "Fri", value: 58 },
]

const ORDERS = [
  {
    id: "88900",
    customer: "Sara Mohammadi",
    amount: "$2,450.00",
    status: "Paid",
    tone: "default" as const,
  },
  {
    id: "88899",
    customer: "Amir Rezaei",
    amount: "$870.00",
    status: "Pending",
    tone: "secondary" as const,
  },
  {
    id: "88898",
    customer: "Negar Karimi",
    amount: "$5,120.00",
    status: "Shipped",
    tone: "outline" as const,
  },
  {
    id: "88897",
    customer: "Hossein Ahmadi",
    amount: "$1,340.00",
    status: "Cancelled",
    tone: "destructive" as const,
  },
]

const TASKS = [
  { id: "t1", label: "Review July invoices", done: true },
  { id: "t2", label: "Answer support tickets", done: true },
  { id: "t3", label: "Update wholesale prices", done: false },
  { id: "t4", label: "Product team sync", done: false },
]

const ACTIVITY = [
  {
    initials: "SM",
    name: "Sara Mohammadi",
    action: "paid invoice #88900",
    time: "10 minutes ago",
  },
  {
    initials: "AR",
    name: "Amir Rezaei",
    action: "created a new product listing",
    time: "1 hour ago",
  },
  {
    initials: "NK",
    name: "Negar Karimi",
    action: "requested a return",
    time: "3 hours ago",
  },
]

export function EnDashboard() {
  return (
    <div dir="ltr" className="bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>SY</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm leading-snug font-medium">
                Sima Dashboard
              </span>
              <span className="text-xs text-muted-foreground">
                Saturday, September 6, 2026
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="relative max-w-64 min-w-0 flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search dashboard…" className="pl-8" />
            </div>
            <Button variant="outline" size="icon" aria-label="Notifications">
              <BellIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="Settings">
              <SettingsIcon />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="icon" aria-label="Account" />
                }
              >
                <Avatar>
                  <AvatarFallback className="text-xs">PL</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroupLabel>Account</DropdownMenuGroupLabel>
                <DropdownMenuItem>
                  <UserIcon className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon className="size-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <PackageIcon data-icon="inline-start" />
              New order
            </Button>
          </div>
        </header>

        <Separator />

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <Card key={stat.title} size="sm">
              <CardHeader>
                <CardDescription className="flex items-center gap-1.5">
                  <stat.icon className="size-3.5" />
                  {stat.title}
                </CardDescription>
                <CardTitle className="text-xl">{stat.value}</CardTitle>
                <CardAction>
                  <Badge
                    variant={stat.trend === "up" ? "default" : "secondary"}
                    className="gap-1"
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRightIcon className="size-3" />
                    ) : (
                      <ArrowDownRightIcon className="size-3" />
                    )}
                    {stat.delta}
                  </Badge>
                </CardAction>
              </CardHeader>
            </Card>
          ))}
        </section>

        {/* Main grid */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Bar chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales this week</CardTitle>
              <CardDescription>
                Total: $47,300 — daily average: $6,757
              </CardDescription>
              <CardAction>
                <Badge variant="outline">Week 37</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-end gap-2 sm:gap-3">
                {WEEK_DAYS.map((day) => (
                  <div
                    key={day.label}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div
                      className="w-full rounded-t-md bg-primary"
                      style={{ height: `${day.value}%` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s tasks</CardTitle>
              <CardDescription>2 of 4 tasks completed</CardDescription>
              <CardAction>
                <Badge variant="secondary">50%</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Progress value={50} />
              <div className="flex flex-col gap-2.5">
                {TASKS.map((task) => (
                  <label
                    key={task.id}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border px-3 py-2 text-sm ring-ring/50 hover:bg-muted/50"
                  >
                    <Checkbox defaultChecked={task.done} />
                    <span
                      className={
                        task.done
                          ? "text-muted-foreground line-through"
                          : undefined
                      }
                    >
                      {task.label}
                    </span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Orders + activity */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent orders</CardTitle>
              <CardDescription>
                The last 4 transactions recorded in your store
              </CardDescription>
              <CardAction>
                <Button variant="outline" size="sm">
                  View all
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ORDERS.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-muted-foreground">
                        #{order.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.customer}
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={order.tone}>{order.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>
                The event stream for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {ACTIVITY.map((item) => (
                <div key={item.name + item.time} className="flex gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs">
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-sm leading-snug">
                      <span className="font-medium">{item.name}</span>{" "}
                      {item.action}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="secondary" size="sm" className="mt-1">
                <CreditCardIcon data-icon="inline-start" />
                View statements
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
