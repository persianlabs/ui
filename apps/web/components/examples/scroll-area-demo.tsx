import { ScrollArea } from "@workspace/ui/components/scroll-area"

const tags = Array.from({ length: 30 }, (_, i) => `Tag ${i + 1}`)

export function ScrollAreaDemoExample() {
  return (
    <ScrollArea className="h-56 w-48 rounded-lg border border-border">
      <div className="flex flex-col gap-2 p-4">
        {tags.map((tag) => (
          <div key={tag} className="text-sm">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
