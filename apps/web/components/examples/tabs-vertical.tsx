import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

export function TabsVerticalExample() {
  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="w-full max-w-sm flex-row gap-4"
    >
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent
          value="general"
          className="text-sm leading-relaxed text-muted-foreground"
        >
          Name, language, and workspace preferences.
        </TabsContent>
        <TabsContent
          value="security"
          className="text-sm leading-relaxed text-muted-foreground"
        >
          Two-factor auth and active sessions.
        </TabsContent>
        <TabsContent
          value="billing"
          className="text-sm leading-relaxed text-muted-foreground"
        >
          Plan, invoices, and payment methods.
        </TabsContent>
      </div>
    </Tabs>
  )
}
