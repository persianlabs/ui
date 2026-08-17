"use client"

import { CheckIcon, CircleIcon, SkipForwardIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
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

export function QuestionnaireNavigationStateExample() {
  return (
    <Questionnaire
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="feedback" required>
        <QuestionnaireTitle>
          از تجربه اخیرتان چقدر راضی بودید؟
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="satisfied">راضی</QuestionnaireChoice>
          <QuestionnaireChoice value="neutral">خنثی</QuestionnaireChoice>
          <QuestionnaireChoice value="unsatisfied">ناراضی</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireItem name="follow-up" required>
        <QuestionnaireTitle>
          می‌توانیم برای جزئیات بیشتر تماس بگیریم؟
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="yes">بله</QuestionnaireChoice>
          <QuestionnaireChoice value="no">خیر</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <div className="flex items-center gap-2">
          <QuestionnaireNext
            render={(nextProps, state) => (
              <Button
                {...nextProps}
                type="button"
                size="sm"
                variant={state.status === "answered" ? "default" : "outline"}
                className={cn("gap-1.5", nextProps.className as string)}
              >
                {state.status === "answered" ? (
                  <CheckIcon />
                ) : state.status === "skipped" ? (
                  <SkipForwardIcon />
                ) : (
                  <CircleIcon />
                )}
                {state.status === "answered"
                  ? "پاسخ ثبت شد، ادامه"
                  : state.status === "skipped"
                    ? "رد شد، ادامه"
                    : "ابتدا پاسخ دهید"}
              </Button>
            )}
          />
          <QuestionnaireSubmit />
        </div>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
