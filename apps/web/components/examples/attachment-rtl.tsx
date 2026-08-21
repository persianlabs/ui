"use client"

import { CheckIcon, FileTextIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@workspace/ui/components/attachment"

export function AttachmentRtlExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Attachment state="done" className="w-full">
        <AttachmentMedia>
          <CheckIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>گزارش-فروش-بهمن.pdf</AttachmentTitle>
          <AttachmentDescription>
            بارگذاری شد · ۱٫۸ مگابایت
          </AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="حذف گزارش-فروش-بهمن.pdf">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment className="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>قرارداد-همکاری.docx</AttachmentTitle>
          <AttachmentDescription>Word · ۳۱۲ کیلوبایت</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="حذف قرارداد-همکاری.docx">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
