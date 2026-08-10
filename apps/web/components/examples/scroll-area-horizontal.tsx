import { ScrollArea } from "@workspace/ui/components/scroll-area"

const colors = [
  "#f87171",
  "#fb923c",
  "#facc15",
  "#4ade80",
  "#22d3ee",
  "#818cf8",
  "#f472b6",
]

export function ScrollAreaHorizontalExample() {
  return (
    <ScrollArea
      scrollbarOrientation="horizontal"
      className="w-72 rounded-lg border border-border"
    >
      <div className="flex gap-3 p-4">
        {colors.map((color) => (
          <div
            key={color}
            className="size-16 shrink-0 rounded-lg"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
