"use client"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"

export function QuestionnaireShortcutsExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      shortcuts="letters"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireItem name="plan" required>
        <QuestionnaireTitle>کدام پلن برای شما مناسب‌تر است؟</QuestionnaireTitle>
        <QuestionnaireDescription>
          می‌توانید با کلیدهای نشان‌داده‌شده هم پاسخ دهید.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="free">رایگان</QuestionnaireChoice>
          <QuestionnaireChoice value="pro">حرفه‌ای</QuestionnaireChoice>
          <QuestionnaireChoice value="team">تیمی</QuestionnaireChoice>
          <QuestionnaireChoice value="enterprise">سازمانی</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireActions className="justify-end">
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  )
}
