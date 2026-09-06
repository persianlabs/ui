"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { cn } from "@workspace/ui/lib/utils"

import { usePresetCode } from "@/components/create/hooks/use-preset-code"

const TEMPLATES = [
  {
    value: "next",
    title: "Next.js",
    description: "App Router with RSC",
  },
  {
    value: "vite",
    title: "Vite",
    description: "React SPA, fast HMR",
  },
  {
    value: "next-turborepo",
    title: "Turborepo",
    description: "Next.js monorepo starter",
  },
] as const

type TemplateValue = (typeof TEMPLATES)[number]["value"]

const PACKAGE_MANAGERS = [
  { value: "pnpm", label: "pnpm" },
  { value: "npm", label: "npm" },
  { value: "yarn", label: "yarn" },
  { value: "bun", label: "bun" },
] as const

type PackageManager = (typeof PACKAGE_MANAGERS)[number]["value"]

const RUNNERS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx persianlabsui@latest",
  npm: "npx persianlabsui@latest",
  yarn: "yarn dlx persianlabsui@latest",
  bun: "bunx --bun persianlabsui@latest",
}

export function ProjectForm({
  className,
}: React.ComponentProps<typeof Button>) {
  const [template, setTemplate] = React.useState<TemplateValue>("next")
  const [packageManager, setPackageManager] =
    React.useState<PackageManager>("pnpm")
  const [hasCopied, setHasCopied] = React.useState(false)
  const presetCode = usePresetCode()

  const command = `${RUNNERS[packageManager]} init --preset ${presetCode} --template ${template}`

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(command).catch(() => {})
    setHasCopied(true)
  }, [command])

  return (
    <Dialog>
      <DialogTrigger render={<Button className={cn(className)} />}>
        Get Code
      </DialogTrigger>
      <DialogPopup className="dark max-w-96 min-w-0 gap-5 rounded-xl p-6 sm:max-w-md">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-base">Get Code</DialogTitle>
          <DialogDescription>
            Choose a project template, then run the command to scaffold your
            app with this design system.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTemplate(option.value)}
              data-checked={template === option.value}
              className="flex flex-col items-start gap-0.5 rounded-lg border border-input bg-background/50 p-3 text-left text-sm transition-colors outline-none select-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 data-[checked=true]:border-primary data-[checked=true]:ring-1 data-[checked=true]:ring-primary"
            >
              <span className="flex w-full items-center justify-between gap-1 font-medium">
                {option.title}
                {template === option.value && (
                  <CheckIcon className="size-3.5 text-primary" />
                )}
              </span>
              <span className="text-xs text-muted-foreground">
                {option.description}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="bg-muted flex items-center gap-0.5 rounded-lg p-1">
            {PACKAGE_MANAGERS.map((pm) => (
              <button
                key={pm.value}
                type="button"
                onClick={() => setPackageManager(pm.value)}
                data-checked={packageManager === pm.value}
                className="flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors outline-none select-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 data-[checked=true]:bg-background data-[checked=true]:text-foreground data-[checked=true]:shadow-sm"
              >
                {pm.label}
              </button>
            ))}
          </div>
          <div className="flex min-w-0 items-center gap-2 rounded-lg bg-neutral-950 p-3 ring-1 ring-foreground/10">
            <code
              dir="ltr"
              className="min-w-0 flex-1 truncate font-mono text-xs text-neutral-100"
            >
              {command}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="shrink-0"
            >
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleCopy} className="w-full">
            {hasCopied ? "Copied" : "Copy Command"}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
