"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

import { CopyCommand } from "@/components/copy-command"

const PACKAGE_MANAGERS = [
  { value: "pnpm", label: "pnpm", command: "pnpm add" },
  { value: "npm", label: "npm", command: "npm install" },
  { value: "bun", label: "bun", command: "bun add" },
] as const

export function InstallCommand({ packages }: { packages: string }) {
  return (
    <Tabs defaultValue="pnpm" variant="line">
      <TabsList>
        {PACKAGE_MANAGERS.map((pm) => (
          <TabsTrigger key={pm.value} value={pm.value}>
            {pm.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {PACKAGE_MANAGERS.map((pm) => (
        <TabsContent key={pm.value} value={pm.value}>
          <CopyCommand command={`${pm.command} ${packages}`} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
