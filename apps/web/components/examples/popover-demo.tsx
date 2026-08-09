import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

export function PopoverDemoExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>
        <p className="text-sm font-medium">Dimensions</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </PopoverContent>
    </Popover>
  )
}
