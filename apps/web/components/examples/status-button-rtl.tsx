"use client"

import { StatusButton } from "@workspace/ui/components/status-button"

function fakeRequest() {
  return new Promise<void>((resolve) => setTimeout(resolve, 1500))
}

export function StatusButtonRtlExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <StatusButton onClick={fakeRequest} successLabel="ارسال شد">
        ارسال
      </StatusButton>

      <StatusButton
        variant="outline"
        onClick={fakeRequest}
        successLabel="ذخیره شد"
      >
        ذخیره
      </StatusButton>

      <StatusButton
        size="sm"
        variant="secondary"
        onClick={fakeRequest}
        successLabel="کپی شد"
      >
        کپی
      </StatusButton>
    </div>
  )
}
