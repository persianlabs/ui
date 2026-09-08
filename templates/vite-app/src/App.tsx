import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"

const scenarios: Array<{ label: string; content: ReactNode }> = [
  {
    label: "فارسی",
    content: <p>متن نمونه برای نمایش فونت فارسی — 1234567890</p>,
  },
  {
    label: "English",
    content: (
      <p dir="ltr" className="text-start">
        Sample English text — 0123456789
      </p>
    ),
  },
  {
    label: "ترکیبی",
    content: (
      <p>
        ورود کاربر <span dir="ltr">taymaz</span> در نسخه{" "}
        <span dir="ltr">v2.4.0</span> با موفقیت انجام شد.
      </p>
    ),
  },
  {
    label: "اعداد — فارسی",
    content: (
      <p>
        مبلغ فاکتور 1,234,567 تومان — تخفیف 15٪ — تاریخ 1404/06/15 — ساعت
        14:30
      </p>
    ),
  },
  {
    label: "اعداد — en",
    content: (
      <p dir="ltr" className="text-start">
        Invoice $1,234,567 — 15% off — 2026-09-06 — 14:30 — 3.14159
      </p>
    ),
  },
  {
    label: "اعداد — فارسی در متن لاتین",
    content: (
      <p dir="ltr" className="text-start">
        Order 123 of 456 — digits inline with English words.
      </p>
    ),
  },
  {
    label: "اعداد — انگلیسی در متن فارسی",
    content: (
      <p>
        سفارش 123 از 456 — ارقام داخل جمله فارسی — قیمت: 89,000 تومان
      </p>
    ),
  },
  {
    label: "اعداد — mono",
    content: (
      <pre
        dir="ltr"
        className="font-mono bg-muted overflow-x-auto rounded-lg p-4 text-sm"
      >
        {`total: 1234567890  |  مبلغ: 1234567890  |  0x1F + 42 = 0x2B`}
      </pre>
    ),
  },
  {
    label: "کد + فارسی",
    content: (
      <pre
        dir="ltr"
        className="font-mono bg-muted overflow-x-auto rounded-lg p-4 text-sm"
      >
        {`// تاریخ را به فرمت فارسی تبدیل می‌کند
const date = new Intl.DateTimeFormat("fa-IR").format(new Date())`}
      </pre>
    ),
  },
  {
    label: "utility — num-en",
    content: (
      <p>
        کد پیگیری سفارش: <span className="num-en">A-123456</span> — ارقام
        لاتین حتی با ss01 سراسری.
      </p>
    ),
  },
  {
    label: "utility — num-fa",
    content: (
      <p>
        شماره پرونده: <span className="num-fa">88900</span> — ارقام فارسی
        از متن لاتین.
      </p>
    ),
  },
  {
    label: "utility — num-fa tabular-nums",
    content: (
      <div className="flex flex-col gap-1 text-sm">
        <span className="num-fa tabular-nums">1111111</span>
        <span className="num-fa tabular-nums">5555555</span>
        <span className="num-fa tabular-nums">9876543</span>
        <span className="text-muted-foreground text-xs">
          ارقام فارسی هم‌عرض (tabular) — زیر هم ستون می‌شوند.
        </span>
      </div>
    ),
  },
  {
    label: "utility — num-en tabular-nums",
    content: (
      <div className="flex flex-col gap-1 text-sm">
        <span className="num-en tabular-nums">1111111</span>
        <span className="num-en tabular-nums">5555555</span>
        <span className="num-en tabular-nums">9876543</span>
        <span className="text-muted-foreground text-xs">
          ارقام لاتین هم‌عرض — برای جدول‌ها و گزارش‌ها.
        </span>
      </div>
    ),
  },
]

export function App() {
  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 p-8 leading-loose">
      {scenarios.map((scenario) => (
        <div key={scenario.label} className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs">
            {scenario.label}
          </span>
          {scenario.content}
        </div>
      ))}
      <div className="text-muted-foreground mt-4 text-xs">
        (Press <kbd className="font-mono">d</kbd> to toggle dark mode)
      </div>
      <Button className="mt-2 self-start">Default Button</Button>
    </div>
  )
}

export default App
