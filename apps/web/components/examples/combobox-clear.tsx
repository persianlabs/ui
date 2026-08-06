"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ComboboxClearExample() {
  const [value, setValue] = React.useState<string | null>("Next.js")

  return (
    <Combobox items={frameworks} value={value} onValueChange={setValue}>
      <ComboboxInputGroup className="w-64">
        <ComboboxInput placeholder="Select a framework" />
        {value && <ComboboxClear />}
        <ComboboxIcon />
      </ComboboxInputGroup>
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
