import { Marker, MarkerContent } from "@workspace/ui/components/marker"

export function MarkerBorderExample() {
  return (
    <div className="w-full max-w-sm">
      <Marker variant="border">
        <MarkerContent className="text-base font-medium text-foreground">
          Account settings
        </MarkerContent>
      </Marker>
    </div>
  )
}
