"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"
import { cn } from "@workspace/ui/lib/utils"

const steps = [
  { name: "os", label: "سیستم‌عامل" },
  { name: "editor", label: "ویرایشگر کد" },
  { name: "theme", label: "تم رنگی" },
] as const

export function QuestionnaireControlledExample() {
  const [item, setItem] = React.useState<string>("os")

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center gap-2">
        {steps.map((step) => (
          <Button
            key={step.name}
            type="button"
            size="xs"
            variant={item === step.name ? "default" : "outline"}
            className={cn("flex-1")}
            onClick={() => setItem(step.name)}
          >
            {step.label}
          </Button>
        ))}
      </div>

      <Questionnaire
        item={item}
        onItemChange={setItem}
        onSubmit={(event) => event.preventDefault()}
      >
        <QuestionnaireItem name="os" required>
          <QuestionnaireTitle>
            از چه سیستم‌عاملی استفاده می‌کنید؟
          </QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="macos">مک‌اواس</QuestionnaireChoice>
            <QuestionnaireChoice value="windows">ویندوز</QuestionnaireChoice>
            <QuestionnaireChoice value="linux">لینوکس</QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>

        <QuestionnaireItem name="editor" required>
          <QuestionnaireTitle>ویرایشگر کد اصلی‌تان چیست؟</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="vscode">وی‌اس‌کد</QuestionnaireChoice>
            <QuestionnaireChoice value="vim">
              وی‌ام / نئوویم
            </QuestionnaireChoice>
            <QuestionnaireChoice value="jetbrains">
              جت‌برینز
            </QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>

        <QuestionnaireItem name="theme" required>
          <QuestionnaireTitle>تم رنگی مورد علاقه‌تان؟</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="dark">تیره</QuestionnaireChoice>
            <QuestionnaireChoice value="light">روشن</QuestionnaireChoice>
            <QuestionnaireChoice value="system">
              هماهنگ با سیستم
            </QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <div className="flex items-center gap-2">
            <QuestionnaireNext />
            <QuestionnaireSubmit />
          </div>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
