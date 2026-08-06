import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { ScrollFade } from "@/components/scroll-fade"

const sections = [
  "Overview",
  "Activity",
  "Settings",
  "Billing",
  "Team",
  "Integrations",
  "Notifications",
  "Security",
  "API Keys",
  "Webhooks",
]

export function TabsScrollableExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Tabs defaultValue={sections[0]}>
        <ScrollFade axis="x">
          <TabsList>
            {sections.map((section) => (
              <TabsTrigger key={section} value={section}>
                {section}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollFade>
      </Tabs>

      <Tabs
        defaultValue={sections[0]}
        orientation="vertical"
        className="flex-row gap-4"
      >
        <ScrollFade axis="y" className="max-h-48">
          <TabsList>
            {sections.map((section) => (
              <TabsTrigger key={section} value={section}>
                {section}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollFade>
      </Tabs>
    </div>
  )
}
