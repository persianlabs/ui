import type { ApiReferenceRow } from "@/components/api-reference"

export const questionnaireApi: ApiReferenceRow[] = [
  {
    prop: "items",
    type: "readonly { name: string; choices?: readonly { value: string; disabled?: boolean }[]; disabled?: boolean; required?: boolean }[]",
    default: "—",
    description:
      "Optional declarative item list, used to validate the rendered items/choices in development and to compute shortcuts before the choices mount.",
  },
  {
    prop: "item",
    type: "string",
    default: "—",
    description: "The name of the controlled active item.",
  },
  {
    prop: "defaultItem",
    type: "string",
    default: "—",
    description:
      "The name of the initially active item, for an uncontrolled questionnaire. Useful for resuming a saved session.",
  },
  {
    prop: "onItemChange",
    type: "(item: string) => void",
    default: "—",
    description: "Called whenever the active item changes.",
  },
  {
    prop: "shortcuts",
    type: '"letters" | "numbers"',
    default: "—",
    description:
      "Assigns a keyboard shortcut to each choice in the active item, shown via the choice's shortcut badge.",
  },
]

export const questionnaireItemApi: ApiReferenceRow[] = [
  {
    prop: "name",
    type: "string",
    default: "—",
    description: "A unique identifier for this item within the questionnaire.",
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description:
      "Allows selecting more than one choice (renders checkboxes instead of radios).",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description:
      "Requires an answer before the user can move past this item. Also hides the Skip action.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the item and excludes it from navigation, useful for conditional items.",
  },
  {
    prop: "invalid",
    type: "boolean",
    default: "—",
    description: "Marks the item as invalid, for external/custom validation.",
  },
  {
    prop: "onStatusChange",
    type: '(status: "unanswered" | "answered" | "skipped") => void',
    default: "—",
    description: "Called whenever this item's answer status changes.",
  },
]

export const questionnaireChoiceApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "string",
    default: "—",
    description: "The value submitted for this choice.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables this individual choice.",
  },
  {
    prop: "checked",
    type: "boolean",
    default: "—",
    description: "Controls this choice's checked state.",
  },
  {
    prop: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "The initial checked state, for restoring a saved answer.",
  },
]

export const questionnaireInputApi: ApiReferenceRow[] = [
  {
    prop: "type",
    type: '"text" | "email" | "tel" | "url" | "number" | "password" | "search" | "date" | "datetime-local" | "month" | "time" | "week"',
    default: '"text"',
    description: "The input's HTML type.",
  },
  {
    prop: "value",
    type: "string",
    default: "—",
    description: "Controls the input's value.",
  },
  {
    prop: "defaultValue",
    type: "string",
    default: "—",
    description: "The initial value, for restoring a saved answer.",
  },
]

export const questionnaireProgressApi: ApiReferenceRow[] = [
  {
    prop: "render",
    type: "ReactElement | (props, state: { current: number; first: boolean; last: boolean; total: number }) => ReactElement",
    default: "—",
    description:
      "Replaces the default bar with a custom element built from the current step, total steps, and first/last flags.",
  },
]

export const questionnaireNavigationApi: ApiReferenceRow[] = [
  {
    prop: "render",
    type: 'ReactElement | (props, state: { disabled: boolean; shortcut: "Enter" | null; status: "unanswered" | "answered" | "skipped" | null; visible: boolean }) => ReactElement',
    default: "—",
    description:
      "Applies to QuestionnairePrevious, QuestionnaireSkip, QuestionnaireNext, and QuestionnaireSubmit. Lets you style or disable navigation based on the active item's status.",
  },
]
