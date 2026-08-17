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

/**
 * Simulates resuming a previously saved session: `defaultItem` restores which
 * question the user was on, and `defaultChecked` on each choice restores the
 * answer they had already picked before leaving.
 */
export function QuestionnaireResumeExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      defaultItem="frequency"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="channel" required>
        <QuestionnaireTitle>
          کدام کانال ارتباطی را ترجیح می‌دهید؟
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="email" defaultChecked>
            ایمیل
          </QuestionnaireChoice>
          <QuestionnaireChoice value="sms">پیامک</QuestionnaireChoice>
          <QuestionnaireChoice value="push">
            اعلان درون‌برنامه‌ای
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="frequency" required>
        <QuestionnaireTitle>
          چند وقت یک‌بار خبرنامه دریافت کنید؟
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          پاسخ قبلی‌تان از قبل انتخاب شده — می‌توانید همان‌جایی که مانده بودید
          ادامه دهید.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="daily">روزانه</QuestionnaireChoice>
          <QuestionnaireChoice value="weekly" defaultChecked>
            هفتگی
          </QuestionnaireChoice>
          <QuestionnaireChoice value="monthly">ماهانه</QuestionnaireChoice>
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
