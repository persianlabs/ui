import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

export function PopoverFormExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Edit width</Button>} />
      <PopoverContent>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="popover-form-width">Width</Label>
            <Input id="popover-form-width" defaultValue="100%" className="h-8" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="popover-form-height">Height</Label>
            <Input id="popover-form-height" defaultValue="25px" className="h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
