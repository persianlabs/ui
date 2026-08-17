"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
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

export function QuestionnaireCardExample() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>نظرسنجی رضایت مشتری</CardTitle>
        <CardDescription>
          دو سؤال کوتاه — کمتر از یک دقیقه زمان می‌برد.
        </CardDescription>
      </CardHeader>
      <Questionnaire onSubmit={(event) => event.preventDefault()}>
        <CardContent className="flex flex-col gap-4">
          <QuestionnaireProgress />

          <QuestionnaireItem name="rating" required>
            <QuestionnaireTitle>
              تجربه‌تان با محصول را چطور ارزیابی می‌کنید؟
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="5">عالی</QuestionnaireChoice>
              <QuestionnaireChoice value="4">خوب</QuestionnaireChoice>
              <QuestionnaireChoice value="3">متوسط</QuestionnaireChoice>
              <QuestionnaireChoice value="2">ضعیف</QuestionnaireChoice>
            </QuestionnaireChoices>
          </QuestionnaireItem>

          <QuestionnaireItem name="recommend" required>
            <QuestionnaireTitle>
              آیا محصول را به دیگران پیشنهاد می‌دهید؟
            </QuestionnaireTitle>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="yes">
                بله، پیشنهاد می‌کنم
              </QuestionnaireChoice>
              <QuestionnaireChoice value="no">
                خیر، پیشنهاد نمی‌کنم
              </QuestionnaireChoice>
            </QuestionnaireChoices>
          </QuestionnaireItem>
        </CardContent>
        <CardFooter>
          <QuestionnaireActions className="w-full">
            <QuestionnairePrevious />
            <div className="flex items-center gap-2">
              <QuestionnaireNext />
              <QuestionnaireSubmit />
            </div>
          </QuestionnaireActions>
        </CardFooter>
      </Questionnaire>
    </Card>
  )
}
