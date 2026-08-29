import type { ApiReferenceRow } from "@/components/api-reference"

export const durationPickerApi: ApiReferenceRow[] = [
  {
    prop: "value",
    type: "DurationValue",
    typeDetail: "{ hours: number; minutes: number }",
    default: "undefined",
    description:
      "Controlled value. Pair with onChange and the picker will mirror whatever you pass in. Leave it out to let the component manage its own state.",
  },
  {
    prop: "defaultValue",
    type: "DurationValue",
    typeDetail: "{ hours: number; minutes: number }",
    default: "undefined",
    description:
      "Starting value for uncontrolled usage. Ignored when value is provided.",
  },
  {
    prop: "onChange",
    type: "(value: DurationValue) => void",
    default: "—",
    description:
      "Fires on every keystroke with the current clamped value — listen here if you want to react while the user types.",
  },
  {
    prop: "onConfirm",
    type: "(value: DurationValue) => void",
    default: "—",
    description:
      "Fires once with the final value when the tick is clicked. This is usually the one you want for saving.",
  },
  {
    prop: "onEditingChange",
    type: "(editing: boolean) => void",
    default: "—",
    description:
      "Notifies you when the picker enters or leaves edit mode — handy for blocking navigation or dimming surrounding UI while open.",
  },
  {
    prop: "defaultEditing",
    type: "boolean",
    default: "false",
    description: "Render the picker already open in edit mode.",
  },
  {
    prop: "maxHours",
    type: "number",
    default: "24",
    description:
      "Ceiling for the hours field. Typing past it clamps to this value and shakes the input.",
  },
  {
    prop: "maxMinutes",
    type: "number",
    default: "60",
    description:
      "Ceiling for the minutes field. Same clamp-and-shake behavior as maxHours.",
  },
  {
    prop: "hoursLabel",
    type: "string",
    default: '"Hr."',
    description:
      "Text rendered after the hours field — swap it for a translation or a terser 'h'.",
  },
  {
    prop: "minutesLabel",
    type: "string",
    default: '"Min."',
    description: "Text rendered after the minutes field.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Dims the control and blocks entering edit mode. Standard form-field behavior.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: "auto (from the nearest [dir] ancestor)",
    description:
      "Force the text direction. Under RTL the gooey gap opens on the inline-end side and the squircle's outer corners stay on the outer edge.",
  },
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description:
      "Extra classes merged onto the root. Every inner part also carries a data-slot attribute (duration-picker, -segment, -input, -toggle) plus data-editing / data-disabled states, so you can restyle from CSS alone.",
  },
]
