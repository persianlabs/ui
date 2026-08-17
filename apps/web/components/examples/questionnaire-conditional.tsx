"use client"

import * as React from "react"

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

export function QuestionnaireConditionalExample() {
  const [usesTeamPlan, setUsesTeamPlan] = React.useState(false)

  return (
    <Questionnaire
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="team-plan" required>
        <QuestionnaireTitle>
          آیا از پلن تیمی استفاده می‌کنید؟
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice
            value="yes"
            onChange={(event) => setUsesTeamPlan(event.target.checked)}
          >
            بله
          </QuestionnaireChoice>
          <QuestionnaireChoice
            value="no"
            onChange={(event) => setUsesTeamPlan(!event.target.checked)}
          >
            خیر
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="seats" required disabled={!usesTeamPlan}>
        <QuestionnaireTitle>چند صندلی (Seat) نیاز دارید؟</QuestionnaireTitle>
        <QuestionnaireDescription>
          {usesTeamPlan
            ? "بر اساس پاسخ قبلی‌تان فعال شده است."
            : "چون پلن تیمی را انتخاب نکردید، این سؤال غیرفعال است."}
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="small">۲ تا ۵ صندلی</QuestionnaireChoice>
          <QuestionnaireChoice value="medium">
            ۶ تا ۲۰ صندلی
          </QuestionnaireChoice>
          <QuestionnaireChoice value="large">
            بیش از ۲۰ صندلی
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
  )
}
