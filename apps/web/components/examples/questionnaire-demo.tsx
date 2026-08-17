"use client"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"

export function QuestionnaireDemoExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="role" required>
        <QuestionnaireTitle>نقش شما در تیم چیست؟</QuestionnaireTitle>
        <QuestionnaireDescription>
          نزدیک‌ترین گزینه به نقش فعلی‌تان را انتخاب کنید.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="developer">
            توسعه‌دهنده
          </QuestionnaireChoice>
          <QuestionnaireChoice value="designer">طراح</QuestionnaireChoice>
          <QuestionnaireChoice value="product">مدیر محصول</QuestionnaireChoice>
          <QuestionnaireChoice value="other">سایر</QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="نقش خود را بنویسید"
            placeholder="نقش شما..."
          />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="tools" multiple>
        <QuestionnaireTitle>
          از کدام ابزارها استفاده می‌کنید؟
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          اختیاری است — هر تعداد گزینه که می‌خواهید انتخاب کنید.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="figma">فیگما</QuestionnaireChoice>
          <QuestionnaireChoice value="notion">نوشن</QuestionnaireChoice>
          <QuestionnaireChoice value="linear">لینیر</QuestionnaireChoice>
          <QuestionnaireChoice value="slack">اسلک</QuestionnaireChoice>
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
