import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

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
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
      >
        A quick summary of what changed, at a glance.
      </TabsContent>
      <TabsContent
        value="activity"
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
      >
        A running log of recent events, newest first.
      </TabsContent>
      <TabsContent
        value="settings"
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
      >
        Preferences that apply across the whole workspace.
      </TabsContent>
    </Tabs>
  )
}
