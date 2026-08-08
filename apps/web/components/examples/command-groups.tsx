"use client"

import * as React from "react"

import { CreditCardIcon, SettingsIcon, UserIcon } from "lucide-react"

import {
  Command,
  CommandCollection,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components/command"

const groups = [
  {
    value: "Suggestions",
    items: [
      { value: "profile", label: "Profile", icon: UserIcon, shortcut: "⌘P" },
      {
        value: "billing",
        label: "Billing",
        icon: CreditCardIcon,
        shortcut: "⌘B",
      },
    ],
  },
  {
    value: "Settings",
    items: [
      {
        value: "settings",
        label: "Settings",
        icon: SettingsIcon,
        shortcut: "⌘S",
      },
    ],
  },
]

export function CommandGroupsExample() {
  return (
    <CommandPanel className="w-72">
      <Command items={groups}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group, index) => (
            <React.Fragment key={group.value}>
              <CommandGroup items={group.items}>
                <CommandGroupLabel>{group.value}</CommandGroupLabel>
                <CommandCollection>
                  {(item) => (
                    <CommandItem key={item.value} value={item.value}>
                      <item.icon />
                      {item.label}
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    </CommandItem>
                  )}
                </CommandCollection>
              </CommandGroup>
              {index < groups.length - 1 && <CommandSeparator />}
            </React.Fragment>
          ))}
        </CommandList>
      </Command>
    </CommandPanel>
  )
}
