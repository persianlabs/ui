"use client"

import type { Route } from "next"

import * as React from "react"
import Link from "next/link"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"

import { DirectionProvider } from "@workspace/ui/components/direction"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "هشدار",
    description: "پنجره‌ای برای نمایش پیام‌های مهم و دریافت پاسخ کاربر.",
    href: "/docs/components/alert-dialog",
  },
  {
    title: "کارت شناور",
    description: "پیش‌نمایش محتوای یک لینک هنگام نگه‌داشتن نشانگر.",
    href: "/docs/components/hover-card",
  },
  {
    title: "نوار پیشرفت",
    description: "نمایش میزان پیشرفت یک کار به‌صورت یک نوار.",
    href: "/docs/components/progress",
  },
]

export function NavigationMenuRtlExample() {
  return (
    <DirectionProvider direction="rtl">
      <NavigationMenu dir="rtl">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>شروع</NavigationMenuTrigger>
            <NavigationMenuContent dir="rtl">
              <ul className="w-96">
                <ListItem href="/docs" title="معرفی">
                  کامپوننت‌های آماده برای رابط‌های فارسی.
                </ListItem>
                <ListItem href="/docs/theming" title="پوسته">
                  چطور کامپوننت‌ها را شخصی‌سازی کنید.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:flex">
            <NavigationMenuTrigger>کامپوننت‌ها</NavigationMenuTrigger>
            <NavigationMenuContent dir="rtl">
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>با آیکون</NavigationMenuTrigger>
            <NavigationMenuContent dir="rtl">
              <ul className="grid w-[200px]">
                <li>
                  <NavigationMenuLink
                    render={
                      <Link href="#" className="flex-row items-center gap-2" />
                    }
                  >
                    <CircleAlertIcon />
                    در انتظار
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    render={
                      <Link href="#" className="flex-row items-center gap-2" />
                    }
                  >
                    <CircleDashedIcon />
                    در حال انجام
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    render={
                      <Link href="#" className="flex-row items-center gap-2" />
                    }
                  >
                    <CircleCheckIcon />
                    انجام شد
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<Link href="/docs" />}
              className={navigationMenuTriggerStyle()}
            >
              مستندات
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </DirectionProvider>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href as Route} />}>
        <div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
