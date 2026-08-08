"use client"

import * as React from "react"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalculatorIcon,
  CalendarIcon,
  CornerDownLeftIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components/command"
import { Kbd } from "@workspace/ui/components/kbd"

const groups = [
  {
    value: "Suggestions",
    items: [
      { value: "calendar", label: "Calendar", icon: CalendarIcon },
      { value: "search-emoji", label: "Search Emoji", icon: SmileIcon },
      { value: "calculator", label: "Calculator", icon: CalculatorIcon },
    ],
  },
  {
    value: "Settings",
    items: [
      { value: "profile", label: "Profile", icon: UserIcon, shortcut: "⌘P" },
      {
        value: "billing",
        label: "Billing",
        icon: CreditCardIcon,
        shortcut: "⌘B",
      },
      {
        value: "settings",
        label: "Settings",
        icon: SettingsIcon,
        shortcut: "⌘S",
      },
    ],
  },
]

export function CommandBasicExample() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function down(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandDialogTrigger
        render={
          <Button variant="outline" className="justify-between text-muted-foreground">
            Search commands...
            <Kbd>⌘K</Kbd>
          </Button>
        }
      />
      <CommandDialogPopup>
        <Command items={groups}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            {(group: (typeof groups)[number], index: number) => (
              <React.Fragment key={group.value}>
                <CommandGroup items={group.items}>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(item) => (
                      <CommandItem key={item.value} value={item.value}>
                        <item.icon />
                        {item.label}
                        {"shortcut" in item && item.shortcut && (
                          <CommandShortcut>{item.shortcut}</CommandShortcut>
                        )}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
                {index < groups.length - 1 && <CommandSeparator />}
              </React.Fragment>
            )}
          </CommandList>
          <CommandFooter>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Kbd>
                  <ArrowUpIcon className="size-2.5" />
                </Kbd>
                <Kbd>
                  <ArrowDownIcon className="size-2.5" />
                </Kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <Kbd>
                  <CornerDownLeftIcon className="size-2.5" />
                </Kbd>
                to select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Kbd>esc</Kbd>
              to close
            </span>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  )
}
