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

/**
 * `data-active` is added/removed by the primitive as the active item
 * changes, which re-triggers the `animate-in` keyframes each time (the same
 * mechanism Dialog uses for its `data-open:animate-in`). Only `opacity` and
 * `transform` are animated, and `prefers-reduced-motion: reduce` disables the
 * animation globally via this repo's base styles.
 */
const itemAnimationClassName =
  "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-end-2 duration-300"

export function QuestionnaireAnimatedExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem
        name="pace"
        required
        className={itemAnimationClassName}
      >
        <QuestionnaireTitle>
          سرعت کاری‌تان را چطور توصیف می‌کنید؟
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="steady">
            پیوسته و آرام
          </QuestionnaireChoice>
          <QuestionnaireChoice value="bursty">
            موج‌دار، با اسپرینت‌های فشرده
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem
        name="meetings"
        required
        className={itemAnimationClassName}
      >
        <QuestionnaireTitle>
          چند جلسه در هفته را ترجیح می‌دهید؟
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="few">۱ تا ۲ جلسه</QuestionnaireChoice>
          <QuestionnaireChoice value="some">۳ تا ۵ جلسه</QuestionnaireChoice>
          <QuestionnaireChoice value="many">بیش از ۵ جلسه</QuestionnaireChoice>
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
