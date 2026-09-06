"use client"

// Mirrors the shadcn /create customizer: live preview panel + a Card of
// pickers (Base UI menus) with copy/random/reset actions and a Get Code
// primary action. Preset state syncs to ?preset=CODE.

import * as React from "react"
import { CheckIcon, DicesIcon, RotateCcwIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { decodePreset, encodePreset, isPresetCode } from "persianlabsui/preset"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"
import {
  BASE_COLORS,
  RADII,
  THEMES,
  buildPreviewStyle,
  getBaseColorSwatch,
  getThemeSwatch,
  type BaseColorName,
  type RadiusName,
  type ThemeName,
} from "@/lib/create/config"
import { CopyButton } from "@/components/copy-button"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerTrigger,
} from "@/components/create/picker"

type CreateState = {
  baseColor: BaseColorName
  theme: ThemeName
  radius: RadiusName
}

const DEFAULT_STATE: CreateState = {
  baseColor: "neutral",
  theme: "neutral",
  radius: "default",
}

const DEFAULT_PRESET_INPUT = {
  style: "taymaz",
  font: "geist",
  fontHeading: "inherit",
  faFont: "vazirmatn",
  faFontHeading: "vazirmatn",
} as const

const pick = <T,>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)] as T

function encodeState(state: CreateState) {
  return encodePreset({ ...DEFAULT_PRESET_INPUT, ...state })
}

function decodeState(code: string): CreateState | null {
  const decoded = decodePreset(code)
  if (!decoded) return null
  return {
    baseColor: decoded.baseColor as BaseColorName,
    theme: decoded.theme as ThemeName,
    radius: decoded.radius as RadiusName,
  }
}

export function CreateApp() {
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === "dark" ? "dark" : "light"
  const [state, setState] = React.useState<CreateState | null>(null)
  const [copied, setCopied] = React.useState(false)

  // Read the preset from the URL once on mount (?preset=CODE).
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const preset = params.get("preset")
    if (preset && isPresetCode(preset)) {
      const decoded = decodeState(preset)
      if (decoded) {
        setState(decoded)
        return
      }
    }
    setState(DEFAULT_STATE)
  }, [])

  const update = (patch: Partial<CreateState>) => {
    if (!state) return
    const next = { ...state, ...patch }
    setState(next)
    const url = new URL(window.location.href)
    url.searchParams.set("preset", encodeState(next))
    window.history.replaceState(null, "", url)
  }

  const random = () => {
    update({
      baseColor: pick(BASE_COLORS).value,
      theme: pick(THEMES).value,
      radius: pick(RADII).value,
    })
  }

  const copyCommand = async () => {
    if (!state) return
    await navigator.clipboard.writeText(
      `npx persianlabsui init --preset ${encodeState(state)}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!state) {
    return (
      <div className="bg-muted h-[60vh] animate-pulse rounded-2xl" aria-hidden />
    )
  }

  const currentBaseColor = BASE_COLORS.find((b) => b.value === state.baseColor)
  const currentTheme = THEMES.find((t) => t.value === state.theme)
  const currentRadius = RADII.find((r) => r.value === state.radius)
  const defaultRadius = RADII.find((r) => r.value === "default")
  const otherRadii = RADII.filter((r) => r.value !== "default")

  return (
    <div className="bg-background/40 section-soft relative flex min-h-[70vh] flex-col gap-4 overflow-hidden rounded-2xl p-4 md:flex-row-reverse">
      {/* Live preview */}
      <div
        dir="rtl"
        style={buildPreviewStyle(
          state.baseColor,
          state.theme,
          state.radius,
          mode
        )}
        className="bg-background text-foreground border-border min-h-0 min-w-0 flex-1 rounded-2xl border p-6"
      >
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-medium">پنل کاربری سیما</h2>
              <Badge>فعال</Badge>
            </div>
            <p className="text-muted-foreground text-sm leading-loose">
              خوش آمدید! ۱۲۳ سفارش فعال دارید و ۴۵ پیام خوانده‌نشده در صندوق
              شماست. اشتراک شما تا ۱۴۰۴/۰۶/۱۵ اعتبار دارد.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button>ادامه</Button>
              <Button variant="outline">انصراف</Button>
              <Button variant="secondary">ذخیره</Button>
              <Button variant="destructive">حذف</Button>
            </div>
          </section>

          <section className="flex flex-wrap items-center gap-2">
            <Input placeholder="جست‌وجو کنید…" className="max-w-56" />
            <label className="ring-ring/50 border-border flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
              <Checkbox defaultChecked />
              یادآوری کن
            </label>
            <Badge variant="secondary">۱۲۳</Badge>
            <Badge variant="outline">پیش‌نویس</Badge>
          </section>

          <Card>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">
                    فاکتور شماره ۸۸۹۰۰
                  </span>
                  <span className="text-muted-foreground text-xs">
                    سررسید پرداخت: ۱۴۰۴/۰۶/۱۵ — مبلغ: ۱٬۲۳۴٬۵۶۷ تومان
                  </span>
                </div>
                <Badge variant="outline">در انتظار</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm">پرداخت</Button>
                <Button size="sm" variant="ghost">
                  دانلود PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <section dir="ltr" className="flex flex-col gap-3 text-start">
            <h3 className="font-medium">English preview</h3>
            <p className="text-muted-foreground text-sm">
              Geist handles Latin text while digits follow the base style —
              1234567890, order #456 shipped on 2026-09-06.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="outline">
                Export CSV
              </Button>
              <Badge variant="outline">v2.4.0</Badge>
            </div>
          </section>
        </div>
      </div>

      {/* Customizer */}
      <Card className="max-h-full min-h-0 w-full self-start md:w-72">
        <CardHeader className="border-b">
          <span className="text-sm font-medium">شخصی‌سازی</span>
        </CardHeader>
        <CardContent className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3 py-3">
            <PickerField
              label="Base Color"
              value={currentBaseColor?.title}
              swatch={getBaseColorSwatch(state.baseColor)}
            >
              <PickerRadioGroup
                value={state.baseColor}
                onValueChange={(value) =>
                  update({ baseColor: value as BaseColorName })
                }
              >
                <PickerGroup>
                  {BASE_COLORS.map((baseColor) => (
                    <PickerRadioItem key={baseColor.value} value={baseColor.value}>
                      {baseColor.title}
                    </PickerRadioItem>
                  ))}
                </PickerGroup>
              </PickerRadioGroup>
            </PickerField>

            <PickerField
              label="Theme"
              value={currentTheme?.title}
              swatch={getThemeSwatch(state.theme)}
            >
              <PickerRadioGroup
                value={state.theme}
                onValueChange={(value) => update({ theme: value as ThemeName })}
              >
                <PickerGroup>
                  {THEMES.map((theme) => (
                    <PickerRadioItem key={theme.value} value={theme.value}>
                      {theme.title}
                    </PickerRadioItem>
                  ))}
                </PickerGroup>
              </PickerRadioGroup>
            </PickerField>

            <PickerField
              label="Radius"
              value={currentRadius?.title}
              swatch={undefined}
              radiusIcon
            >
              <PickerRadioGroup
                value={state.radius}
                onValueChange={(value) =>
                  update({ radius: value as RadiusName })
                }
              >
                <PickerGroup>
                  {defaultRadius && (
                    <PickerRadioItem value={defaultRadius.value}>
                      {defaultRadius.title}
                    </PickerRadioItem>
                  )}
                </PickerGroup>
                <PickerSeparator />
                <PickerGroup>
                  {otherRadii.map((radius) => (
                    <PickerRadioItem key={radius.value} value={radius.value}>
                      {radius.title}
                    </PickerRadioItem>
                  ))}
                </PickerGroup>
              </PickerRadioGroup>
            </PickerField>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              className="min-w-0 flex-1"
              onClick={copyCommand}
            >
              {copied ? (
                <CheckIcon className="size-4" />
              ) : (
                <span className="truncate text-xs" dir="ltr">
                  npx persianlabsui init --preset {encodeState(state)}
                </span>
              )}
            </Button>
            <CopyButton
              text={`npx persianlabsui init --preset ${encodeState(state)}`}
              className="border-border hover:bg-muted size-9 shrink-0 rounded-lg border"
            />
          </div>
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1" onClick={random}>
              <DicesIcon className="size-4" />
              Random
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => update(DEFAULT_STATE)}
            >
              <RotateCcwIcon className="size-4" />
              Reset
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

// One customizer row: a menu trigger styled like shadcn's (label + value +
// swatch) with the picker content anchored to it.
function PickerField({
  label,
  value,
  swatch,
  radiusIcon,
  children,
}: {
  label: string
  value?: string
  swatch?: string
  radiusIcon?: boolean
  children: React.ReactNode
}) {
  return (
    <Picker>
      <PickerTrigger>
        <div className="flex flex-col justify-start text-left">
          <div className="text-muted-foreground text-xs">{label}</div>
          <div className="text-foreground text-sm font-medium">{value}</div>
        </div>
        {swatch && (
          <span
            style={{ background: swatch }}
            className="border-border pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full select-none md:right-2.5"
          />
        )}
        {radiusIcon && !swatch && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-foreground pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rotate-90 select-none md:right-2.5"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 20v-5C4 8.925 8.925 4 15 4h5"
            />
          </svg>
        )}
      </PickerTrigger>
      <PickerContent side="bottom" align="start">
        {children}
      </PickerContent>
    </Picker>
  )
}
