"use client"

import { Button } from "@workspace/ui/components/button"
import { toastManager } from "@workspace/ui/components/toast"

export function ToastRtlExample() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toastManager.add({
          type: "success",
          title: "رویداد ایجاد شد",
          description: "یکشنبه، ۳ آذر، ساعت ۹:۰۰ صبح",
          data: { dir: "rtl" },
          actionProps: {
            children: "واگرد",
            onClick: () =>
              toastManager.add({ title: "واگرد شد", data: { dir: "rtl" } }),
          },
        })
      }
    >
      نمایش اعلان
    </Button>
  )
}
