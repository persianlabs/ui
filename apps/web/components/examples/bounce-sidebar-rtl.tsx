"use client"

import {
  BounceSidebar,
  type BounceSidebarItem,
} from "@workspace/ui/components/bounce-sidebar"

const items: BounceSidebarItem[] = [
  { label: "شروع", heading: true },
  { label: "خانه", href: "#" },
  { label: "پروفایل", href: "#" },
  { label: "پیام‌ها", href: "#" },
  { label: "تنظیمات", heading: true },
  { label: "عمومی", href: "#" },
  { label: "صورتحساب", href: "#" },
]

export function BounceSidebarRtlExample() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <BounceSidebar items={items} defaultValue={1} dotColor="#0EA5E9" />
    </div>
  )
}
