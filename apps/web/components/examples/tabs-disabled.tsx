import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

export function TabsDisabledExample() {
  return (
    <Tabs defaultValue="draft" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="review">In review</TabsTrigger>
        <TabsTrigger value="published" disabled>
          Published
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="draft"
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
      >
        Only visible to you until it&apos;s sent for review.
      </TabsContent>
      <TabsContent
        value="review"
        className="mt-4 text-sm leading-relaxed text-muted-foreground"
      >
        Waiting on a teammate to approve this change.
      </TabsContent>
    </Tabs>
  )
}
