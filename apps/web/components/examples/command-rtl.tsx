"use client"

import * as React from "react"

import { FileTextIcon, SettingsIcon, UserIcon } from "lucide-react"

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
} from "@workspace/ui/components/command"

const groups = [
  {
    value: "پیشنهادها",
    items: [
      { value: "profile", label: "پروفایل کاربری", icon: UserIcon },
      { value: "documents", label: "اسناد من", icon: FileTextIcon },
    ],
  },
  {
    value: "تنظیمات",
    items: [{ value: "settings", label: "تنظیمات حساب", icon: SettingsIcon }],
  },
]

export function CommandRtlExample() {
  return (
    <div dir="rtl">
      <CommandPanel className="w-72">
        <Command items={groups}>
          <CommandInput placeholder="جستجوی دستور..." />
          <CommandEmpty>موردی یافت نشد.</CommandEmpty>
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
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
                {index < groups.length - 1 && <CommandSeparator />}
              </React.Fragment>
            )}
          </CommandList>
        </Command>
      </CommandPanel>
    </div>
  )
}
