"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { cn } from "@workspace/ui/lib/utils"
import { TextAlignEnd, TextAlignStart } from "lucide"
import { MorphIcon } from "morphicons/react"
import * as React from "react"

export function ComponentPreview({
  preview,
  code,
  className,
  dir: forcedDir,
}: {
  preview: React.ReactNode
  code: React.ReactNode
  className?: string
  /** Locks the preview direction and hides the direction toggle. Use for examples that force their own direction. */
  dir?: "ltr" | "rtl"
}) {
  const [dir, setDir] = React.useState<"ltr" | "rtl">(forcedDir ?? "ltr")
  const resolvedDir = forcedDir ?? dir

  return (
    <Tabs defaultValue="preview" className={cn("w-full", className)}>
      <div className="flex items-center justify-between gap-3">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        {!forcedDir && (
          <button
            type="button"
            onClick={() => setDir((current) => (current === "ltr" ? "rtl" : "ltr"))}
            aria-label="Toggle preview direction"
            className="border-border text-muted-foreground hover:text-foreground hover:bg-muted inline-flex h-7 w-18 shrink-0 items-center justify-center gap-1.5 rounded-md border text-xs font-medium transition-colors"
          >
            <MorphIcon
              icon={resolvedDir === "ltr" ? TextAlignStart : TextAlignEnd}
              spring="snappy"
              className="size-3.5"
            />
            {resolvedDir.toUpperCase()}
          </button>
        )}
      </div>

      <TabsContent value="preview" className="mt-3">
        <div
          key={resolvedDir}
          dir={resolvedDir}
          className="border-border bg-background flex min-h-56 items-center justify-center rounded-xl border p-8"
        >
          {preview}
        </div>
      </TabsContent>

      <TabsContent value="code" className="mt-3">
        {code}
      </TabsContent>
    </Tabs>
  )
}
