"use client"

// Ported from the shadcn create app's preview-switcher. Instead of shadcn's
// item-explorer link it composes our Picker primitives (Base UI menu) to list
// the available preview items.

import { ChevronDownIcon } from "lucide-react"

import {
  PREVIEW_ITEMS,
  type PreviewItemName,
} from "@/components/create/forward-types"
import {
  Picker,
  PickerContent,
  PickerRadioGroup,
  PickerRadioItem,
  PickerTrigger,
} from "@/components/create/picker"
import { useDesignSystemSearchParams } from "@/lib/create/search-params"

export function PreviewSwitcher() {
  const [params, setParams] = useDesignSystemSearchParams()

  const isPreviewItem = PREVIEW_ITEMS.some((item) => item.name === params.item)
  if (!isPreviewItem) {
    return null
  }

  const currentItem = PREVIEW_ITEMS.find((item) => item.name === params.item)

  return (
    <div className="dark absolute right-3 bottom-3 z-20 flex items-center gap-1 rounded-xl bg-card/90 p-1 shadow-xl backdrop-blur-xl">
      <Picker>
        <PickerTrigger className="h-7 w-auto cursor-pointer rounded-lg px-2.5 py-0 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:w-auto md:rounded-lg md:px-2.5 md:py-0">
          <span className="flex items-center gap-1">
            {currentItem?.title ?? params.item}
            <ChevronDownIcon className="size-3.5 opacity-50" />
          </span>
        </PickerTrigger>
        <PickerContent side="top" align="end" alignOffset={-4}>
          <PickerRadioGroup
            value={params.item}
            onValueChange={(value) =>
              setParams({ item: value as PreviewItemName })
            }
          >
            {PREVIEW_ITEMS.map((item) => (
              <PickerRadioItem key={item.name} value={item.name}>
                {item.title}
              </PickerRadioItem>
            ))}
          </PickerRadioGroup>
        </PickerContent>
      </Picker>
    </div>
  )
}
