"use client"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"

export function QuestionnaireRtlExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="city" required>
        <QuestionnaireTitle>در کدام شهر زندگی می‌کنید؟</QuestionnaireTitle>
        <QuestionnaireDescription>
          نزدیک‌ترین کلان‌شهر به محل زندگی‌تان را انتخاب کنید.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="tehran">تهران</QuestionnaireChoice>
          <QuestionnaireChoice value="mashhad">مشهد</QuestionnaireChoice>
          <QuestionnaireChoice value="isfahan">اصفهان</QuestionnaireChoice>
          <QuestionnaireChoice value="shiraz">شیراز</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="commute" multiple>
        <QuestionnaireTitle>معمولاً چطور رفت‌وآمد می‌کنید؟</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="metro">مترو</QuestionnaireChoice>
          <QuestionnaireChoice value="car">خودروی شخصی</QuestionnaireChoice>
          <QuestionnaireChoice value="taxi">تاکسی اینترنتی</QuestionnaireChoice>
          <QuestionnaireChoice value="bike">دوچرخه</QuestionnaireChoice>
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
