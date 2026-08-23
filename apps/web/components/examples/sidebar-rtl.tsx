"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  SquareTerminal,
  Trash2,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@workspace/ui/components/sidebar"

const data = {
  user: {
    name: "taymaz",
    email: "taymazak1382@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "پرشین لبز", logo: GalleryVerticalEnd, plan: "سازمانی" },
    { name: "شرکت نمونه", logo: AudioWaveform, plan: "استارتاپ" },
  ],
  navMain: [
    {
      title: "میزکار",
      icon: SquareTerminal,
      isActive: true,
      items: ["تاریخچه", "ستاره‌دار", "تنظیمات"],
    },
    {
      title: "مدل‌ها",
      icon: Bot,
      items: ["جنیسیس", "اکسپلورر", "کوانتوم"],
    },
    {
      title: "مستندات",
      icon: Frame,
      items: ["مقدمه", "شروع سریع", "آموزش‌ها"],
    },
    {
      title: "تنظیمات",
      icon: Settings2,
      items: ["عمومی", "تیم", "صورت‌حساب"],
    },
  ],
  projects: [
    { name: "مهندسی طراحی", icon: Frame },
    { name: "فروش و بازاریابی", icon: PieChart },
    { name: "سفر", icon: Map },
  ],
}

function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0])

  if (!activeTeam) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[popup-open]:bg-sidebar-accent data-[popup-open]:text-sidebar-accent-foreground"
              />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <activeTeam.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-start text-sm leading-tight">
              <span className="truncate font-medium">{activeTeam.name}</span>
              <span className="truncate text-xs">{activeTeam.plan}</span>
            </div>
            <ChevronsUpDown className="ms-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "left"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuGroupLabel className="text-xs text-muted-foreground">
                تیم‌ها
              </DropdownMenuGroupLabel>
              {data.teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <team.logo className="size-3.5 shrink-0" />
                  </div>
                  {team.name}
                  <span className="ms-auto text-xs tracking-widest opacity-60">
                    ⌘{index + 1}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                افزودن تیم
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function NavMain({ items }: { items: (typeof data)["navMain"] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>پلتفرم</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger
                render={<SidebarMenuButton tooltip={item.title} />}
              >
                {item.icon ? <item.icon /> : null}
                <span>{item.title}</span>
                <ChevronRight className="ms-auto transition-transform duration-200 group-data-[open]/collapsible:rotate-90 rtl:-scale-x-100 rtl:group-data-[open]/collapsible:-rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem}>
                      <SidebarMenuSubButton
                        render={<a href="#">{subItem}</a>}
                      />
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavProjects({ projects }: { projects: (typeof data)["projects"] }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>پروژه‌ها</SidebarGroupLabel>
      <SidebarGroupAction>
        <Plus /> <span className="sr-only">افزودن پروژه</span>
      </SidebarGroupAction>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<a href="#" />}>
              <item.icon />
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuAction showOnHover />}>
                <MoreHorizontal />
                <span className="sr-only">بیشتر</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "left"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="size-4 text-muted-foreground" />
                  <span>مشاهده پروژه</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="size-4 text-muted-foreground" />
                  <span>اشتراک‌گذاری پروژه</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2 className="size-4" />
                  <span>حذف پروژه</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>بیشتر</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

function NavUser() {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[popup-open]:bg-sidebar-accent data-[popup-open]:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={data.user.avatar} alt={data.user.name} />
              <AvatarFallback className="rounded-lg">PL</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-start text-sm leading-tight">
              <span className="truncate font-medium">{data.user.name}</span>
              <span className="truncate text-xs">{data.user.email}</span>
            </div>
            <ChevronsUpDown className="ms-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "left"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CreditCard className="size-4" />
                صورت‌حساب
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings2 className="size-4" />
                تنظیمات
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut className="size-4" />
              خروج از حساب
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function SidebarRtlExample() {
  return (
    <div
      dir="rtl"
      className="relative h-full w-full [transform:translateZ(0)] overflow-hidden"
    >
      <SidebarProvider className="h-full min-h-0">
        <Sidebar side="right" dir="rtl" collapsible="icon" className="h-full">
          <SidebarHeader>
            <TeamSwitcher />
          </SidebarHeader>
          <SidebarContent>
            <NavMain items={data.navMain} />
            <NavProjects projects={data.projects} />
          </SidebarContent>
          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <SidebarTrigger />
          </header>
          <div className="flex flex-1 flex-col items-start justify-center gap-4 p-8">
            <p className="text-lg font-semibold">
              سایدباری که به آیکن‌ها جمع می‌شود.
            </p>
            <p className="text-sm text-muted-foreground">
              برای باز و بسته کردن روی ریل کلیک کنید یا{" "}
              <kbd
                dir="ltr"
                className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px] text-foreground"
              >
                ⌘B
              </kbd>{" "}
              /{" "}
              <kbd
                dir="ltr"
                className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px] text-foreground"
              >
                Ctrl+B
              </kbd>{" "}
              را بزنید.
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
