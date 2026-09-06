"use client"

// Persian preview item for the /create preview iframe: a dense RTL dashboard
// demo with Farsi digits, styled entirely by the design-system vars the
// DesignSystemProvider applies.

import {
  ArrowDownLeftIcon,
  ArrowUpLeftIcon,
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
    title: "درآمد ماه",
    value: "۱۲۴٬۸۰۰٬۰۰۰ تومان",
    delta: "+۱۲٫۴٪",
    trend: "up" as const,
    icon: WalletIcon,
  },
  {
    title: "سفارش‌ها",
    value: "۱٬۸۴۲",
    delta: "+۸٫۱٪",
    trend: "up" as const,
    icon: ShoppingCartIcon,
  },
  {
    title: "مشتریان فعال",
    value: "۵۹۳",
    delta: "−۲٫۳٪",
    trend: "down" as const,
    icon: UsersIcon,
  },
  {
    title: "نرخ تبدیل",
    value: "۳٫۶٪",
    delta: "+۰٫۴٪",
    trend: "up" as const,
    icon: TrendingUpIcon,
  },
]

const WEEK_DAYS = [
  { label: "ش", value: 42 },
  { label: "ی", value: 65 },
  { label: "د", value: 51 },
  { label: "س", value: 88 },
  { label: "چ", value: 73 },
  { label: "پ", value: 96 },
  { label: "ج", value: 58 },
]

const ORDERS = [
  {
    id: "۸۸۹۰۰",
    customer: "سارا محمدی",
    amount: "۲٬۴۵۰٬۰۰۰ تومان",
    status: "پرداخت شده",
    tone: "default" as const,
  },
  {
    id: "۸۸۸۹۹",
    customer: "امیر رضایی",
    amount: "۸۷۰٬۰۰۰ تومان",
    status: "در انتظار",
    tone: "secondary" as const,
  },
  {
    id: "۸۸۸۹۸",
    customer: "نگار کریمی",
    amount: "۵٬۱۲۰٬۰۰۰ تومان",
    status: "ارسال شده",
    tone: "outline" as const,
  },
  {
    id: "۸۸۸۹۷",
    customer: "حسین احمدی",
    amount: "۱٬۳۴۰٬۰۰۰ تومان",
    status: "لغو شده",
    tone: "destructive" as const,
  },
]

const TASKS = [
  { id: "t1", label: "بازبینی فاکتورهای تیرماه", done: true },
  { id: "t2", label: "پاسخ به تیکت‌های پشتیبانی", done: true },
  { id: "t3", label: "به‌روزرسانی قیمت‌های عمده‌فروشی", done: false },
  { id: "t4", label: "جلسه با تیم محصول", done: false },
]

const ACTIVITY = [
  {
    initials: "س‌م",
    name: "سارا محمدی",
    action: "فاکتور ۸۸۹۰۰ را پرداخت کرد",
    time: "۱۰ دقیقه پیش",
  },
  {
    initials: "ا‌ر",
    name: "امیر رضایی",
    action: "کالای جدید ثبت کرد",
    time: "۱ ساعت پیش",
  },
  {
    initials: "ن‌ک",
    name: "نگار کریمی",
    action: "درخواست مرجوعی ثبت کرد",
    time: "۳ ساعت پیش",
  },
]

export function FaDashboard() {
  return (
    <div dir="rtl" className="bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>پ‌ن</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm leading-snug font-medium">
                پنل کاربری سیما
              </span>
              <span className="text-xs text-muted-foreground">
                شنبه ۱۵ شهریور ۱۴۰۴
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="relative max-w-64 min-w-0 flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="جست‌وجو در داشبورد…" className="pr-8" />
            </div>
            <Button variant="outline" size="icon" aria-label="اعلان‌ها">
              <BellIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="تنظیمات">
              <SettingsIcon />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="icon" aria-label="حساب کاربری" />}
              >
                <Avatar>
                  <AvatarFallback className="text-xs">پ‌ن</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroupLabel>حساب کاربری</DropdownMenuGroupLabel>
                <DropdownMenuItem>
                  <UserIcon className="size-4" />
                  پروفایل
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon className="size-4" />
                  صورتحساب
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon className="size-4" />
                  خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <PackageIcon data-icon="inline-start" />
              سفارش جدید
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
                      <ArrowUpLeftIcon className="size-3" />
                    ) : (
                      <ArrowDownLeftIcon className="size-3" />
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
              <CardTitle>فروش هفته جاری</CardTitle>
              <CardDescription>
                مجموع فروش: ۴۷٬۳۰۰٬۰۰۰ تومان — میانگین روزانه: ۶٬۷۵۷٬۰۰۰ تومان
              </CardDescription>
              <CardAction>
                <Badge variant="outline">هفته ۳۷</Badge>
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
              <CardTitle>کارهای امروز</CardTitle>
              <CardDescription>۲ از ۴ کار انجام شده</CardDescription>
              <CardAction>
                <Badge variant="secondary">۵۰٪</Badge>
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
              <CardTitle>سفارش‌های اخیر</CardTitle>
              <CardDescription>
                آخرین ۴ تراکنش ثبت‌شده در فروشگاه
              </CardDescription>
              <CardAction>
                <Button variant="outline" size="sm">
                  مشاهده همه
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">شماره</TableHead>
                    <TableHead>مشتری</TableHead>
                    <TableHead>مبلغ</TableHead>
                    <TableHead className="text-left">وضعیت</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ORDERS.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-muted-foreground">
                        #{order.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.customer}
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell className="text-left">
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
              <CardTitle>فعالیت‌های اخیر</CardTitle>
              <CardDescription>جریان رویدادهای حساب</CardDescription>
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
                مشاهده صورت‌حساب‌ها
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
