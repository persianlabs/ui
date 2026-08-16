"use client"

import type * as React from "react"
import * as BankIcons from "@persianlabs/icons/react"
import * as ReactRuntime from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { useControllableState } from "@/hooks/use-controllable-state"
import {
  formatCardNumber,
  formatShaba,
  getIranianBankByCardNumber,
  getIranianBankByShaba,
  normalizeCardNumber,
  normalizeShaba,
  type IranianBank,
  type IranianBankId,
} from "@/lib/iranian-bank"
import { cn } from "@/lib/utils"

export type BankLogoVariant = "color" | "mono" | false
type BaseBankInputProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "defaultValue" | "onChange" | "type" | "dir"
> & {
  bankLogo?: BankLogoVariant
  onBankChange?: (bank: IranianBank | undefined) => void
  separator?: string
}
export interface CardNumberInputProps extends BaseBankInputProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}
export interface ShabaInputProps extends BaseBankInputProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const iconNames: Record<IranianBankId, string> = {
  blubank: "BankBlubank",
  dey: "BankDey",
  eghtesad_novin: "BankEghtesadNovin",
  gardeshgari: "BankGardeshgari",
  ghavvamin: "BankGhavamin",
  hekmat: "BankHekmat",
  iranzamin: "BankIranZamin",
  kar_afarin: "BankKarafarin",
  keshavarzi: "BankKeshavarzi",
  khavarmianeh: "BankKhavarMianeh",
  maskan: "BankMaskan",
  mehr_e_iranian: "BankMehrIran",
  meli: "BankMelall",
  mellat: "BankMellat",
  melli: "BankMelli",
  parsian: "BankParsian",
  pasargad: "BankPasargad",
  post_bank: "BankPostbank",
  refah: "BankRefah",
  resalat: "BankResalat",
  saderat: "BankSaderat",
  saman: "BankSaman",
  sarmayeh: "BankSarmayeh",
  sepah: "BankSepah",
  shahr: "BankShahr",
  sina: "BankSina",
  tejarat: "BankTejarat",
  tosee_saderat: "BankToseeSaderat",
  tosee_taavon: "BankToseeTaavon",
}
function offsetAfterDigits(value: string, count: number) {
  let seen = 0
  for (let i = 0; i < value.length; i++) {
    if (/\d/.test(value[i]!)) seen++
    if (seen === count) return i + 1
  }
  return value.length
}
function BankIdentity({
  bank,
  logo,
}: {
  bank?: IranianBank
  logo: BankLogoVariant
}) {
  if (!bank) return null
  const Logo = BankIcons[
    `${iconNames[bank.id]}${logo === "mono" ? "Mono" : "Color"}` as keyof typeof BankIcons
  ] as React.ComponentType<React.SVGProps<SVGSVGElement>>
  return (
    <InputGroupAddon align="inline-end" className="pe-2">
      <Logo className="size-5 shrink-0" />
    </InputGroupAddon>
  )
}
function CardNumberInput({
  value,
  defaultValue = "",
  onValueChange,
  bankLogo = "color",
  onBankChange,
  separator = " ",
  className,
  ...props
}: CardNumberInputProps) {
  const [number, setNumber] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: "CardNumberInput",
  })
  const normalized = normalizeCardNumber(number)
  const bank = getIranianBankByCardNumber(normalized)
  return (
    <InputGroup className={cn("h-10", className)} dir="ltr">
      <InputGroupInput
        {...props}
        dir="ltr"
        inputMode="numeric"
        autoComplete="cc-number"
        spellCheck={false}
        translate="no"
        value={formatCardNumber(normalized, separator)}
        onChange={(event) => {
          const count = normalizeCardNumber(
            event.target.value.slice(0, event.target.selectionStart ?? 0)
          ).length
          const next = normalizeCardNumber(event.target.value)
          setNumber(next)
          onBankChange?.(getIranianBankByCardNumber(next))
          requestAnimationFrame(() =>
            event.target.setSelectionRange(
              offsetAfterDigits(formatCardNumber(next, separator), count),
              offsetAfterDigits(formatCardNumber(next, separator), count)
            )
          )
        }}
        placeholder={`1234${separator}1234${separator}1234${separator}1234`}
        className="font-mono text-sm tracking-wide md:text-base"
      />
      {bankLogo && <BankIdentity bank={bank} logo={bankLogo} />}
    </InputGroup>
  )
}
function ShabaInput({
  value,
  defaultValue = "",
  onValueChange,
  bankLogo = "color",
  onBankChange,
  separator = " ",
  className,
  ...props
}: ShabaInputProps) {
  const [account, setAccount] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: "ShabaInput",
  })
  const normalized = normalizeShaba(account)
  const bank = getIranianBankByShaba(normalized)
  return (
    <InputGroup className={cn("h-10", className)} dir="ltr">
      <InputGroupAddon align="inline-start">
        <InputGroupText className="font-mono font-semibold tracking-wide">
          IR
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        {...props}
        dir="ltr"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        translate="no"
        value={formatShaba(normalized, separator)}
        onChange={(event) => {
          const count = normalizeShaba(
            event.target.value.slice(0, event.target.selectionStart ?? 0)
          ).length
          const next = normalizeShaba(event.target.value)
          setAccount(next)
          onBankChange?.(getIranianBankByShaba(next))
          requestAnimationFrame(() =>
            event.target.setSelectionRange(
              offsetAfterDigits(formatShaba(next, separator), count),
              offsetAfterDigits(formatShaba(next, separator), count)
            )
          )
        }}
        placeholder={`1234${separator}1234${separator}1234${separator}1234${separator}1234${separator}1234`}
        className="font-mono text-sm tracking-wide md:text-base"
      />
      {bankLogo && <BankIdentity bank={bank} logo={bankLogo} />}
    </InputGroup>
  )
}
export { CardNumberInput, ShabaInput }
