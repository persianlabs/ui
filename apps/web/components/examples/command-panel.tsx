"use client"

import { CalculatorIcon, CalendarIcon, SmileIcon } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from "@workspace/ui/components/command"

const items = [
  { value: "calendar", label: "Calendar", icon: CalendarIcon },
  { value: "search-emoji", label: "Search Emoji", icon: SmileIcon },
  { value: "calculator", label: "Calculator", icon: CalculatorIcon },
]

export function CommandPanelExample() {
  return (
    <CommandPanel className="w-72">
      <Command items={items}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          {(item: (typeof items)[number]) => (
            <CommandItem key={item.value} value={item.value}>
              <item.icon />
              {item.label}
            </CommandItem>
          )}
        </CommandList>
      </Command>
    </CommandPanel>
  )
}
