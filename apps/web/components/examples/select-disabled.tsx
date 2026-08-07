import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

export function SelectDisabledExample() {
  return (
    <Select disabled defaultValue="Apple">
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grapes" disabled>
            Grapes
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
