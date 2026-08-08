import { Button } from "@workspace/ui/components/button"
import { Marker, MarkerContent } from "@workspace/ui/components/marker"

export function MarkerSeparatorExample() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Button variant="outline" className="w-full">
        Continue with Email
      </Button>
      <Marker variant="separator">
        <MarkerContent>OR</MarkerContent>
      </Marker>
      <Button variant="outline" className="w-full">
        Continue with Google
      </Button>
    </div>
  )
}
