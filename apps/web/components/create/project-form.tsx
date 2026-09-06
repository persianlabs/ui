"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { cn } from "@workspace/ui/lib/utils"

import { CodeBlockCommand } from "@/components/code-block-command"
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

export function ProjectForm({
  className,
}: React.ComponentProps<typeof Button>) {
  const [template, setTemplate] = React.useState<TemplateValue>("next")
  const presetCode = usePresetCode()

  const command = `init --preset ${presetCode} --template ${template}`

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

        {/* Same component as the docs install blocks: pnpm/yarn/npm/bun tabs
            with the selected manager persisted in localStorage. */}
        <CodeBlockCommand
          pnpm={`pnpm dlx persianlabsui@latest ${command}`}
          yarn={`yarn dlx persianlabsui@latest ${command}`}
          npm={`npx persianlabsui@latest ${command}`}
          bun={`bunx --bun persianlabsui@latest ${command}`}
        />
      </DialogPopup>
    </Dialog>
  )
}
