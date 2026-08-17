"use client"

import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import type * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

function Questionnaire({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

function QuestionnaireProgress({
  className,
  render,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      render={
        render ??
        ((progressProps, state) => (
          <div
            {...progressProps}
            className={cn(
              "h-1.5 w-full overflow-hidden rounded-full bg-primary/15",
              className
            )}
          >
            <div
              data-slot="questionnaire-progress-indicator"
              className="h-full origin-left rounded-full bg-primary transition-transform duration-300 ease-out rtl:origin-right"
              style={{
                transform: `scaleX(${state.total ? state.current / state.total : 0})`,
              }}
            />
          </div>
        ))
      }
      {...props}
    />
  )
}

function QuestionnaireItem({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      className={cn(
        "m-0 flex min-w-0 flex-col gap-4 border-0 p-0 [&[hidden]]:hidden",
        className
      )}
      {...props}
    />
  )
}

function QuestionnaireTitle({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      className={cn("p-0 text-base font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function QuestionnaireDescription({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function QuestionnaireChoices({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function QuestionnaireChoice({
  className,
  children,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      className={cn(
        "group/questionnaire-choice relative flex cursor-pointer items-center gap-3 rounded-lg border border-input px-3.5 py-2.5 text-sm shadow-xs transition-[border-color,background-color,box-shadow] outline-none select-none has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 data-invalid:border-destructive data-checked:border-primary data-checked:bg-primary/5 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <QuestionnairePrimitive.ChoiceInput
        data-slot="questionnaire-choice-input"
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative flex size-4 shrink-0 items-center justify-center border border-input transition-colors",
          "group-data-checked/questionnaire-choice:border-primary",
          "group-data-[type=radio]/questionnaire-choice:rounded-full",
          "group-data-[type=checkbox]/questionnaire-choice:rounded-[4px]",
          "group-data-[type=checkbox]/questionnaire-choice:group-data-checked/questionnaire-choice:bg-primary"
        )}
      >
        <span className="hidden size-2 rounded-full bg-primary group-data-[type=radio]/questionnaire-choice:group-data-checked/questionnaire-choice:block" />
        <CheckIcon className="hidden size-3 text-primary-foreground group-data-[type=checkbox]/questionnaire-choice:group-data-checked/questionnaire-choice:block" />
      </span>
      <QuestionnairePrimitive.ChoiceLabel
        data-slot="questionnaire-choice-label"
        className="min-w-0 flex-1"
      >
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        data-slot="questionnaire-choice-shortcut"
        className="flex size-5 shrink-0 items-center justify-center rounded border border-input text-xs text-muted-foreground group-data-checked/questionnaire-choice:border-primary/40 group-data-checked/questionnaire-choice:text-primary"
      />
    </QuestionnairePrimitive.Choice>
  )
}

function QuestionnaireInput({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Input>) {
  return (
    <QuestionnairePrimitive.Input
      data-slot="questionnaire-input"
      className={cn(
        "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function QuestionnaireError({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  )
}

function QuestionnaireActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="questionnaire-actions"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  )
}

function QuestionnairePrevious({
  className,
  children,
  render,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Previous>) {
  return (
    <QuestionnairePrimitive.Previous
      data-slot="questionnaire-previous"
      render={render ?? <Button type="button" variant="outline" size="sm" />}
      className={cn("gap-1.5 [&[hidden]]:hidden", className)}
      {...props}
    >
      {children ?? (
        <>
          <ChevronLeftIcon className="rtl:-scale-x-100" />
          Previous
        </>
      )}
    </QuestionnairePrimitive.Previous>
  )
}

function QuestionnaireSkip({
  className,
  children,
  render,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Skip>) {
  return (
    <QuestionnairePrimitive.Skip
      data-slot="questionnaire-skip"
      render={render ?? <Button type="button" variant="ghost" size="sm" />}
      className={cn("[&[hidden]]:hidden", className)}
      {...props}
    >
      {children ?? "Skip"}
    </QuestionnairePrimitive.Skip>
  )
}

function QuestionnaireNext({
  className,
  children,
  render,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Next>) {
  return (
    <QuestionnairePrimitive.Next
      data-slot="questionnaire-next"
      render={render ?? <Button type="button" size="sm" />}
      className={cn("gap-1.5 [&[hidden]]:hidden", className)}
      {...props}
    >
      {children ?? (
        <>
          Next
          <ChevronRightIcon className="rtl:-scale-x-100" />
        </>
      )}
    </QuestionnairePrimitive.Next>
  )
}

function QuestionnaireSubmit({
  className,
  children,
  render,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Submit>) {
  return (
    <QuestionnairePrimitive.Submit
      data-slot="questionnaire-submit"
      render={render ?? <Button type="submit" size="sm" />}
      className={cn("[&[hidden]]:hidden", className)}
      {...props}
    >
      {children ?? "Submit"}
    </QuestionnairePrimitive.Submit>
  )
}

export {
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
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
}
