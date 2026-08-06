import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
        {title}
      </span>
      {children}
    </div>
  )
}

export function TabsVariantsExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Section title="Default">
        <Tabs defaultValue="overview" variant="default">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </Section>

      <Section title="Rounded">
        <Tabs defaultValue="day" variant="rounded">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </Section>

      <Section title="Line">
        <Tabs defaultValue="all" variant="line">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
        </Tabs>
      </Section>

      <Section title="Ghost">
        <Tabs defaultValue="grid" variant="ghost">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </Section>
    </div>
  )
}
