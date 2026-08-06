import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

export function TabsDefaultExample() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="text-muted-foreground mt-4 text-sm leading-relaxed"
      >
        A quick summary of what changed, at a glance.
      </TabsContent>
      <TabsContent
        value="activity"
        className="text-muted-foreground mt-4 text-sm leading-relaxed"
      >
        A running log of recent events, newest first.
      </TabsContent>
      <TabsContent
        value="settings"
        className="text-muted-foreground mt-4 text-sm leading-relaxed"
      >
        Preferences that apply across the whole workspace.
      </TabsContent>
    </Tabs>
  )
}
