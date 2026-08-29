import { CodeBlockCommand } from "@/components/code-block-command"
import { ComponentsGrid } from "@/components/components-grid"
import { convertNpmCommand } from "@/lib/convert-npm-command"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import {
  AccordionPreview,
  AlertDialogPreview,
  AlertPreview,
  AspectRatioPreview,
  AttachmentPreview,
  AvatarPreview,
  BankInputPreview,
  BadgePreview,
  BounceSidebarPreview,
  BreadcrumbPreview,
  BubblePreview,
  ButtonGroupPreview,
  ButtonPreview,
  CalendarPreview,
  CardPreview,
  CarouselPreview,
  CheckboxPreview,
  CitySelectorPreview,
  CollapsiblePreview,
  ComboboxPreview,
  CommandPreview,
  ContextMenuPreview,
  CopyButtonPreview,
  DatePickerPreview,
  DateWheelPickerPreview,
  DialogPreview,
  DirectionPreview,
  DrawerPreview,
  DurationPickerPreview,
  DropdownMenuPreview,
  ElasticRangeSliderPreview,
  ElasticSliderPreview,
  EmptyPreview,
  FieldPreview,
  HoverCardPreview,
  InputGroupPreview,
  InputOTPPreview,
  InputPreview,
  IranMapPickerPreview,
  ItemPreview,
  KbdPreview,
  LabelPreview,
  MarkerPreview,
  MenubarPreview,
  MessagePreview,
  MessageScrollerPreview,
  MobileNumberInputPreview,
  NationalIDInputPreview,
  NativeSelectPreview,
  NavigationMenuPreview,
  PaginationPreview,
  PasswordInputPreview,
  PlateInputPreview,
  PopoverPreview,
  PriceInputPreview,
  ProgressPreview,
  ProximitySidebarPreview,
  QRCodePreview,
  QuestionnairePreview,
  RadioGroupPreview,
  ReceiptPrinterPreview,
  ResizablePreview,
  ResponsiveAlertDialogPreview,
  ResponsiveDialogPreview,
  ResponsiveMenuPreview,
  ScrollAreaPreview,
  SelectPreview,
  SeparatorPreview,
  SheetPreview,
  SidebarPreview,
  SkeletonPreview,
  SliderPreview,
  SpinnerPreview,
  StatusButtonPreview,
  SwitchPreview,
  TablePreview,
  TabsPreview,
  TextareaPreview,
  TimePickerPreview,
  ToastPreview,
  WheelPickerPreview,
  ToggleGroupPreview,
  TogglePreview,
  TomanIconPreview,
  TooltipPreview,
} from "@/components/previews"
import registry from "@/registry.json"
import { getFlatDocsNav } from "@/lib/docs-nav"

function ThumbnailFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-t-xl bg-card p-6">
      {children}
    </div>
  )
}

/** Builds an install-all CLI command from registry items. Reads straight from
 * registry.json so newly registered components/utilities appear automatically.
 */
function toInstallCommand(items: typeof registry.items) {
  if (items.length === 0) return ""
  return `npx shadcn@latest add ${items
    .map((item) => `@persianlabsui/${item.name}`)
    .join(" ")}`
}

/** The /docs/components catalog, extracted from the old page.tsx so the page
 * itself can be a markdown file. Badges come straight from docs-nav so the
 * gallery can never drift out of sync with the sidebar.
 */
export function ComponentsCatalog() {
  const badgeByHref = new Map(
    getFlatDocsNav()
      .filter((item) => item.badge)
      .map((item) => [item.href, item.badge])
  )

  const installCommands = {
    components: toInstallCommand(
      registry.items.filter((item) => item.type === "registry:ui")
    ),
    utilities: toInstallCommand(
      registry.items.filter(
        (item) => item.type === "registry:lib" || item.type === "registry:hook"
      )
    ),
    all: toInstallCommand(registry.items),
  }

  const components = [
    {
      title: "Navigation Menu",
      href: "/docs/components/navigation-menu" as const,
      description: "A collection of links for navigating websites.",
      createdAt: "2026-08-22",
      thumbnail: (
        <ThumbnailFrame>
          <NavigationMenuPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Carousel",
      href: "/docs/components/carousel" as const,
      description: "A carousel with motion and swipe built using Embla.",
      createdAt: "2026-08-22",
      thumbnail: (
        <ThumbnailFrame>
          <CarouselPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Attachment",
      href: "/docs/components/attachment" as const,
      description:
        "Displays a file or image attachment with media, metadata, upload state, and actions.",
      createdAt: "2026-08-22",
      thumbnail: (
        <ThumbnailFrame>
          <AttachmentPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Receipt Printer",
      href: "/docs/components/receipt-printer" as const,
      description:
        "A tactile checkout printer with processing stages and a composable thermal-paper receipt.",
      createdAt: "2026-08-13",
      thumbnail: (
        <ThumbnailFrame>
          <ReceiptPrinterPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Wheel Picker",
      href: "/docs/components/wheel-picker" as const,
      description:
        "An iOS-like wheel picker with smooth inertia, infinite scrolling, and keyboard navigation.",
      createdAt: "2026-08-10",
      thumbnail: (
        <ThumbnailFrame>
          <WheelPickerPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Time Picker",
      href: "/docs/components/time-picker" as const,
      description:
        "An hour/minute/second wheel-based time picker, with a responsive Popover-on-desktop, Drawer-on-mobile composition.",
      createdAt: "2026-08-10",
      thumbnail: (
        <ThumbnailFrame>
          <TimePickerPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Bank Input",
      href: "/docs/components/bank-input" as const,
      description:
        "Iranian card-number and Shaba fields with paste normalization, checksums, and bank detection.",
      createdAt: "2026-08-11",
      thumbnail: (
        <ThumbnailFrame>
          <BankInputPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Date Picker",
      href: "/docs/components/date-picker" as const,
      description:
        "Responsive Shamsi/Gregorian date and date-time fields with SSR-safe defaults and confirmation flows.",
      createdAt: "2026-08-10",
      thumbnail: (
        <ThumbnailFrame>
          <div style={{ transform: "scale(0.6)" }}>
            <DatePickerPreview />
          </div>
        </ThumbnailFrame>
      ),
    },
    {
      title: "Date Wheel Picker",
      href: "/docs/components/date-wheel-picker" as const,
      description:
        "An iOS-style year/month/day wheel-based date picker, switchable between the Shamsi and Gregorian calendars, with a responsive Popover-on-desktop, Drawer-on-mobile composition.",
      createdAt: "2026-08-10",
      thumbnail: (
        <ThumbnailFrame>
          <DateWheelPickerPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Button",
      href: "/docs/components/button" as const,
      description: "A button built on Base UI with variant and size support.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <ButtonPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Button Group",
      href: "/docs/components/button-group" as const,
      description:
        "A container that groups related buttons together with consistent styling.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <ButtonGroupPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Calendar",
      href: "/docs/components/calendar" as const,
      description:
        "A date-grid calendar built on react-day-picker, switchable between the Jalali (Shamsi) and Gregorian (Miladi) calendars via a calendarType prop.",
      createdAt: "2026-08-10",
      thumbnail: (
        <ThumbnailFrame>
          <div style={{ transform: "scale(0.7)" }}>
            <CalendarPreview />
          </div>
        </ThumbnailFrame>
      ),
    },
    {
      title: "Input",
      href: "/docs/components/input" as const,
      description: "A styled text input built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <InputPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Input OTP",
      href: "/docs/components/input-otp" as const,
      description:
        "Accessible one-time password component with copy-paste functionality.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <InputOTPPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Input Group",
      href: "/docs/components/input-group" as const,
      description: "Add addons, buttons, and helper content to inputs.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <InputGroupPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Textarea",
      href: "/docs/components/textarea" as const,
      description:
        "Displays a form textarea, or a component that looks like a textarea.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <TextareaPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Tabs",
      href: "/docs/components/tabs" as const,
      description:
        "Layered panels with a sliding active-tab indicator, built on Base UI.",
      createdAt: "2026-08-01",
      thumbnail: (
        <ThumbnailFrame>
          <TabsPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Combobox",
      href: "/docs/components/combobox" as const,
      description: "A searchable, accessible combobox built on Base UI.",
      createdAt: "2026-08-06",
      thumbnail: (
        <ThumbnailFrame>
          <ComboboxPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Command",
      href: "/docs/components/command" as const,
      description:
        "A command palette component built with Dialog and Autocomplete for searching and executing commands.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <CommandPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Select",
      href: "/docs/components/select" as const,
      description: "A listbox for choosing a single value, built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <SelectPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "City Selector",
      href: "/docs/components/city-selector" as const,
      description:
        "A province & city picker for Iran, built on Combobox and bundled with all 31 provinces and 1,119 cities.",
      createdAt: "2026-08-06",
      thumbnail: (
        <ThumbnailFrame>
          <CitySelectorPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Separator",
      href: "/docs/components/separator" as const,
      description:
        "Visually or semantically separates content, built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <SeparatorPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Card",
      href: "/docs/components/card" as const,
      description: "Displays a card with header, content, and footer.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <CardPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Breadcrumb",
      href: "/docs/components/breadcrumb" as const,
      description:
        "Displays the path to the current resource using a hierarchy of links.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <BreadcrumbPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Empty",
      href: "/docs/components/empty" as const,
      description:
        "Displays an empty state with a title, description, and optional actions.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <EmptyPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Switch",
      href: "/docs/components/switch" as const,
      description:
        "A control that toggles between checked and unchecked, built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <SwitchPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Checkbox",
      href: "/docs/components/checkbox" as const,
      description:
        "A control for selecting one or more options, built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <CheckboxPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Radio Group",
      href: "/docs/components/radio-group" as const,
      description:
        "A set of mutually exclusive radio buttons, built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <RadioGroupPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Progress",
      href: "/docs/components/progress" as const,
      description:
        "Displays an indicator showing the completion progress of a task, built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <ProgressPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Collapsible",
      href: "/docs/components/collapsible" as const,
      description:
        "An interactive component which expands/collapses a panel, built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <CollapsiblePreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Toggle",
      href: "/docs/components/toggle" as const,
      description:
        "A two-state button that can be either on or off, built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <TogglePreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Toggle Group",
      href: "/docs/components/toggle-group" as const,
      description:
        "A set of two-state buttons that can be toggled on or off, built on Base UI.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <ToggleGroupPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Native Select",
      href: "/docs/components/native-select" as const,
      description:
        "A styled native <select> element for choosing a single value.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <NativeSelectPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Elastic Slider",
      href: "/docs/components/elastic-slider" as const,
      description:
        "Slider with elastic rubber-band drag and magnetic snap feedback.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <ElasticSliderPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Elastic Range Slider",
      href: "/docs/components/elastic-range-slider" as const,
      description:
        "A single-track, dual-thumb range slider in the same visual language as Elastic Slider.",
      createdAt: "2026-08-07",
      thumbnail: (
        <ThumbnailFrame>
          <ElasticRangeSliderPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Tooltip",
      href: "/docs/components/tooltip" as const,
      description:
        "Displays contextual information when hovering or focusing an element, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <TooltipPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Accordion",
      href: "/docs/components/accordion" as const,
      description:
        "A vertically stacked set of interactive headings that each reveal a section of content, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <AccordionPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Sheet",
      href: "/docs/components/sheet" as const,
      description:
        "A panel that slides in from an edge of the screen to complement the main content, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <SheetPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Sidebar",
      href: "/docs/components/sidebar" as const,
      description:
        "A composable, collapsible application sidebar with mobile drawer, tooltips, and RTL support, built on Base UI.",
      createdAt: "2026-08-22",
      thumbnail: (
        <ThumbnailFrame>
          <SidebarPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Context Menu",
      href: "/docs/components/context-menu" as const,
      description:
        "A menu of actions triggered by a right click, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <ContextMenuPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Menubar",
      href: "/docs/components/menubar" as const,
      description:
        "A persistent horizontal menu bar for application-style commands, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <MenubarPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Dialog",
      href: "/docs/components/dialog" as const,
      description:
        "A modal window layered over the page for focused tasks or confirmations, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <DialogPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Alert Dialog",
      href: "/docs/components/alert-dialog" as const,
      description:
        "A modal dialog that interrupts the user with important content and expects a response, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <AlertDialogPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Drawer",
      href: "/docs/components/drawer" as const,
      description:
        "A swipeable panel that slides in from an edge of the screen, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <DrawerPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Responsive Dialog",
      href: "/docs/components/responsive-dialog" as const,
      description:
        "Renders a Dialog on desktop and a bottom Drawer on mobile from one shared set of components.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <ResponsiveDialogPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Responsive Menu",
      href: "/docs/components/responsive-menu" as const,
      description:
        "Renders a Dropdown Menu on desktop and a bottom Drawer menu on mobile from one shared set of components.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <ResponsiveMenuPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Responsive Alert Dialog",
      href: "/docs/components/responsive-alert-dialog" as const,
      description:
        "Renders an Alert Dialog on desktop and a bottom Drawer on mobile from one shared set of components.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <ResponsiveAlertDialogPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Alert",
      href: "/docs/components/alert" as const,
      description: "Displays a callout for important, contextual messages.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <AlertPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Aspect Ratio",
      href: "/docs/components/aspect-ratio" as const,
      description: "Displays content within a desired ratio.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <AspectRatioPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Avatar",
      href: "/docs/components/avatar" as const,
      description:
        "An image element with a fallback, for representing a user or entity, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <AvatarPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Skeleton",
      href: "/docs/components/skeleton" as const,
      description: "Used to show a placeholder while content is loading.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <SkeletonPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Direction",
      href: "/docs/components/direction" as const,
      description:
        "A provider for setting the reading direction (LTR or RTL) of your app, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <DirectionPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Hover Card",
      href: "/docs/components/hover-card" as const,
      description:
        "For sighted users to preview content available behind a link, built on Base UI.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <HoverCardPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Item",
      href: "/docs/components/item" as const,
      description:
        "A flexible layout for a piece of content, media, or action, often used in lists.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <ItemPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Marker",
      href: "/docs/components/marker" as const,
      description:
        "A small label for annotating content, such as a section divider or inline note.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <MarkerPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Bubble",
      href: "/docs/components/bubble" as const,
      description:
        "A chat message bubble with variants, reactions, and start/end alignment.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <BubblePreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Message",
      href: "/docs/components/message" as const,
      description:
        "Composable layout for a chat message with an avatar, header, content, and footer.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <MessagePreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Message Scroller",
      href: "/docs/components/message-scroller" as const,
      description:
        "An auto-scrolling viewport for chat messages, with scroll-to-start/end buttons, built on @shadcn/react.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <MessageScrollerPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Mobile Number Input",
      href: "/docs/components/mobile-number-input" as const,
      description:
        "An Iranian mobile number input that normalizes mixed paste formats and Persian digits, with a redundant validity indicator.",
      createdAt: "2026-08-17",
      thumbnail: (
        <ThumbnailFrame>
          <MobileNumberInputPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "National ID Input",
      href: "/docs/components/national-id-input" as const,
      description:
        "An Iranian national ID (کد ملی) input that normalizes Persian digits as you type or paste and validates the checksum live, with a redundant validity indicator.",
      createdAt: "2026-08-26",
      thumbnail: (
        <ThumbnailFrame>
          <NationalIDInputPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Pagination",
      href: "/docs/components/pagination" as const,
      description: "Navigation for paginated content, built on Button.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <PaginationPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Resizable",
      href: "/docs/components/resizable" as const,
      description:
        "Accessible resizable panel groups and layouts, built on react-resizable-panels.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <ResizablePreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Table",
      href: "/docs/components/table" as const,
      description:
        "A responsive table component, with an optional card-row variant.",
      createdAt: "2026-08-08",
      thumbnail: (
        <ThumbnailFrame>
          <TablePreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Badge",
      href: "/docs/components/badge" as const,
      description: "Displays a small badge to highlight status or metadata.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <BadgePreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Dropdown Menu",
      href: "/docs/components/dropdown-menu" as const,
      description:
        "Displays a menu of actions or options, triggered by a button.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <DropdownMenuPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Field",
      href: "/docs/components/field" as const,
      description:
        "Groups a label, control, and description into an accessible form field, built on Base UI.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <FieldPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Kbd",
      href: "/docs/components/kbd" as const,
      description: "Displays a keyboard key or shortcut.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <KbdPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Label",
      href: "/docs/components/label" as const,
      description: "An accessible, styled label element.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <LabelPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Popover",
      href: "/docs/components/popover" as const,
      description: "Displays rich content in a portal, anchored to a trigger.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <PopoverPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Scroll Area",
      href: "/docs/components/scroll-area" as const,
      description: "Cross-browser custom scrollbars, built on Base UI.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <ScrollAreaPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Spinner",
      href: "/docs/components/spinner" as const,
      description: "A spinning loading indicator icon.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <SpinnerPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Price Input",
      href: "/docs/components/price-input" as const,
      description:
        "A text input that formats digits as a grouped price as you type, with support for Persian/Arabic-Indic numerals.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <PriceInputPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Password Input",
      href: "/docs/components/password-input" as const,
      description:
        "A password input with a show/hide toggle that always renders LTR, regardless of the surrounding document direction.",
      createdAt: "2026-08-16",
      thumbnail: (
        <ThumbnailFrame>
          <PasswordInputPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "QR Code",
      href: "/docs/components/qr-code" as const,
      description:
        "A rounded QR code generator with dot modules, custom foreground/background colors, and a center logo slot.",
      createdAt: "2026-08-16",
      thumbnail: (
        <ThumbnailFrame>
          <QRCodePreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Questionnaire",
      href: "/docs/components/questionnaire" as const,
      description:
        "A multi-step questionnaire with single-choice, multiple-choice, freeform, and skippable questions, built on @shadcn/react.",
      createdAt: "2026-08-17",
      thumbnail: (
        <ThumbnailFrame>
          <QuestionnairePreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Toman Icon",
      href: "/docs/components/toman-icon" as const,
      description: "The Toman currency symbol, as a standalone icon component.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <TomanIconPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Toast",
      href: "/docs/components/toast" as const,
      description:
        "A temporary notification that stacks in a corner of the screen or anchors to an element, built on Base UI.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <ToastPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Copy Button",
      href: "/docs/components/copy-button" as const,
      description:
        "An icon button that copies text to the clipboard, morphs its icon to reflect the result, and anchors a confirmation toast to itself.",
      createdAt: "2026-08-09",
      thumbnail: (
        <ThumbnailFrame>
          <CopyButtonPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Slider",
      href: "/docs/components/slider" as const,
      description:
        "An input where the user selects a value from within a given range, built on Base UI.",
      createdAt: "2026-08-17",
      thumbnail: (
        <ThumbnailFrame>
          <SliderPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Status Button",
      href: "/docs/components/status-button" as const,
      description:
        "A button that swaps between idle, loading, and success feedback for async actions.",
      createdAt: "2026-08-24",
      thumbnail: (
        <ThumbnailFrame>
          <StatusButtonPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Plate Input",
      href: "/docs/components/plate-input" as const,
      description:
        "An Iranian vehicle license plate input with digit segments, a letter picker including wheelchair plates, and the Iran serial tab.",
      createdAt: "2026-08-24",
      thumbnail: (
        <ThumbnailFrame>
          <div style={{ transform: "scale(0.85)" }}>
            <PlateInputPreview />
          </div>
        </ThumbnailFrame>
      ),
    },
    {
      title: "Iran Map Picker",
      href: "/docs/components/iran-map-picker" as const,
      description:
        "An interactive SVG map of Iran's provinces for picking a province, with hover previews, keyboard selection, and shadcn-style controlled state.",
      createdAt: "2026-08-26",
      thumbnail: (
        <ThumbnailFrame>
          <IranMapPickerPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Bounce Sidebar",
      href: "/docs/components/bounce-sidebar" as const,
      description:
        "A vertical navigation list with a bouncy, arc-animated active marker that springs between items.",
      createdAt: "2026-08-29",
      thumbnail: (
        <ThumbnailFrame>
          <BounceSidebarPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Duration Picker",
      href: "/docs/components/duration-picker" as const,
      description:
        "A gooey, spring-animated picker for entering a duration in hours and minutes.",
      createdAt: "2026-08-29",
      thumbnail: (
        <ThumbnailFrame>
          <DurationPickerPreview />
        </ThumbnailFrame>
      ),
    },
    {
      title: "Proximity Sidebar",
      href: "/docs/components/proximity-sidebar" as const,
      description:
        "A document minimap of proximity-reactive dashes that tracks scroll position, expands near the pointer, and smooth-scrolls to sections on click.",
      createdAt: "2026-08-29",
      thumbnail: (
        <ThumbnailFrame>
          <ProximitySidebarPreview />
        </ThumbnailFrame>
      ),
    },
  ]
    .map((component) => ({
      ...component,
      badge: badgeByHref.get(component.href),
    }))
    .sort((a, b) => a.title.localeCompare(b.title))

  const featuredComponents = components.filter((c) => c.badge)
  const restComponents = components.filter((c) => !c.badge)

  return (
    <>
      <div id="installation" className="mt-6 max-w-2xl">
        <Tabs defaultValue="components">
          <TabsList>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="utilities">Utilities</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <TabsContent value="components" className="mt-3">
            <CodeBlockCommand
              prompt="Install every PersianLabs UI component with the shadcn CLI. The full agent-facing catalog lives at https://ui.persian-labs.ir/llms.txt"
              {...convertNpmCommand(installCommands.components)}
            />
          </TabsContent>
          <TabsContent value="utilities" className="mt-3">
            <CodeBlockCommand
              prompt="Install every PersianLabs UI utility with the shadcn CLI. The full agent-facing catalog lives at https://ui.persian-labs.ir/llms.txt"
              {...convertNpmCommand(installCommands.utilities)}
            />
          </TabsContent>
          <TabsContent value="all" className="mt-3">
            <CodeBlockCommand
              prompt="Install the whole PersianLabs UI registry — components and utilities — with the shadcn CLI. Browse what ships at https://ui.persian-labs.ir/llms.txt"
              {...convertNpmCommand(installCommands.all)}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div id="catalog">
        <ComponentsGrid featured={featuredComponents} rest={restComponents} />
      </div>
    </>
  )
}
