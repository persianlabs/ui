"use client"

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
import { cn } from "@workspace/ui/lib/utils"

export function QuestionnaireCustomProgressExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress
        render={(progressProps, state) => (
          <div
            {...progressProps}
            className="flex items-center justify-center gap-1.5"
          >
            {Array.from({ length: state.total }, (_, index) => (
              <span
                key={index}
                aria-hidden="true"
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  index < state.current ? "bg-primary" : "bg-primary/15"
                )}
              />
            ))}
          </div>
        )}
      />

      <QuestionnaireItem name="cuisine" required>
        <QuestionnaireTitle>غذای مورد علاقه‌تان؟</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="persian">ایرانی</QuestionnaireChoice>
          <QuestionnaireChoice value="italian">ایتالیایی</QuestionnaireChoice>
          <QuestionnaireChoice value="japanese">ژاپنی</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="spice" required>
        <QuestionnaireTitle>سطح تندی مورد نظرتان؟</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="mild">ملایم</QuestionnaireChoice>
          <QuestionnaireChoice value="medium">متوسط</QuestionnaireChoice>
          <QuestionnaireChoice value="hot">تند</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="delivery" required>
        <QuestionnaireTitle>سفارش را چگونه دریافت می‌کنید؟</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="delivery">
            ارسال با پیک
          </QuestionnaireChoice>
          <QuestionnaireChoice value="pickup">دریافت حضوری</QuestionnaireChoice>
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
  )
}
