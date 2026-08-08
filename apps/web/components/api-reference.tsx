import { HoverDetail } from "@/components/hover-detail"
import { ExternalLinkIcon } from "lucide-react"
import { ScrollArea } from "@workspace/ui/components/scroll-area"

export interface ApiReferenceRow {
  prop: string
  type: string
  typeDetail?: string
  default?: string
  description: string
}

const baseUiReferences: Record<string, string> = {
  Accordion: "https://base-ui.com/react/components/accordion",
  AccordionItem: "https://base-ui.com/react/components/accordion",
  AlertDialog: "https://base-ui.com/react/components/alert-dialog",
  AlertDialogContent: "https://base-ui.com/react/components/alert-dialog",
  Checkbox: "https://base-ui.com/react/components/checkbox",
  Collapsible: "https://base-ui.com/react/components/collapsible",
  Combobox: "https://base-ui.com/react/components/combobox",
  ComboboxInput: "https://base-ui.com/react/components/combobox",
  ComboboxItem: "https://base-ui.com/react/components/combobox",
  ComboboxContent: "https://base-ui.com/react/components/combobox",
  ContextMenu: "https://base-ui.com/react/components/context-menu",
  ContextMenuContent: "https://base-ui.com/react/components/context-menu",
  ContextMenuItem: "https://base-ui.com/react/components/context-menu",
  Dialog: "https://base-ui.com/react/components/dialog",
  DialogPopup: "https://base-ui.com/react/components/dialog",
  Menubar: "https://base-ui.com/react/components/menubar",
  MenubarMenu: "https://base-ui.com/react/components/menubar",
  Progress: "https://base-ui.com/react/components/progress",
  RadioGroup: "https://base-ui.com/react/components/radio",
  RadioGroupItem: "https://base-ui.com/react/components/radio",
  Select: "https://base-ui.com/react/components/select",
  SelectTrigger: "https://base-ui.com/react/components/select",
  SelectContent: "https://base-ui.com/react/components/select",
  SelectItem: "https://base-ui.com/react/components/select",
  Separator: "https://base-ui.com/react/components/separator",
  Switch: "https://base-ui.com/react/components/switch",
  Tabs: "https://base-ui.com/react/components/tabs",
  TabsList: "https://base-ui.com/react/components/tabs",
  TabsTrigger: "https://base-ui.com/react/components/tabs",
  TabsContent: "https://base-ui.com/react/components/tabs",
  Toggle: "https://base-ui.com/react/components/toggle",
  ToggleGroup: "https://base-ui.com/react/components/toggle-group",
  ToggleGroupItem: "https://base-ui.com/react/components/toggle-group",
  TooltipProvider: "https://base-ui.com/react/components/tooltip",
  Tooltip: "https://base-ui.com/react/components/tooltip",
  TooltipContent: "https://base-ui.com/react/components/tooltip",
}

const shadcnReferences: Record<string, string> = {
  BreadcrumbLink: "https://ui.shadcn.com/docs/components/breadcrumb",
  Button: "https://ui.shadcn.com/docs/components/button",
  ButtonGroup: "https://ui.shadcn.com/docs/components/button-group",
  ButtonGroupText: "https://ui.shadcn.com/docs/components/button-group",
  Card: "https://ui.shadcn.com/docs/components/card",
  CardHeader: "https://ui.shadcn.com/docs/components/card",
  CardContent: "https://ui.shadcn.com/docs/components/card",
  CardFooter: "https://ui.shadcn.com/docs/components/card",
  EmptyMedia: "https://ui.shadcn.com/docs/components/empty",
  Input: "https://ui.shadcn.com/docs/components/input",
  Field: "https://ui.shadcn.com/docs/components/field",
  FieldLabel: "https://ui.shadcn.com/docs/components/field",
  InputGroup: "https://ui.shadcn.com/docs/components/input-group",
  InputGroupAddon: "https://ui.shadcn.com/docs/components/input-group",
  InputGroupButton: "https://ui.shadcn.com/docs/components/input-group",
  InputGroupInput: "https://ui.shadcn.com/docs/components/input-group",
  InputGroupTextarea: "https://ui.shadcn.com/docs/components/input-group",
  InputOTP: "https://ui.shadcn.com/docs/components/input-otp",
  InputOTPSlot: "https://ui.shadcn.com/docs/components/input-otp",
  NativeSelect: "https://ui.shadcn.com/docs/components/native-select",
  Sheet: "https://ui.shadcn.com/docs/components/sheet",
  SheetContent: "https://ui.shadcn.com/docs/components/sheet",
  Textarea: "https://ui.shadcn.com/docs/components/textarea",
}

const localProps: Record<string, readonly string[]> = {
  AlertDialog: ["size"],
  ContextMenuContent: ["inset", "variant"],
  Dialog: ["showCloseButton"],
  Switch: ["size"],
  Tabs: ["variant"],
  TabsContent: ["keepMounted"],
  Toggle: ["variant", "size"],
  ToggleGroup: ["variant", "size", "spacing"],
}

// A component page can document several subcomponents from the same Base UI
// primitive. Keep the upstream link on the root entry so the reference stays
// useful without repeating the same URL under every child heading.
const baseUiReferenceOwners = new Set([
  "Accordion",
  "AlertDialog",
  "Checkbox",
  "Collapsible",
  "Combobox",
  "ContextMenu",
  "Dialog",
  "Menubar",
  "Progress",
  "RadioGroup",
  "Select",
  "Separator",
  "Switch",
  "Tabs",
  "Toggle",
  "ToggleGroup",
  "Tooltip",
  "BreadcrumbLink",
  "Button",
  "ButtonGroup",
  "Card",
  "EmptyMedia",
  "Input",
  "InputGroup",
  "InputOTP",
  "NativeSelect",
  "Sheet",
  "Textarea",
])

export function ApiReference({
  title,
  rows,
}: {
  title: string
  rows: ApiReferenceRow[]
}) {
  const baseUiHref = baseUiReferences[title]
  const shadcnHref = shadcnReferences[title]
  const upstreamHref = baseUiHref ?? shadcnHref
  const upstreamLabel = baseUiHref ? "Base UI" : "shadcn/ui"
  const shownRows = upstreamHref
    ? rows.filter((row) => localProps[title]?.includes(row.prop))
    : rows

  if (upstreamHref && shownRows.length === 0 && !baseUiReferenceOwners.has(title)) {
    return null
  }

  return (
    <div className="mt-6">
      <h3 className="text-foreground font-mono text-sm font-medium">{title}</h3>
      {shownRows.length > 0 ? (
        <ScrollArea
          scrollbarOrientation="horizontal"
          className="border-border mt-3 rounded-lg border"
        >
        <table className="min-w-[48rem] w-full text-left text-sm">
          <thead>
            <tr className="border-border bg-muted/40 border-b">
              <th className="text-muted-foreground px-4 py-2 font-medium">Prop</th>
              <th className="text-muted-foreground px-4 py-2 font-medium">Type</th>
              <th className="text-muted-foreground px-4 py-2 font-medium">Default</th>
              <th className="text-muted-foreground min-w-64 px-4 py-2 font-medium">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-border/60 divide-y">
            {shownRows.map((row) => (
              <tr key={row.prop}>
                <td className="text-foreground px-4 py-2.5 font-mono whitespace-nowrap">
                  {row.prop}
                </td>
                <td className="text-muted-foreground px-4 py-2.5 font-mono whitespace-nowrap">
                  {row.typeDetail ? (
                    <HoverDetail detail={row.typeDetail}>{row.type}</HoverDetail>
                  ) : (
                    row.type
                  )}
                </td>
                <td className="text-muted-foreground px-4 py-2.5 font-mono whitespace-nowrap">
                  {row.default ?? "—"}
                </td>
                <td className="text-muted-foreground min-w-64 px-4 py-2.5 leading-relaxed">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </ScrollArea>
      ) : null}
      {upstreamHref && baseUiReferenceOwners.has(title) ? (
        <p className="mt-3 text-sm text-muted-foreground">
          {shownRows.length > 0 ? "All other props are inherited from " : "API reference: "}
          <a href={upstreamHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground underline underline-offset-4">
            {upstreamLabel} {title} <ExternalLinkIcon className="size-3" />
          </a>
          .
        </p>
      ) : null}
    </div>
  )
}
