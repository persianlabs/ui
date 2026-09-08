"use client"

import { useMemo } from "react"
import { TextAlignStartIcon, TerminalIcon } from "lucide-react"
import { useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/react/utils"
import { atomWithStorage } from "jotai/utils"

import { CopyButton } from "@workspace/ui/components/copy-button"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import type { PackageManager } from "@/lib/convert-npm-command"

// Package managers first; any other key (the AI prompt) always renders last.
const TAB_ORDER: PackageManager[] = ["pnpm", "npm", "bun"]

function tabRank(key: string): number {
  const index = TAB_ORDER.indexOf(key as PackageManager)
  return index === -1 ? TAB_ORDER.length : index
}

const packageManagerAtom = atomWithStorage<PackageManager>(
  "packageManager",
  "pnpm"
)

interface CodeBlockCommandProps {
  /** Natural language instruction shown under an AI prompt tab. */
  prompt?: string
  pnpm?: string
  npm?: string
  bun?: string
  /** Fires after the active command is copied, with the selected manager. */
  onCopySuccess?: (data: {
    packageManager: PackageManager
    command: string
  }) => void
}

/**
 * Install-command block with a package-manager switcher. The chosen manager
 * persists across visits (localStorage via jotai); SSR always renders the
 * "pnpm" default so hydration never mismatches.
 */
export function CodeBlockCommand({
  prompt,
  pnpm,
  npm,
  bun,
  onCopySuccess,
}: CodeBlockCommandProps) {
  useHydrateAtoms([[packageManagerAtom, "pnpm"] as const])
  const [packageManager, setPackageManager] = useAtom(packageManagerAtom)

  const tabs = useMemo(
    () => ({ prompt, pnpm, npm, bun }),
    [prompt, pnpm, npm, bun]
  )
  // The AI prompt tab always renders last, whatever the prop order.
  const tabsFiltered = useMemo(
    () =>
      Object.entries(tabs)
        .filter(([, value]) => !!value)
        .sort(([a], [b]) => tabRank(a) - tabRank(b)),
    [tabs]
  )

  return (
    <div
      dir="ltr"
      className="relative w-full min-w-0 overflow-hidden rounded-xl border border-border bg-card"
    >
      <Tabs
        className="gap-0"
        variant="line"
        value={tabs[packageManager] ? packageManager : "pnpm"}
        onValueChange={(value) => setPackageManager(value as PackageManager)}
      >
        <div className="w-full overflow-x-auto">
          <TabsList className="h-10 w-full justify-start gap-1 rounded-none border-b border-border/60 px-3">
            <span className="mr-1 flex size-4 shrink-0 items-center text-muted-foreground [&_svg]:size-4">
              {getPackageManagerIcon(
                tabs[packageManager] ? packageManager : "pnpm"
              )}
            </span>
            {tabsFiltered.map(([key]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="h-6 rounded-md px-2 font-mono text-xs"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabsFiltered.map(([key, value]) => (
          <TabsContent key={key} value={key}>
            <ScrollArea
              scrollbarOrientation="horizontal"
              className="group/sa [&_[data-slot=scroll-area-viewport]]:scroll-fade-x"
            >
              <pre
                data-pm={key}
                className="group/pm w-max max-w-none p-4 leading-6"
              >
                <code
                  data-slot="code-block"
                  data-language="bash"
                  className="font-mono text-sm/none whitespace-pre text-muted-foreground group-data-[pm=prompt]/pm:whitespace-normal"
                >
                  <span className="select-none group-data-[pm=prompt]/pm:hidden">
                    ${" "}
                  </span>
                  {value}
                </code>
              </pre>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      <CopyButton
        className="absolute top-2 right-2 z-10 size-6 rounded-md border-none [&_svg:not([class*='size-'])]:size-3.5"
        size="icon-sm"
        variant={"ghost"}
        text={tabs[packageManager] || ""}
        onCopySuccess={(copiedCommand) => {
          onCopySuccess?.({
            packageManager,
            command: copiedCommand,
          })
        }}
      />
    </div>
  )
}

function getPackageManagerIcon(manager: PackageManager) {
  switch (manager) {
    case "prompt":
      return <TextAlignStartIcon />
    case "pnpm":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"
            fill="currentColor"
          />
        </svg>
      )
    case "npm":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
            fill="currentColor"
          />
        </svg>
      )
    case "bun":
      return (
        <svg viewBox="0 0 24 24">
          <path
            d="M12 22.596c6.628 0 12-4.338 12-9.688 0-3.318-2.057-6.248-5.219-7.986-1.286-.715-2.297-1.357-3.139-1.89C14.058 2.025 13.08 1.404 12 1.404c-1.097 0-2.334.785-3.966 1.821a49.92 49.92 0 0 1-2.816 1.697C2.057 6.66 0 9.59 0 12.908c0 5.35 5.372 9.687 12 9.687v.001ZM10.599 4.715c.334-.759.503-1.58.498-2.409 0-.145.202-.187.23-.029.658 2.783-.902 4.162-2.057 4.624-.124.048-.199-.121-.103-.209a5.763 5.763 0 0 0 1.432-1.977Zm2.058-.102a5.82 5.82 0 0 0-.782-2.306v-.016c-.069-.123.086-.263.185-.172 1.962 2.111 1.307 4.067.556 5.051-.082.103-.23-.003-.189-.126a5.85 5.85 0 0 0 .23-2.431Zm1.776-.561a5.727 5.727 0 0 0-1.612-1.806v-.014c-.112-.085-.024-.274.114-.218 2.595 1.087 2.774 3.18 2.459 4.407a.116.116 0 0 1-.049.071.11.11 0 0 1-.153-.026.122.122 0 0 1-.022-.083 5.891 5.891 0 0 0-.737-2.331Zm-5.087.561c-.617.546-1.282.76-2.063 1-.117 0-.195-.078-.156-.181 1.752-.909 2.376-1.649 2.999-2.778 0 0 .155-.118.188.085 0 .304-.349 1.329-.968 1.874Zm4.945 11.237a2.957 2.957 0 0 1-.937 1.553c-.346.346-.8.565-1.286.62a2.178 2.178 0 0 1-1.327-.62 2.955 2.955 0 0 1-.925-1.553.244.244 0 0 1 .064-.198.234.234 0 0 1 .193-.069h3.965a.226.226 0 0 1 .19.07c.05.053.073.125.063.197Zm-5.458-2.176a1.862 1.862 0 0 1-2.384-.245 1.98 1.98 0 0 1-.233-2.447c.207-.319.503-.566.848-.713a1.84 1.84 0 0 1 1.092-.11c.366.075.703.261.967.531a1.98 1.98 0 0 1 .408 2.114 1.931 1.931 0 0 1-.698.869v.001Zm8.495.005a1.86 1.86 0 0 1-2.381-.253 1.964 1.964 0 0 1-.547-1.366c0-.384.11-.76.32-1.079.207-.319.503-.567.849-.713a1.844 1.844 0 0 1 1.093-.108c.367.076.704.262.968.534a1.98 1.98 0 0 1 .4 2.117 1.932 1.932 0 0 1-.702.868Z"
            fill="currentColor"
          />
        </svg>
      )
    default:
      return <TerminalIcon />
  }
}
