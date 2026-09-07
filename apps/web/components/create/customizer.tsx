"use client"

// Ported from the shadcn create app's customizer.tsx. The item explorer,
// style/chart-color/menu pickers and base/template/style-based disabling are
// dropped — there is a single style (taymaz), Base UI only, and RTL is
// always on.

import * as React from "react"
import dynamic from "next/dynamic"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card"
import { FieldGroup } from "@workspace/ui/components/field"
import { cn } from "@workspace/ui/lib/utils"

import { BaseColorPicker } from "@/components/create/base-color-picker"
import { CopyPreset } from "@/components/create/copy-preset"
import { FontPicker } from "@/components/create/font-picker"
import { MainMenu } from "@/components/create/main-menu"
import { OpenPreset } from "@/components/create/open-preset"
import { RadiusPicker } from "@/components/create/radius-picker"
import { StylePicker } from "@/components/create/style-picker"
import { MenuColorPicker } from "@/components/create/menu-picker"
import { MenuAccentPicker } from "@/components/create/accent-picker"
import { RandomButton } from "@/components/create/random-button"
import { ResetDialog } from "@/components/create/reset-button"
import { ThemePicker } from "@/components/create/theme-picker"
import { getThemesForBaseColor } from "@/lib/create/config"
import { useDesignSystemSearchParams } from "@/lib/create/search-params"
import {
  FA_FONTS,
  FA_FONT_HEADING_OPTIONS,
  FONTS,
  FONT_HEADING_OPTIONS,
  MONO_FONTS,
} from "@/lib/create/fonts"

// Only visible when user clicks "Create Project". Rendered client-only to
// avoid a useId hydration mismatch on the Base UI dialog trigger. The loading
// placeholder mirrors the trigger button exactly so there is no layout shift.
const ProjectForm = dynamic(
  () => import("@/components/create/project-form").then((m) => m.ProjectForm),
  {
    ssr: false,
    loading: () => (
      <Button disabled aria-hidden>
        Get Code
      </Button>
    ),
  }
)

// The workspace field.tsx does not ship FieldSeparator; this mirrors the
// shadcn one used between customizer picker groups.
function FieldSeparator({ className }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      data-slot="field-separator"
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
    />
  )
}

export function Customizer() {
  const [params] = useDesignSystemSearchParams()
  const isMobile = useIsMobile()
  const anchorRef = React.useRef<HTMLDivElement | null>(null)

  // Shadcn-style: only the current base's own theme plus the accent themes
  // are offered — base themes belonging to another base stay hidden.
  const availableThemes = React.useMemo(
    () => getThemesForBaseColor(params.baseColor),
    [params.baseColor]
  )

  return (
    <Card
      className="dark top-24 right-12 isolate z-10 max-h-full min-h-0 w-full self-start rounded-2xl bg-card/90 backdrop-blur-xl md:w-(--customizer-width)"
      ref={anchorRef}
      size="sm"
    >
      <CardHeader className="hidden items-center justify-between gap-2 border-b group-data-reversed/layout:flex-row-reverse md:flex">
        <MainMenu />
      </CardHeader>
      <CardContent className="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden md:overflow-y-auto">
        <FieldGroup className="flex-row gap-2.5 py-px **:data-[slot=field-separator]:-mx-4 **:data-[slot=field-separator]:w-auto md:flex-col md:gap-3.25">
          <StylePicker />
          <BaseColorPicker isMobile={isMobile} anchorRef={anchorRef} />
          <ThemePicker
            themes={availableThemes}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FieldSeparator className="hidden md:block" />
          <FontPicker
            label="Heading"
            param="fontHeading"
            options={FONT_HEADING_OPTIONS}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FontPicker
            label="Font"
            param="font"
            options={FONTS}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FontPicker
            label="Font Mono"
            param="fontMono"
            options={MONO_FONTS}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FieldSeparator className="hidden md:block" />
          <FontPicker
            label="Farsi Heading"
            param="faFontHeading"
            options={FA_FONT_HEADING_OPTIONS}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FontPicker
            label="Farsi Font"
            param="faFont"
            options={FA_FONTS}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FieldSeparator className="hidden md:block" />
          <RadiusPicker isMobile={isMobile} anchorRef={anchorRef} />
          <FieldSeparator className="hidden md:block" />
          <MenuColorPicker isMobile={isMobile} anchorRef={anchorRef} />
          <MenuAccentPicker isMobile={isMobile} anchorRef={anchorRef} />
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex min-w-0 gap-2 md:flex-col md:rounded-b-none md:**:[button,a]:w-full">
        <CopyPreset className="min-w-0 flex-1 md:flex-none" />
        <OpenPreset
          className="max-w-20 min-w-0 flex-1 sm:max-w-none md:flex-none"
          label={isMobile ? "Open" : "Open Preset"}
        />
        <RandomButton className="max-w-20 min-w-0 flex-1 sm:max-w-none md:flex-none" />
        <ResetDialog />
      </CardFooter>
      <CardFooter className="-mt-3 hidden min-w-0 gap-2 md:flex md:flex-col md:**:[button,a]:w-full">
        <ProjectForm />
      </CardFooter>
    </Card>
  )
}
