"use client"

import { CheckIcon, LoaderCircleIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import * as React from "react"

import { cn } from "@/lib/utils"

export type ReceiptPrinterStage = "processing" | "printing" | "complete"

const ReceiptPrinterContext =
  React.createContext<ReceiptPrinterStage>("complete")

type RootProps = React.ComponentProps<"section"> & {
  stage?: ReceiptPrinterStage
}

const receiptEdge =
  "polygon(0 0,100% 0,100% calc(100% - 7px),97% 100%,94% calc(100% - 7px),91% 100%,88% calc(100% - 7px),85% 100%,82% calc(100% - 7px),79% 100%,76% calc(100% - 7px),73% 100%,70% calc(100% - 7px),67% 100%,64% calc(100% - 7px),61% 100%,58% calc(100% - 7px),55% 100%,52% calc(100% - 7px),49% 100%,46% calc(100% - 7px),43% 100%,40% calc(100% - 7px),37% 100%,34% calc(100% - 7px),31% 100%,28% calc(100% - 7px),25% 100%,22% calc(100% - 7px),19% 100%,16% calc(100% - 7px),13% 100%,10% calc(100% - 7px),7% 100%,4% calc(100% - 7px),0 100%)"

function ReceiptPrinterRoot({
  className,
  stage = "complete",
  ...props
}: RootProps) {
  return (
    <ReceiptPrinterContext.Provider value={stage}>
      <section
        data-slot="receipt-printer"
        data-stage={stage}
        className={cn(
          "group/receipt-printer flex w-full max-w-sm flex-col items-center",
          className
        )}
        {...props}
      />
    </ReceiptPrinterContext.Provider>
  )
}
function ReceiptPrinterMachine({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-printer-machine"
      className={cn(
        "relative z-10 w-full rounded-[1.6rem] border border-white/15 bg-[#292825] p-3 pb-8 shadow-[0_22px_38px_-24px_rgba(0,0,0,.8),inset_0_1px_0_rgba(255,255,255,.14),inset_0_-3px_0_rgba(0,0,0,.3)] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[radial-gradient(rgba(255,255,255,.09)_1px,transparent_1px)] before:bg-[size:4px_4px] before:opacity-35 before:content-['']",
        className
      )}
      {...props}
    >
      {children}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-3 z-30 h-2 rounded-[0.25rem] border border-black/80 bg-[#11110f] shadow-[inset_0_1px_2px_rgba(0,0,0,.95),0_1px_0_rgba(255,255,255,.12)]"
      >
        <div className="mx-1 h-px bg-white/10" />
      </div>
    </div>
  )
}
function ReceiptPrinterHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-printer-header"
      className={cn(
        "relative z-10 flex h-10 items-start justify-between px-1",
        className
      )}
      {...props}
    />
  )
}
function ReceiptPrinterStatus({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-printer-status"
      className={cn(
        "flex items-center gap-2 text-[11px] font-medium text-stone-300",
        className
      )}
      {...props}
    >
      <span className="grid size-4 place-items-center rounded-full bg-emerald-400 text-emerald-950 group-data-[stage=printing]/receipt-printer:bg-sky-300 group-data-[stage=processing]/receipt-printer:bg-amber-300">
        <CheckIcon
          className="size-3 group-data-[stage=printing]/receipt-printer:hidden group-data-[stage=processing]/receipt-printer:hidden"
          strokeWidth={3}
        />
        <LoaderCircleIcon
          className="hidden size-3 animate-spin group-data-[stage=printing]/receipt-printer:block group-data-[stage=processing]/receipt-printer:block motion-reduce:animate-none"
          strokeWidth={3}
        />
      </span>
      <span>{children ?? "Payment approved"}</span>
    </div>
  )
}
function ReceiptPrinterScreen({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="receipt-printer-screen"
      className={cn(
        "relative z-10 rounded-xl border border-black/60 bg-[#151514] px-4 py-3 font-mono text-[10px] tracking-[.12em] text-[#c7e6ad] shadow-inner",
        className
      )}
      {...props}
    />
  )
}
function ReceiptPrinterOutput({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const stage = React.useContext(ReceiptPrinterContext)
  const shouldReduceMotion = useReducedMotion()
  const isPrinting = stage === "printing" && !shouldReduceMotion

  return (
    <div
      data-slot="receipt-printer-output"
      className={cn(
        "relative -mt-3 w-[84%] overflow-hidden px-2 pt-3",
        className
      )}
      {...props}
    >
      <motion.div
        animate={{
          opacity: stage === "processing" ? 0 : 1,
          y: isPrinting
            ? [
                "-96%",
                "-82%",
                "-82%",
                "-67%",
                "-67%",
                "-49%",
                "-49%",
                "-29%",
                "-29%",
                "-12%",
                "0%",
              ]
            : stage === "processing"
              ? "-96%"
              : "0%",
        }}
        initial={false}
        transition={{
          duration: isPrinting ? 2.4 : 0.2,
          ease: isPrinting ? "linear" : "easeOut",
          times: isPrinting
            ? [0, 0.11, 0.16, 0.27, 0.32, 0.45, 0.5, 0.64, 0.69, 0.84, 1]
            : undefined,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
function ReceiptPrinterPaper({
  className,
  style,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="receipt-printer-paper"
      className={cn(
        "animate-in bg-[#fffdf7] px-5 pt-6 pb-10 font-mono text-[#282722] shadow-[0_14px_20px_-12px_rgba(0,0,0,.5)] duration-700 fill-mode-both fade-in slide-in-from-top-8 motion-reduce:animate-none dark:bg-[#f4f0e7]"
      )}
      style={{ clipPath: receiptEdge, ...style }}
      {...props}
    />
  )
}
export {
  ReceiptPrinterHeader,
  ReceiptPrinterMachine,
  ReceiptPrinterOutput,
  ReceiptPrinterPaper,
  ReceiptPrinterRoot,
  ReceiptPrinterScreen,
  ReceiptPrinterStatus,
}

export const ReceiptPrinter = {
  Root: ReceiptPrinterRoot,
  Machine: ReceiptPrinterMachine,
  Header: ReceiptPrinterHeader,
  Screen: ReceiptPrinterScreen,
  Status: ReceiptPrinterStatus,
  Output: ReceiptPrinterOutput,
  Paper: ReceiptPrinterPaper,
}
