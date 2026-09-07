"use client"

import * as React from "react"
import { CheckIcon, NetworkIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Switch } from "@workspace/ui/components/switch"
import { cn } from "@workspace/ui/lib/utils"

import { CodeBlockCommand } from "@/components/code-block-command"
import { usePresetCode } from "@/components/create/hooks/use-preset-code"

const NEXT_LOGO =
  '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Next.js</title><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" fill="currentColor"/></svg>'
const VITE_LOGO =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 404" fill="none"><path fill="var(--foreground)" d="m399.641 59.525-183.998 329.02c-3.799 6.793-13.559 6.833-17.415.073L10.582 59.556C6.38 52.19 12.68 43.266 21.028 44.76l184.195 32.923c1.175.21 2.378.208 3.553-.006l180.343-32.87c8.32-1.517 14.649 7.337 10.522 14.719"/><path fill="var(--color-neutral-800)" d="M292.965 1.574 156.801 28.255a5 5 0 0 0-4.03 4.611l-8.376 141.464c-.197 3.332 2.863 5.918 6.115 5.168l37.91-8.749c3.547-.818 6.752 2.306 6.023 5.873l-11.263 55.153c-.758 3.712 2.727 6.886 6.352 5.785l23.415-7.114c3.63-1.102 7.118 2.081 6.35 5.796l-17.899 86.633c-1.12 5.419 6.088 8.374 9.094 3.728l2.008-3.103 110.954-221.428c1.858-3.707-1.346-7.935-5.418-7.15l-39.022 7.532c-3.667.707-6.787-2.708-5.752-6.296l25.469-88.291c1.036-3.594-2.095-7.012-5.766-6.293"/></svg>'

// Two frameworks, monorepo as a switch (shadcn-style) instead of a third
// card. The switch currently only applies to Next.js — no Vite monorepo
// base exists yet.
const TEMPLATES = [
  {
    value: "next",
    title: "Next.js",
    description: "App Router with RSC",
    logo: NEXT_LOGO,
    monorepoValue: "next-monorepo",
  },
  {
    value: "vite",
    title: "Vite",
    description: "React SPA, fast HMR",
    logo: VITE_LOGO,
    monorepoValue: null,
  },
] as const

type FrameworkValue = (typeof TEMPLATES)[number]["value"]

export function ProjectForm({
  className,
}: React.ComponentProps<typeof Button>) {
  const [framework, setFramework] = React.useState<FrameworkValue>("next")
  const [monorepo, setMonorepo] = React.useState(false)
  const presetCode = usePresetCode()

  const template = React.useMemo(() => {
    if (framework === "next") {
      return monorepo ? "next-monorepo" : "next"
    }
    return "vite"
  }, [framework, monorepo])

  const command = `init --preset ${presetCode} --template ${template}`

  return (
    <Dialog>
      <DialogTrigger render={<Button className={cn(className)} />}>
        Get Code
      </DialogTrigger>
      <DialogPopup className="dark max-w-96 min-w-0 gap-5 rounded-xl sm:max-w-md">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-base">Get Code</DialogTitle>
          <DialogDescription>
            Choose a project template, then run the command to scaffold your app
            with this design system.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-2">
            {TEMPLATES.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFramework(option.value)}
                data-checked={framework === option.value}
                className="flex flex-col items-start gap-0.5 rounded-lg border border-input bg-background/50 p-3 text-left text-sm transition-colors outline-none select-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 data-[checked=true]:border-primary data-[checked=true]:ring-1 data-[checked=true]:ring-primary"
              >
                <span className="flex w-full items-center gap-1.5 font-medium">
                  <span
                    className="size-4 shrink-0 text-foreground [&_svg]:size-4 [&_svg]:fill-current"
                    dangerouslySetInnerHTML={{ __html: option.logo }}
                  />
                  {option.title}
                  {framework === option.value && (
                    <CheckIcon className="ml-auto size-3.5 text-primary" />
                  )}
                </span>
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              </button>
            ))}
          </div>

          <label className="flex items-center justify-between gap-3 rounded-lg border border-input bg-background/50 px-3 py-2.5">
            <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
              <NetworkIcon className="size-4 shrink-0 text-muted-foreground" />
              Create a monorepo
            </span>
            <Switch
              checked={monorepo}
              onCheckedChange={(checked) => setMonorepo(checked === true)}
              disabled={framework !== "next"}
            />
          </label>

          {/* Same component as the docs install blocks: pnpm/yarn/npm/bun tabs
            with the selected manager persisted in localStorage. */}
          <CodeBlockCommand
            pnpm={`pnpm dlx persianlabsui@latest ${command}`}
            yarn={`yarn dlx persianlabsui@latest ${command}`}
            npm={`npx persianlabsui@latest ${command}`}
            bun={`bunx --bun persianlabsui@latest ${command}`}
          />
        </div>
      </DialogPopup>
    </Dialog>
  )
}
