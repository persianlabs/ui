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

export function QuestionnaireMultipleExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireItem name="notifications" multiple required>
        <QuestionnaireTitle>چه اعلان‌هایی برایتان مهم است؟</QuestionnaireTitle>
        <QuestionnaireDescription>
          حداقل یک مورد را انتخاب کنید — می‌توانید چند گزینه را هم‌زمان انتخاب
          کنید.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="comments">
            کامنت‌های جدید
          </QuestionnaireChoice>
          <QuestionnaireChoice value="mentions">
            زمانی که منشن می‌شوم
          </QuestionnaireChoice>
          <QuestionnaireChoice value="deploys">
            گزارش استقرار (Deploy)
          </QuestionnaireChoice>
          <QuestionnaireChoice value="billing">
            یادآوری صورت‌حساب
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireActions className="justify-end">
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  )
}
