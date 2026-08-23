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
  {
    id: "sepah",
    name: "بانک سپه",
    cardPrefixes: ["627381", "589210"],
    ibanCodes: ["015"],
  },
  {
    id: "melli",
    name: "بانک ملی ایران",
    cardPrefixes: ["603799", "636214"],
    ibanCodes: ["017", "062"],
  },
  {
    id: "blubank",
    name: "بلوبانک",
    cardPrefixes: ["62198618", "62198619"],
    ibanCodes: ["056"],
  },
  { id: "dey", name: "بانک دی", cardPrefixes: ["502938"], ibanCodes: ["017"] },
  {
    id: "eghtesad_novin",
    name: "بانک اقتصادنوین",
    cardPrefixes: ["627412"],
    ibanCodes: ["055"],
  },
  {
    id: "gardeshgari",
    name: "بانک گردشگری",
    cardPrefixes: ["505416"],
    ibanCodes: ["064"],
  },
  {
    id: "ghavvamin",
    name: "بانک قوامین",
    cardPrefixes: ["639599"],
    ibanCodes: ["052"],
  },
  {
    id: "kar_afarin",
    name: "بانک کارآفرین",
    cardPrefixes: ["627488", "502910"],
    ibanCodes: ["053"],
  },
  {
    id: "keshavarzi",
    name: "بانک کشاورزی",
    cardPrefixes: ["603770", "639217"],
    ibanCodes: ["016"],
  },
  {
    id: "maskan",
    name: "بانک مسکن",
    cardPrefixes: ["628023"],
    ibanCodes: ["014"],
  },
  {
    id: "mehr_e_iranian",
    name: "بانک مهر ایران",
    cardPrefixes: ["606373"],
    ibanCodes: ["060"],
  },
  {
    id: "meli",
    name: "موسسه اعتباری ملل",
    cardPrefixes: ["606256"],
    ibanCodes: ["075"],
  },
  {
    id: "mellat",
    name: "بانک ملت",
    cardPrefixes: ["610433", "991975"],
    ibanCodes: ["012"],
  },
  {
    id: "parsian",
    name: "بانک پارسیان",
    cardPrefixes: ["622106"],
    ibanCodes: ["054"],
  },
  {
    id: "pasargad",
    name: "بانک پاسارگاد",
    cardPrefixes: ["502229", "639347"],
    ibanCodes: ["057"],
  },
  {
    id: "post_bank",
    name: "پست بانک ایران",
    cardPrefixes: ["627760"],
    ibanCodes: ["021"],
  },
  {
    id: "refah",
    name: "بانک رفاه",
    cardPrefixes: ["589463"],
    ibanCodes: ["013"],
  },
  {
    id: "saderat",
    name: "بانک صادرات",
    cardPrefixes: ["603769"],
    ibanCodes: ["019"],
  },
  {
    id: "saman",
    name: "بانک سامان",
    cardPrefixes: ["621986"],
    ibanCodes: ["056"],
  },
  {
    id: "sarmayeh",
    name: "بانک سرمایه",
    cardPrefixes: ["639607"],
    ibanCodes: ["058"],
  },
  {
    id: "shahr",
    name: "بانک شهر",
    cardPrefixes: ["504706", "502806"],
    ibanCodes: ["061"],
  },
  {
    id: "sina",
    name: "بانک سینا",
    cardPrefixes: ["639346"],
    ibanCodes: ["059"],
  },
  {
    id: "tejarat",
    name: "بانک تجارت",
    cardPrefixes: ["627353", "585983"],
    ibanCodes: ["018"],
  },
  {
    id: "hekmat",
    name: "بانک حکمت ایرانیان",
    cardPrefixes: ["636949"],
    ibanCodes: ["065"],
  },
  {
    id: "tosee_saderat",
    name: "بانک توسعه صادرات",
    cardPrefixes: ["627648"],
    ibanCodes: ["020"],
  },
  {
    id: "tosee_taavon",
    name: "بانک توسعه تعاون",
    cardPrefixes: ["502908"],
    ibanCodes: ["051"],
  },
  {
    id: "iranzamin",
    name: "بانک ایران زمین",
    cardPrefixes: ["505785"],
    ibanCodes: ["069"],
  },
  {
    id: "khavarmianeh",
    name: "بانک خاورمیانه",
    cardPrefixes: ["588947"],
    ibanCodes: ["080"],
  },
  {
    id: "resalat",
    name: "بانک قرض الحسنه رسالت",
    cardPrefixes: ["504172"],
    ibanCodes: ["060"],
  },
]

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

  const rearranged = normalized.slice(4) + normalized.slice(0, 4)
  let remainder = ""
  for (const character of rearranged) {
    remainder += /\d/.test(character)
      ? character
      : String(character.charCodeAt(0) - 55)
    remainder = String(Number(remainder) % 97)
  }
  return Number(remainder) === 1
}
