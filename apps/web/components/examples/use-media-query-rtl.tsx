"use client"

import { useMediaQuery } from "@workspace/ui/hooks/use-media-query"

export function UseMediaQueryRtlExample() {
  const isDesktop = useMediaQuery("lg")

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm text-muted-foreground">
        اندازه صفحه دسکتاپ است؟
      </span>
      <span className="text-2xl font-semibold">
        {isDesktop ? "بله" : "خیر"}
      </span>
      <span className="text-xs text-muted-foreground">
        اندازه پنجره را تغییر دهید تا مقدار به‌روزرسانی شود.
      </span>
    </div>
  )
}
