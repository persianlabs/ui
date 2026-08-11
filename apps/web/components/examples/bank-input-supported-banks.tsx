import { CardNumberInput } from "@workspace/ui/components/bank-input"
import {
  iranianBanks,
  validateIranianCard,
} from "@workspace/ui/lib/iranian-bank"

function createValidCard(prefix: string) {
  const stem = prefix.padEnd(15, "0").slice(0, 15)
  return Array.from(
    { length: 10 },
    (_, checkDigit) => `${stem}${checkDigit}`
  ).find(validateIranianCard)!
}

export function BankInputSupportedBanksExample() {
  return (
    <div className="w-full">
      <p className="mb-4 text-sm text-muted-foreground">
        {iranianBanks.length} بانک پشتیبانی می‌شود
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {iranianBanks.map((bank) => (
          <div key={bank.id} className="grid gap-1.5">
            <p className="text-right text-sm font-medium" dir="rtl">
              {bank.name}
            </p>
            <CardNumberInput
              defaultValue={createValidCard(bank.cardPrefixes[0]!)}
              aria-label={`شماره کارت نمونه ${bank.name}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
