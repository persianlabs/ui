"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
} from "@workspace/ui/components/combobox"

const groups = [
  { value: "Fruits", items: ["Apple", "Banana", "Orange"] },
  { value: "Vegetables", items: ["Carrot", "Potato", "Onion"] },
]

export function ComboboxGroupsExample() {
  return (
    <Combobox items={groups}>
      <ComboboxInputGroup className="w-64">
        <ComboboxInput placeholder="Select an ingredient" />
        <ComboboxIcon />
      </ComboboxInputGroup>
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {groups.map((group, index) => (
            <React.Fragment key={group.value}>
              <ComboboxGroup items={group.items}>
                <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
              {index < groups.length - 1 && <ComboboxSeparator />}
            </React.Fragment>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
