import { Button } from "@workspace/ui/components/button"
import { Marker, MarkerContent } from "@workspace/ui/components/marker"

export function MarkerRtlExample() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Button variant="outline" className="w-full">
        ادامه با ایمیل
      </Button>
      <Marker variant="separator">
        <MarkerContent>یا</MarkerContent>
      </Marker>
      <Button variant="outline" className="w-full">
        ادامه با گوگل
      </Button>
    </div>
  )
}
