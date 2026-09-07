"use client"

// Mirrors the shadcn /create page: full-height preview + customizer frame,
// wrapped in the preview-override provider (hover previews), the locks
// provider (picker locks) and the nuqs-based undo/redo history provider.
// The Persian page header lives in app/create/page.tsx above this frame.

import * as React from "react"
import { Suspense } from "react"
import dynamic from "next/dynamic"

import { Skeleton } from "@workspace/ui/components/skeleton"
import { TooltipProvider } from "@workspace/ui/components/tooltip"

import { Customizer } from "@/components/create/customizer"
import { Preview } from "@/components/create/preview"
import { PreviewOverrideProvider } from "@/components/create/preview-override"
import { HistoryProvider } from "@/components/create/hooks/use-history"
import { LocksProvider } from "@/components/create/hooks/use-locks"

// Only shown on first visit (checks localStorage).
const WelcomeDialog = dynamic(() =>
  import("@/components/create/welcome-dialog").then((m) => m.WelcomeDialog)
)

// The design-system search params are read inside the preview and the
// customizer; keep them behind a Suspense boundary so the frame renders
// while the URL state resolves.
function DesignerSkeleton() {
  return (
    <>
      <div className="min-h-[151px] w-full flex-1 self-start rounded-2xl md:h-full md:max-h-full md:min-h-0" />
      <Skeleton className="isolate min-h-[151px] w-full self-start rounded-2xl md:h-full md:max-h-full md:min-h-0 md:w-(--customizer-width)" />
    </>
  )
}

export function CreateApp() {
  return (
    <div className="section-soft relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden [--customizer-width:--spacing(48)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]">
      <div
        data-slot="designer"
        className="flex min-h-0 flex-1 flex-col gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
      >
        <PreviewOverrideProvider>
          <LocksProvider>
            <HistoryProvider>
              <Suspense fallback={<DesignerSkeleton />}>
                <Preview />
                <TooltipProvider delay={0}>
                  <Customizer />
                </TooltipProvider>
              </Suspense>
            </HistoryProvider>
          </LocksProvider>
        </PreviewOverrideProvider>
      </div>
      <WelcomeDialog />
    </div>
  )
}
