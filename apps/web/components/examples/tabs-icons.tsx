import { BellIcon, HomeIcon, UserIcon } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

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
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
      >
        Your feed, curated from the people you follow.
      </TabsContent>
      <TabsContent
        value="notifications"
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
      >
        Nothing new — you&apos;re all caught up.
      </TabsContent>
      <TabsContent
        value="profile"
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
      >
        Manage your public profile and account details.
      </TabsContent>
    </Tabs>
  )
}
