import { Separator } from "@workspace/ui/components/separator"

const lineItems = [
  { label: "قیمت کالا", value: "۲٬۴۵۰٬۰۰۰ تومان" },
  { label: "هزینه ارسال", value: "۳۵٬۰۰۰ تومان" },
  { label: "تخفیف", value: "−۱۵۰٬۰۰۰ تومان" },
]

export function SeparatorReceiptExample() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-border p-4 text-sm">
      <div className="flex flex-col gap-2">
        {lineItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-muted-foreground">{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between font-medium">
        <span>مبلغ قابل پرداخت</span>
        <span>۲٬۳۳۵٬۰۰۰ تومان</span>
      </div>
    </div>
  )
}
