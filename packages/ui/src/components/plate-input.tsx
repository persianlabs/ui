"use client"

import { AccessibilityIcon } from "lucide-react"
import * as React from "react"

import { InputGroup } from "@workspace/ui/components/input-group"
import { InputGroupInput } from "@workspace/ui/components/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { normalizePersianDigits } from "@workspace/ui/lib/normalize-persian-digits"
import { cn } from "@workspace/ui/lib/utils"

export interface PlateValue {
  /** The two digits on the right of the plate, e.g. "57". */
  twoDigit: string
  /** The Persian letter, or {@link DISABLED_PLATE_LETTER} for the wheelchair plate. */
  letter: string
  /** The three digits left of the letter, e.g. "555". */
  threeDigit: string
  /** The two-digit Iran code next to the ایران caption, e.g. "11". */
  serial: string
}

/** Value used for the accessibility (wheelchair) plate option. */
export const DISABLED_PLATE_LETTER = "معلولان"

/** Every plate letter the picker offers — the same set and order AZKI uses. */
export const PLATE_LETTERS: ReadonlyArray<{
  value: string
  label: string
}> = [
  { value: "ا", label: "الف" },
  { value: "ب", label: "ب" },
  { value: "پ", label: "پ" },
  { value: "ت", label: "ت" },
  { value: "ث", label: "ث" },
  { value: "ج", label: "ج" },
  { value: "ح", label: "ح" },
  { value: "د", label: "د" },
  { value: "ر", label: "ر" },
  { value: "ز", label: "ز" },
  { value: "ژ", label: "ژ" },
  { value: "س", label: "س" },
  { value: "ش", label: "ش" },
  { value: "ص", label: "ص" },
  { value: "ض", label: "ض" },
  { value: "ط", label: "ط" },
  { value: "ظ", label: "ظ" },
  { value: "ع", label: "ع" },
  { value: "ف", label: "ف" },
  { value: "ق", label: "ق" },
  { value: "ک", label: "ک" },
  { value: "گ", label: "گ" },
  // Latin-lettered special plates (diplomatic / service types).
  { value: "D", label: "D" },
  { value: "S", label: "S" },
]

/**
 * The value an untouched PlateInput holds — letter defaults to الف ("ا").
 * Seed controlled state with this so external mirrors stay in sync from
 * the first render.
 */
export const DEFAULT_PLATE_VALUE: PlateValue = {
  twoDigit: "",
  letter: "ا",
  threeDigit: "",
  serial: "",
}

function mergePlate(patch?: Partial<PlateValue>): PlateValue {
  return { ...DEFAULT_PLATE_VALUE, ...patch }
}

function onlyDigits(raw: string, maxLength: number) {
  return normalizePersianDigits(raw).replace(/\D/g, "").slice(0, maxLength)
}

/** Strips separators/ZWNJ before comparing against the known letters. */
function matchLetter(candidate: string): string {
  const clean = candidate.replace(/[\s\u200C._\-|/\\]/g, "")
  if (/^(معلولان|الف|♿)$/.test(clean)) {
    return /^(معلولان|♿)$/.test(clean) ? DISABLED_PLATE_LETTER : "ا"
  }
  const found = PLATE_LETTERS.find(
    (item) =>
      item.value === clean || item.label.replace(/\u200C/g, "") === clean
  )
  return found?.value ?? ""
}

/**
 * Understands full-plate pastes in any reasonable shape — "57-الف-555-55",
 * "57 ب 555 ایران 11", "57الف55511", "۵۷/ص/۵۵۵/۱۱" — by splitting the text
 * into digit runs and Persian-letter runs. Returns null when the text isn't
 * recognizably a plate (or more than one segment's worth), so plain pastes
 * keep filling just the focused segment.
 */
function parsePlateText(raw: string): Partial<PlateValue> | null {
  const tokens = normalizePersianDigits(raw).match(/\d+|[^\d]+/g)
  if (!tokens) return null

  const digitRuns: string[] = []
  let letter = ""

  for (const token of tokens) {
    if (/^\d/.test(token)) {
      digitRuns.push(token)
    } else if (!letter && /[\u0600-\u06FF\u267F]/.test(token)) {
      letter = matchLetter(token)
    }
  }

  const [first = "", second = "", third = ""] = digitRuns

  if (third) {
    return {
      twoDigit: first.slice(0, 2),
      ...(letter ? { letter } : {}),
      threeDigit: second.slice(0, 3),
      serial: third.slice(0, 2),
    }
  }

  if (second && letter) {
    return {
      twoDigit: first.slice(0, 2),
      letter,
      threeDigit: second.slice(0, 3),
    }
  }

  return null
}

export interface PlateInputProps extends Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> {
  /** The controlled plate value. */
  value?: Partial<PlateValue>
  /** The initial plate value when uncontrolled. */
  defaultValue?: Partial<PlateValue>
  /** Called with the full value whenever any segment changes. */
  onValueChange?: (value: PlateValue) => void
  disabled?: boolean
  /** Marks the whole plate invalid, e.g. when validation fails on submit. */
  invalid?: boolean
}

/**
 * A segmented Iranian vehicle license plate input. Plates have no RTL
 * rendering — the flag/IR/IRAN band sits on the physical left — so the
 * component is forced LTR regardless of the surrounding direction.
 *
 * An `id` passed to the component lands on the first digit input, so
 * `<label htmlFor>` clicks (and Field/label association generally) focus
 * the plate where typing starts.
 */
export function PlateInput({
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  invalid,
  className,
  id,
  ...props
}: PlateInputProps) {
  // The value is an object, so the shared useControllableState hook (which
  // switches on reference equality) would fight callers passing inline
  // literals — control detection is done manually instead.
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = React.useState<PlateValue>(() =>
    mergePlate(defaultValue)
  )
  const value = isControlled ? mergePlate(valueProp) : internalValue

  const twoDigitRef = React.useRef<HTMLInputElement>(null)
  const letterRef = React.useRef<HTMLSpanElement>(null)
  const threeDigitRef = React.useRef<HTMLInputElement>(null)
  const serialRef = React.useRef<HTMLInputElement>(null)

  // The letter picker opens itself when the flow reaches it, even if a
  // letter was already chosen — picking again stays one keystroke away.
  const [letterOpen, setLetterOpen] = React.useState(false)

  // The select trigger's ref is owned by SelectTrigger (for direction
  // measurement), so focusing goes through a wrapper instead.
  const focusLetter = React.useCallback(() => {
    letterRef.current?.querySelector<HTMLButtonElement>("button")?.focus()
    setLetterOpen(true)
  }, [])

  // Clicking dead space (padding, gaps, the band, the divider) lands on the
  // first empty segment, mirroring how single-input fields behave when their
  // label or container is clicked. Interactive children opt out.
  const handleGroupClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).closest("input, button")) return
      if (value.twoDigit.length < 2) return twoDigitRef.current?.focus()
      if (!value.letter) return focusLetter()
      if (value.threeDigit.length < 3) return threeDigitRef.current?.focus()
      if (value.serial.length < 2) return serialRef.current?.focus()
      twoDigitRef.current?.focus()
    },
    [value, focusLetter]
  )

  const setValue = React.useCallback(
    (patch: Partial<PlateValue>) => {
      const next = { ...value, ...patch }
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    },
    [value, isControlled, onValueChange]
  )

  // Full-plate pastes (any format) replace every segment; unrecognized text
  // falls through to the browser's default paste and fills one segment.
  const applyParsedPlate = React.useCallback(
    (raw: string): boolean => {
      const parsed = parsePlateText(raw)
      if (!parsed) return false
      setValue(parsed)
      return true
    },
    [setValue]
  )

  const handleSegmentPaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    if (applyParsedPlate(event.clipboardData.getData("text"))) {
      event.preventDefault()
    }
  }

  const complete =
    value.twoDigit.length === 2 &&
    value.letter !== "" &&
    value.threeDigit.length === 3 &&
    value.serial.length === 2

  return (
    <InputGroup
      dir="ltr"
      role="group"
      data-slot="plate-input"
      data-complete={complete ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      aria-invalid={invalid || undefined}
      onClick={handleGroupClick}
      className={cn(
        "h-fit w-fit gap-1 bg-background p-1.5 select-none dark:bg-background",
        invalid &&
          "border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40",
        className
      )}
      {...props}
    >
      {/* Country band — flag over IR over IRAN, aligned to the plate's edge. */}
      <div
        data-slot="plate-input-band"
        aria-hidden
        className="flex shrink-0 flex-col items-start gap-0.5 self-stretch rounded-md bg-blue-700 px-1 py-1 text-blue-50 dark:bg-blue-800"
      >
        <IranFlag className="h-2.5 w-auto" />
        <span className="text-[9px] leading-none font-bold">IR</span>
        <span className="text-[8px] leading-none tracking-widest">IRAN</span>
      </div>

      <PlateSegment
        ref={twoDigitRef}
        id={id}
        value={value.twoDigit}
        maxLength={2}
        disabled={disabled}
        invalidEmpty={invalid && value.twoDigit.length === 0}
        aria-label="دو رقم پلاک"
        placeholder="55"
        className="w-10"
        onValueChange={(twoDigit) => setValue({ twoDigit })}
        moveNext={focusLetter}
        onPaste={handleSegmentPaste}
      />

      <span ref={letterRef} className="inline-flex">
        <Select
          open={letterOpen}
          onOpenChange={setLetterOpen}
          value={value.letter || null}
          onValueChange={(letter) => {
            setValue({ letter: letter ?? "" })
            threeDigitRef.current?.focus()
          }}
          disabled={disabled}
        >
          <SelectTrigger
            // Persian letters read RTL even inside the forced-LTR plate; the
            // repo's Select measures this and mirrors the portaled popup too.
            dir="rtl"
            aria-label="حرف پلاک"
            aria-invalid={(invalid && !value.letter) || undefined}
            className={cn(
              "w-16 rounded-md border-0 bg-muted/60 px-1.5 shadow-none focus-visible:ring-3 focus-visible:ring-ring/50 data-[popup-open]:ring-3 data-[popup-open]:ring-ring/50 aria-invalid:ring-destructive/20 [&_svg:not([class*='size-'])]:size-3",
              "aria-invalid:bg-destructive/10 aria-invalid:text-destructive"
            )}
          >
            <SelectValue className="text-base">
              {(letter: string) => {
                if (letter === DISABLED_PLATE_LETTER) {
                  return <AccessibilityIcon className="size-4! text-info" />
                }
                return (
                  PLATE_LETTERS.find((item) => item.value === letter)?.label ??
                  letter
                )
              }}
            </SelectValue>
          </SelectTrigger>
          {/* Fixed narrow width; min-w-0 beats the content part's built-in
              min-w-40, which would otherwise force a wide popup. finalFocus
              keeps Base UI from restoring focus to the trigger on close —
              the three-digit segment is the next stop instead. */}
          <SelectContent
            className="w-[66px] min-w-0"
            finalFocus={threeDigitRef}
          >
            {PLATE_LETTERS.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                // Center the letters (and the wheelchair glyph) so they sit on
                // the popup's axis instead of hugging the check-indicator
                // gutter.
                className="justify-center px-2"
              >
                {item.label}
              </SelectItem>
            ))}
            <SelectItem
              value={DISABLED_PLATE_LETTER}
              className="justify-center px-2"
            >
              <AccessibilityIcon className="text-info" />
              <span className="sr-only">{DISABLED_PLATE_LETTER}</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </span>

      <PlateSegment
        ref={threeDigitRef}
        value={value.threeDigit}
        maxLength={3}
        disabled={disabled}
        invalidEmpty={invalid && value.threeDigit.length === 0}
        aria-label="سه رقم پلاک"
        placeholder="555"
        className="w-12"
        onValueChange={(threeDigit) => setValue({ threeDigit })}
        moveNext={() => serialRef.current?.focus()}
        movePrevious={() => twoDigitRef.current?.focus()}
        onPaste={handleSegmentPaste}
      />

      <span aria-hidden className="w-px self-stretch bg-border" />

      <div
        data-slot="plate-input-serial"
        className="flex cursor-default flex-col items-center justify-center gap-0.5 self-stretch rounded-md bg-muted/60 px-1 py-0.5"
        onClick={(event) => {
          event.currentTarget.querySelector("input")?.focus()
        }}
      >
        <span className="pointer-events-none text-[9px] leading-none text-muted-foreground">
          ایران
        </span>
        <PlateSegment
          ref={serialRef}
          value={value.serial}
          maxLength={2}
          disabled={disabled}
          invalidEmpty={
            (invalid && value.serial.length === 0) || undefined
          }
          aria-label="کد ایران"
          placeholder="55"
          className={cn(
            "w-8 rounded-none bg-transparent px-0.5",
            invalid &&
              value.serial.length === 0 &&
              "border border-destructive/60 bg-destructive/10 text-destructive"
          )}
          onValueChange={(serial) => setValue({ serial })}
          movePrevious={() => threeDigitRef.current?.focus()}
          onPaste={handleSegmentPaste}
        />
      </div>
    </InputGroup>
  )
}
interface PlateSegmentProps
  extends Omit<
    React.ComponentProps<typeof InputGroupInput>,
    "value" | "onChange"
  > {
  value: string
  maxLength: number
  /** When marking failures, this segment is one of the empty culprits. */
  invalidEmpty?: boolean
  onValueChange: (value: string) => void
  moveNext?: () => void
  movePrevious?: () => void
}

function PlateSegment({
  value,
  maxLength,
  invalidEmpty,
  onValueChange,
  moveNext,
  movePrevious,
  className,
  ...props
}: PlateSegmentProps) {
  return (
    <InputGroupInput
      type="tel"
      inputMode="numeric"
      autoComplete="off"
      spellCheck={false}
      value={value}
      aria-invalid={invalidEmpty || undefined}
      onChange={(event) => {
        const next = onlyDigits(event.target.value, maxLength)
        if (next === value) return
        onValueChange(next)
        if (next.length === maxLength && moveNext) {
          moveNext()
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Backspace" && !value && movePrevious) {
          event.preventDefault()
          movePrevious()
        }
      }}
      className={cn(
        "rounded-md bg-muted/60 px-1 text-center text-sm font-medium tracking-[0.15em]",
        invalidEmpty &&
          "border border-destructive/60 bg-destructive/10 text-destructive",
        className
      )}
      {...props}
    />
  )
}

/**
 * Twemoji's Iran flag (Twitter, CC BY 4.0), inlined so the band needs no
 * image asset.
 */
function IranFlag({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      aria-hidden
      className={className}
    >
      <path fill="#da0001" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-4H0z" />
      <path fill="#eee" d="M0 13h36v10H0z" />
      <path fill="#239f40" d="M36 13V9a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v4z" />
      <path fill="#e96667" d="M0 23h36v1H0z" />
      <g fill="#be1931">
        <path d="M19.465 14.969c.957.49 3.038 2.953.798 5.731c1.391-.308 3.162-4.408-.798-5.731m-2.937 0c-3.959 1.323-2.189 5.423-.798 5.731c-2.24-2.778-.159-5.241.798-5.731m1.453-.143c.04.197 1.101.436.974-.573c-.168.408-.654.396-.968.207c-.432.241-.835.182-.988-.227c-.148.754.587.975.982.593" />
        <path d="M20.538 17.904c-.015-1.248-.677-2.352-1.329-2.799c.43.527 1.752 3.436-.785 5.351l.047-5.097l-.475-.418l-.475.398l.08 5.146l-.018-.015c-2.563-1.914-1.233-4.837-.802-5.365c-.652.447-1.315 1.551-1.329 2.799c-.013 1.071.477 2.243 1.834 3.205a6.4 6.4 0 0 1-1.678.201c.464.253 1.34.192 2.007.131l.001.068l.398.437l.4-.455v-.052c.672.062 1.567.129 2.039-.128a6.3 6.3 0 0 1-1.732-.213c1.344-.961 1.83-2.127 1.817-3.194" />
      </g>
      <path fill="#7bc58c" d="M0 12h36v1H0z" />
    </svg>
  )
}
