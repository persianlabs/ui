import { normalizePersianDigits } from "@/lib/normalize-persian-digits"

export type IranianBankId =
  | "blubank"
  | "dey"
  | "eghtesad_novin"
  | "gardeshgari"
  | "ghavvamin"
  | "hekmat"
  | "iranzamin"
  | "kar_afarin"
  | "keshavarzi"
  | "khavarmianeh"
  | "maskan"
  | "mehr_e_iranian"
  | "meli"
  | "mellat"
  | "melli"
  | "parsian"
  | "pasargad"
  | "post_bank"
  | "refah"
  | "resalat"
  | "saderat"
  | "saman"
  | "sarmayeh"
  | "sepah"
  | "shahr"
  | "sina"
  | "tejarat"
  | "tosee_saderat"
  | "tosee_taavon"

export interface IranianBank {
  id: IranianBankId
  name: string
  cardPrefixes: string[]
  ibanCodes: string[]
}

export const iranianBanks: IranianBank[] = [
  ["sepah", "بانک سپه", "627381,589210", "015"],
  ["melli", "بانک ملی ایران", "603799,636214", "017,062"],
  ["blubank", "بلوبانک", "62198618,62198619", "056"],
  ["dey", "بانک دی", "502938", "017"],
  ["eghtesad_novin", "بانک اقتصادنوین", "627412", "055"],
  ["gardeshgari", "بانک گردشگری", "505416", "064"],
  ["ghavvamin", "بانک قوامین", "639599", "052"],
  ["kar_afarin", "بانک کارآفرین", "627488,502910", "053"],
  ["keshavarzi", "بانک کشاورزی", "603770,639217", "016"],
  ["maskan", "بانک مسکن", "628023", "014"],
  ["mehr_e_iranian", "بانک مهر ایران", "606373", "060"],
  ["meli", "موسسه اعتباری ملل", "606256", "075"],
  ["mellat", "بانک ملت", "610433,991975", "012"],
  ["parsian", "بانک پارسیان", "622106", "054"],
  ["pasargad", "بانک پاسارگاد", "502229,639347", "057"],
  ["post_bank", "پست بانک ایران", "627760", "021"],
  ["refah", "بانک رفاه", "589463", "013"],
  ["saderat", "بانک صادرات", "603769", "019"],
  ["saman", "بانک سامان", "621986", "056"],
  ["sarmayeh", "بانک سرمایه", "639607", "058"],
  ["shahr", "بانک شهر", "504706,502806", "061"],
  ["sina", "بانک سینا", "639346", "059"],
  ["tejarat", "بانک تجارت", "627353,585983", "018"],
  ["hekmat", "بانک حکمت ایرانیان", "636949", "065"],
  ["tosee_saderat", "بانک توسعه صادرات", "627648", "020"],
  ["tosee_taavon", "بانک توسعه تعاون", "502908", "051"],
  ["iranzamin", "بانک ایران زمین", "505785", "069"],
  ["khavarmianeh", "بانک خاورمیانه", "588947", "080"],
  ["resalat", "بانک قرض الحسنه رسالت", "504172", "060"],
].map(([id, name, cardPrefixes, ibanCodes]) => ({
  id: id as IranianBankId,
  name,
  cardPrefixes: cardPrefixes.split(","),
  ibanCodes: ibanCodes.split(","),
}))

export function normalizeCardNumber(value: string | number | null | undefined) {
  return normalizePersianDigits(String(value ?? ""))
    .replace(/\D/g, "")
    .slice(0, 16)
}
export function formatCardNumber(
  value: string | number | null | undefined,
  separator = " "
) {
  return (
    normalizeCardNumber(value)
      .match(/.{1,4}/g)
      ?.join(separator) ?? ""
  )
}
export function normalizeShaba(value: string | null | undefined) {
  return normalizePersianDigits(value ?? "")
    .toUpperCase()
    .replace(/^IR/i, "")
    .replace(/\D/g, "")
    .slice(0, 24)
}
export function formatShaba(value: string | null | undefined, separator = " ") {
  return (
    normalizeShaba(value)
      .match(/.{1,4}/g)
      ?.join(separator) ?? ""
  )
}
export function getIranianBankByCardNumber(
  value: string | number | null | undefined
) {
  const digits = normalizeCardNumber(value)
  return iranianBanks.find((bank) =>
    bank.cardPrefixes.some((prefix) => digits.startsWith(prefix))
  )
}
export function getIranianBankByShaba(value: string | null | undefined) {
  const digits = normalizeShaba(value)
  return iranianBanks.find((bank) =>
    bank.ibanCodes.includes(digits.slice(2, 5))
  )
}
export function validateIranianCard(value: string | number | null | undefined) {
  const digits = normalizeCardNumber(value)
  if (digits.length !== 16 || /^0+$/.test(digits)) return false
  const sum = digits.split("").reduce((total, character, index) => {
    let digit = Number(character)
    if (index % 2 === 0) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    return total + digit
  }, 0)
  return sum % 10 === 0
}
export function validateIranianShaba(value: string | null | undefined) {
  const normalized = `IR${normalizeShaba(value)}`
  if (!/^IR\d{24}$/.test(normalized)) return false
  let remainder = ""
  for (const character of normalized.slice(4) + normalized.slice(0, 4)) {
    remainder += /\d/.test(character)
      ? character
      : String(character.charCodeAt(0) - 55)
    remainder = String(Number(remainder) % 97)
  }
  return Number(remainder) === 1
}
