"use client"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"

export function QuestionnaireFreeformExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireItem name="source" required>
        <QuestionnaireTitle>از کجا با ما آشنا شدید؟</QuestionnaireTitle>
        <QuestionnaireDescription>
          اگر گزینه‌ای مناسب نبود، جای خالی زیر را پر کنید.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="twitter">
            توییتر / ایکس
          </QuestionnaireChoice>
          <QuestionnaireChoice value="referral">
            معرفی دوستان
          </QuestionnaireChoice>
          <QuestionnaireChoice value="search">
            جست‌وجوی گوگل
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="منبع آشنایی خود را بنویسید"
            placeholder="یک منبع دیگر..."
          />
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireActions className="justify-end">
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  )
}
