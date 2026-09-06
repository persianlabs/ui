import type { Metadata } from "next"

import { CreateApp } from "@/components/create/create-app"

export const metadata: Metadata = {
  title: "Create",
  description:
    "Customize your base color, theme and radius, then copy one command to set up your project — RTL-first, Persian-typography components built on Base UI.",
}

export default function CreatePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">ساخت پروژه جدید</h1>
        <p className="text-muted-foreground text-sm leading-loose">
          رنگ پایه، تم و گردی گوشه‌ها را انتخاب کنید؛ پیش‌نمایش زنده را ببینید
          و با یک دستور پروژه‌تان را راه‌اندازی کنید.
        </p>
      </div>
      <CreateApp />
    </div>
  )
}
