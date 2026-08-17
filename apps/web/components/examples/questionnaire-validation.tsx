"use client"

import * as React from "react"
import { z } from "zod"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"

const phoneSchema = z
  .string()
  .trim()
  .regex(/^09\d{9}$/, "شماره موبایل باید به شکل ۰۹xxxxxxxxx باشد.")

export function QuestionnaireValidationExample() {
  const [value, setValue] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = phoneSchema.safeParse(value)
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "مقدار وارد شده معتبر نیست.")
      return
    }

    setError(null)
  }

  return (
    <Questionnaire className="w-full max-w-sm" onSubmit={handleSubmit}>
      <QuestionnaireItem name="phone" required invalid={error !== null}>
        <QuestionnaireTitle>شماره موبایل خود را وارد کنید</QuestionnaireTitle>
        <QuestionnaireDescription>
          اعتبارسنجی این فیلد با یک شمای zod سفارشی انجام می‌شود، نه فقط با «پر
          بودن» فیلد.
        </QuestionnaireDescription>
        <QuestionnaireInput
          aria-label="شماره موبایل"
          placeholder="09xxxxxxxxx"
          inputMode="numeric"
          autoComplete="tel"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            if (error) setError(null)
          }}
        />
        <QuestionnaireError>{error ?? undefined}</QuestionnaireError>
      </QuestionnaireItem>

      <QuestionnaireActions className="justify-end">
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  )
}
