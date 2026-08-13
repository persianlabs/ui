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

export function ReceiptPrinterDemoExample() {
  return (
    <ReceiptPrinter.Root stage="complete">
      <ReceiptPrinter.Machine>
        <ReceiptPrinter.Header>
          <ReceiptPrinter.Status>Order complete</ReceiptPrinter.Status>
          <span className="relative z-10 font-mono text-[10px] tracking-[.18em] text-stone-500">
            PRN-01
          </span>
        </ReceiptPrinter.Header>
        <ReceiptPrinter.Screen>READY · 12:48</ReceiptPrinter.Screen>
      </ReceiptPrinter.Machine>
      <ReceiptPrinter.Output>
        <ReceiptPrinter.Paper>
          <div className="text-center">
            <p className="text-xs font-bold tracking-[.22em]">MORNING GOODS</p>
            <p className="mt-1 text-[10px] text-stone-500">
              Thank you for shopping local
            </p>
          </div>
          <div className="my-4 border-y border-dashed border-stone-300 py-3">
            <div className="flex items-center gap-3">
              <img
                className="size-11 rounded-sm object-cover grayscale"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=120&q=80"
                alt="Silver watch"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold">Everyday watch</p>
                <p className="mt-1 text-[10px] text-stone-500">1 × $128.00</p>
              </div>
              <span className="text-xs font-bold">$128</span>
            </div>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>$128.00</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping</span>
              <span>$0.00</span>
            </p>
            <p className="flex justify-between">
              <span>Tax</span>
              <span>$10.24</span>
            </p>
          </div>
          <div className="mt-4 flex items-end justify-between border-t-2 border-stone-800 pt-3">
            <span className="text-xs font-bold">TOTAL</span>
            <span className="text-xl font-black tracking-tight">$138.24</span>
          </div>
          <p className="mt-5 text-center text-[9px] tracking-[.16em] text-stone-500">
            VISA •••• 4242 · AUTH 803217
          </p>
          <div className="mt-4 h-8 bg-[repeating-linear-gradient(90deg,#282722_0_2px,transparent_2px_4px)]" />
        </ReceiptPrinter.Paper>
      </ReceiptPrinter.Output>
    </ReceiptPrinter.Root>
  )
}
