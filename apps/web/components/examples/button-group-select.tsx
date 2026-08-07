import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

export function ButtonGroupSelectExample() {
  return (
    <ButtonGroup>
      <Select defaultValue="next">
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="svelte">SvelteKit</SelectItem>
          <SelectItem value="nuxt">Nuxt.js</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline">Deploy</Button>
    </ButtonGroup>
  )
}
