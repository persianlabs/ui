import { BellIcon, HomeIcon, UserIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

export function TabsIconsExample() {
  return (
    <Tabs defaultValue="home" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="home">
          <HomeIcon />
          Home
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <BellIcon />
          Alerts
        </TabsTrigger>
        <TabsTrigger value="profile">
          <UserIcon />
          Profile
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="home"
        className="text-muted-foreground mt-4 text-sm leading-relaxed"
      >
        Your feed, curated from the people you follow.
      </TabsContent>
      <TabsContent
        value="notifications"
        className="text-muted-foreground mt-4 text-sm leading-relaxed"
      >
        Nothing new — you&apos;re all caught up.
      </TabsContent>
      <TabsContent
        value="profile"
        className="text-muted-foreground mt-4 text-sm leading-relaxed"
      >
        Manage your public profile and account details.
      </TabsContent>
    </Tabs>
  )
}
