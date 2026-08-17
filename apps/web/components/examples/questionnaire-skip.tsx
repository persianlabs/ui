"use client"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"

export function QuestionnaireSkipExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="team-size" required>
        <QuestionnaireTitle>اندازه تیم شما چقدر است؟</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="solo">فقط خودم</QuestionnaireChoice>
          <QuestionnaireChoice value="small">۲ تا ۱۰ نفر</QuestionnaireChoice>
          <QuestionnaireChoice value="large">بیش از ۱۰ نفر</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="salary">
        <QuestionnaireTitle>بازه حقوق سالانه‌تان چقدر است؟</QuestionnaireTitle>
        <QuestionnaireDescription>
          این سؤال اختیاری است — اگر تمایلی ندارید، رد شوید.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="low">
            تا ۳۰۰ میلیون تومان
          </QuestionnaireChoice>
          <QuestionnaireChoice value="mid">
            ۳۰۰ تا ۶۰۰ میلیون تومان
          </QuestionnaireChoice>
          <QuestionnaireChoice value="high">
            بیش از ۶۰۰ میلیون تومان
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <div className="flex items-center gap-2">
          <QuestionnaireSkip />
          <QuestionnaireSubmit />
        </div>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
