"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxVirtualList,
} from "@/components/ui/combobox"
import {
  persianProvinces,
  type PersianCity,
  type PersianProvince,
} from "@/lib/persian-provinces"
import { cn } from "@/lib/utils"

export type CitySelectorLocale = "fa" | "en"

export interface CitySelectorValue {
  province: PersianProvince | null
  city: PersianCity | null
}

const EMPTY_VALUE: CitySelectorValue = { province: null, city: null }

const STRINGS: Record<
  CitySelectorLocale,
  {
    province: string
    city: string
    selectProvinceFirst: string
    noProvinces: string
    noCities: string
  }
> = {
  fa: {
    province: "استان",
    city: "شهر",
    selectProvinceFirst: "ابتدا استان را انتخاب کنید",
    noProvinces: "استانی یافت نشد.",
    noCities: "شهری یافت نشد.",
  },
  en: {
    province: "Province",
    city: "City",
    selectProvinceFirst: "Select a province first",
    noProvinces: "No provinces found.",
    noCities: "No cities found.",
  },
}

/**
 * Reads the effective CSS `direction` of `ref`'s own element, re-checking
 * whenever any ancestor's `dir` attribute changes. Only meaningful while the
 * element itself has no explicit `dir` — otherwise it would just echo back
 * its own forced value.
 */
function useAutoLocale(
  ref: React.RefObject<HTMLElement | null>,
  initialLocale: CitySelectorLocale
) {
  const [locale, setLocale] = React.useState<CitySelectorLocale>(initialLocale)

  React.useEffect(() => {
    function update() {
      const direction = ref.current
        ? getComputedStyle(ref.current).direction
        : "rtl"
      setLocale(direction === "rtl" ? "fa" : "en")
    }

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
      subtree: true,
    })

    return () => observer.disconnect()
  }, [ref])

  return locale
}

interface CitySelectorContextValue {
  value: CitySelectorValue
  setValue: (value: CitySelectorValue) => void
  locale: CitySelectorLocale
  strings: (typeof STRINGS)["fa"]
  disabled?: boolean
  getProvinceLabel: (item: PersianProvince) => string
  getCityLabel: (item: PersianCity) => string
}

const CitySelectorContext =
  React.createContext<CitySelectorContextValue | null>(null)

function useCitySelectorContext(component: string) {
  const context = React.useContext(CitySelectorContext)
  if (!context) {
    throw new Error(`<${component} /> must be used within <CitySelector>.`)
  }
  return context
}

function CitySelector({
  value,
  defaultValue = EMPTY_VALUE,
  onValueChange,
  locale: localeProp,
  initialLocale = "fa",
  disabled,
  className,
  children,
}: {
  value?: CitySelectorValue
  defaultValue?: CitySelectorValue
  onValueChange?: (value: CitySelectorValue) => void
  /** Force "fa" or "en" labels, placeholders, and text direction. Defaults to following the document's text direction. */
  locale?: CitySelectorLocale
  /** Locale to render before the automatic direction check runs. Use this when the server already knows the initial direction. */
  initialLocale?: CitySelectorLocale
  disabled?: boolean
  className?: string
  /** Defaults to `<CitySelectorProvince /><CitySelectorCity />`. Pass your own children to fully customize the layout. */
  children?: React.ReactNode
}) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const autoLocale = useAutoLocale(rootRef, initialLocale)
  const locale = localeProp ?? autoLocale
  const strings = STRINGS[locale]

  const getProvinceLabel = React.useCallback(
    (item: PersianProvince) => (locale === "en" ? item.nameEn : item.name),
    [locale]
  )
  const getCityLabel = React.useCallback(
    (item: PersianCity) => (locale === "en" ? item.nameEn : item.name),
    [locale]
  )

  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const resolvedValue = value ?? internalValue

  const setValue = React.useCallback(
    (next: CitySelectorValue) => {
      setInternalValue(next)
      onValueChange?.(next)
    },
    [onValueChange]
  )

  const contextValue = React.useMemo<CitySelectorContextValue>(
    () => ({
      value: resolvedValue,
      setValue,
      locale,
      strings,
      disabled,
      getProvinceLabel,
      getCityLabel,
    }),
    [
      resolvedValue,
      setValue,
      locale,
      strings,
      disabled,
      getProvinceLabel,
      getCityLabel,
    ]
  )

  return (
    <CitySelectorContext.Provider value={contextValue}>
      <div
        ref={rootRef}
        data-slot="city-selector"
        dir={localeProp ? (localeProp === "fa" ? "rtl" : "ltr") : undefined}
        className={cn("flex flex-col gap-4 sm:flex-row", className)}
      >
        {children ?? (
          <>
            <CitySelectorProvince />
            <CitySelectorCity />
          </>
        )}
      </div>
    </CitySelectorContext.Provider>
  )
}

function CitySelectorProvince({
  placeholder,
  className,
  ...props
}: {
  placeholder?: string
} & Omit<React.ComponentProps<typeof ComboboxInputGroup>, "children">) {
  const { value, setValue, strings, disabled, getProvinceLabel } =
    useCitySelectorContext("CitySelectorProvince")

  return (
    <Combobox
      items={persianProvinces}
      itemToStringLabel={getProvinceLabel}
      value={value.province}
      onValueChange={(province) => setValue({ province, city: null })}
      disabled={disabled}
    >
      <ComboboxInputGroup
        className={cn("w-full sm:w-64", className)}
        {...props}
      >
        <ComboboxInput placeholder={placeholder ?? strings.province} />
        <ComboboxIcon />
      </ComboboxInputGroup>
      <ComboboxContent>
        <ComboboxEmpty>{strings.noProvinces}</ComboboxEmpty>
        <ComboboxList>
          {(item: PersianProvince) => (
            <ComboboxItem key={item.id} value={item}>
              {getProvinceLabel(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function CitySelectorCity({
  placeholder,
  className,
  ...props
}: {
  placeholder?: string
} & Omit<React.ComponentProps<typeof ComboboxInputGroup>, "children">) {
  const { value, setValue, strings, disabled, getCityLabel } =
    useCitySelectorContext("CitySelectorCity")

  return (
    <Combobox
      items={value.province?.cities ?? []}
      itemToStringLabel={getCityLabel}
      value={value.city}
      onValueChange={(city) => setValue({ ...value, city })}
      disabled={disabled || !value.province}
      // Provinces can have 50+ cities (see persian-provinces.ts), so the
      // city list is windowed via ComboboxVirtualList instead of mounting
      // every item's DOM node.
      virtualized
    >
      <ComboboxInputGroup
        className={cn("w-full sm:w-64", className)}
        {...props}
      >
        <ComboboxInput
          placeholder={
            value.province
              ? (placeholder ?? strings.city)
              : strings.selectProvinceFirst
          }
        />
        <ComboboxIcon />
      </ComboboxInputGroup>
      <ComboboxContent>
        <ComboboxEmpty>{strings.noCities}</ComboboxEmpty>
        <ComboboxVirtualList>
          {(item: PersianCity, index) => (
            <ComboboxItem key={item.id} index={index} value={item}>
              {getCityLabel(item)}
            </ComboboxItem>
          )}
        </ComboboxVirtualList>
      </ComboboxContent>
    </Combobox>
  )
}

export { CitySelector, CitySelectorProvince, CitySelectorCity }
