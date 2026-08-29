"use client"

import { ProximitySidebar } from "@workspace/ui/components/proximity-sidebar"

const sections = [
  { id: "psr-moghadame", label: "مقدمه", level: 1 },
  { id: "psr-nasb", label: "نصب", level: 2 },
  { id: "psr-karbord", label: "کاربرد", kind: "section" },
  { id: "psr-yaddasht", label: "یادداشت‌ها", kind: "body" },
  { id: "psr-porseshha", label: "پرسش‌های پرتکرار", level: 2 },
] as const

const content: Record<(typeof sections)[number]["id"], string> = {
  "psr-moghadame": "مینی‌نقشه ساختار خواندن سند را منعکس می‌کند؛ هر خط یک بخش.",
  "psr-nasb": "کامپوننت را نصب کنید و شناسه‌های متناظر را روی محتوا بگذارید.",
  "psr-karbord": "رابط کاربری کوچک است: بخش‌ها، سمت، و نسبت لنگر فعال.",
  "psr-yaddasht": "هر خط یک دکمه واقعی با برچسب دسترس‌پذیر است، نه تزئین.",
  "psr-porseshha":
    "کلیک روی هر خط به بخش متناظر اسکرول می‌کند و آن را پالس می‌دهد.",
}

export function ProximitySidebarRtlExample() {
  return (
    <div
      dir="rtl"
      className="flex h-72 overflow-hidden rounded-xl border bg-card"
    >
      <aside className="h-full py-4">
        <ProximitySidebar sections={[...sections]} />
      </aside>
      <div className="h-full flex-1 space-y-24 overflow-y-auto p-6">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h3 className="text-sm font-semibold">{section.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {content[section.id]}
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
