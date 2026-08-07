"use client"

import * as React from "react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"

export function ContextMenuRtlExample() {
  const [showBookmarks, setShowBookmarks] = React.useState(true)
  const [person, setPerson] = React.useState("sadegh")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
        اینجا کلیک راست کنید
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          بازگشت
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          بارگذاری مجدد
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>ابزارهای بیشتر</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>ذخیره صفحه به‌عنوان...</ContextMenuItem>
            <ContextMenuItem>ایجاد میان‌بر...</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          نمایش نوار نشانک‌ها
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuLabel>افراد</ContextMenuLabel>
          <ContextMenuRadioItem value="sadegh">صادق علوی</ContextMenuRadioItem>
          <ContextMenuRadioItem value="niki">نیکی احمدی</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
