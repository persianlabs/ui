import {
  ReceiptPrinterHeader,
  ReceiptPrinterMachine,
  ReceiptPrinterOutput,
  ReceiptPrinterPaper,
  ReceiptPrinterRoot,
  ReceiptPrinterScreen,
  ReceiptPrinterStatus,
} from "@workspace/ui/components/receipt-printer"

const ReceiptPrinter = {
  Root: ReceiptPrinterRoot,
  Machine: ReceiptPrinterMachine,
  Header: ReceiptPrinterHeader,
  Screen: ReceiptPrinterScreen,
  Status: ReceiptPrinterStatus,
  Output: ReceiptPrinterOutput,
  Paper: ReceiptPrinterPaper,
}

export function ReceiptPrinterRtlExample() {
  return (
    <ReceiptPrinter.Root stage="complete" dir="rtl">
      <ReceiptPrinter.Machine>
        <ReceiptPrinter.Header>
          <ReceiptPrinter.Status>
            پرداخت با موفقیت انجام شد
          </ReceiptPrinter.Status>
          <span className="relative z-10 font-mono text-[10px] text-stone-500">
            ۲۴۸۱
          </span>
        </ReceiptPrinter.Header>
        <ReceiptPrinter.Screen>پرداخت موفق · ۱۴:۴۸</ReceiptPrinter.Screen>
      </ReceiptPrinter.Machine>
      <ReceiptPrinter.Output>
        <ReceiptPrinter.Paper>
          <div className="text-center">
            <p className="text-xs font-black tracking-[.12em]">فروشگاه کاغذی</p>
            <p className="mt-1 text-[10px] text-stone-500">رسید خرید شما</p>
          </div>
          <div className="my-4 flex items-center gap-3 border-y border-dashed border-stone-300 py-3">
            <img
              className="size-11 rounded-sm object-cover"
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80"
              alt="Sneaker"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold">کتانی روزمره</p>
              <p className="mt-1 text-[10px] text-stone-500">۱ عدد</p>
            </div>
            <span className="text-xs font-bold">۱٬۹۹۰</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <p className="flex justify-between">
              <span>مبلغ کالا</span>
              <span>۱٬۹۹۰٬۰۰۰</span>
            </p>
            <p className="flex justify-between">
              <span>ارسال</span>
              <span>رایگان</span>
            </p>
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-stone-800 pt-3">
            <span className="text-xs font-bold">مبلغ پرداختی</span>
            <span className="text-lg font-black">۱٬۹۹۰٬۰۰۰ تومان</span>
          </div>
          <p className="mt-5 text-center text-[9px] text-stone-500">
            سپاس از خرید شما
          </p>
        </ReceiptPrinter.Paper>
      </ReceiptPrinter.Output>
    </ReceiptPrinter.Root>
  )
}
