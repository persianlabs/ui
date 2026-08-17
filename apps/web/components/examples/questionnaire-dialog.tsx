"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"

export function QuestionnaireDialogExample() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        شروع نظرسنجی
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>نظرسنجی سریع</DialogTitle>
          <DialogDescription>
            دو سؤال کوتاه درباره نحوه استفاده‌تان از برنامه.
          </DialogDescription>
        </DialogHeader>
        <Questionnaire
          onSubmit={(event) => {
            event.preventDefault()
            setOpen(false)
          }}
        >
          <DialogPanel className="flex flex-col gap-4">
            <QuestionnaireProgress />

            <QuestionnaireItem name="usage" required>
              <QuestionnaireTitle>
                چند وقت یک‌بار از برنامه استفاده می‌کنید؟
              </QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="daily">روزانه</QuestionnaireChoice>
                <QuestionnaireChoice value="weekly">هفتگی</QuestionnaireChoice>
                <QuestionnaireChoice value="rarely">
                  به‌ندرت
                </QuestionnaireChoice>
              </QuestionnaireChoices>
            </QuestionnaireItem>

            <QuestionnaireItem name="platform" required>
              <QuestionnaireTitle>
                بیشتر از کدام دستگاه استفاده می‌کنید؟
              </QuestionnaireTitle>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="desktop">
                  دسکتاپ
                </QuestionnaireChoice>
                <QuestionnaireChoice value="mobile">موبایل</QuestionnaireChoice>
              </QuestionnaireChoices>
            </QuestionnaireItem>
          </DialogPanel>

          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              انصراف
            </DialogClose>
            <QuestionnaireActions>
              <QuestionnairePrevious />
              <div className="flex items-center gap-2">
                <QuestionnaireNext />
                <QuestionnaireSubmit />
              </div>
            </QuestionnaireActions>
          </DialogFooter>
        </Questionnaire>
      </DialogPopup>
    </Dialog>
  )
}
