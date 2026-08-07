import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectGroupLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

const fruits = ["Apple", "Banana", "Blueberry"]
const vegetables = ["Carrot", "Broccoli", "Spinach"]

export function SelectGroupsExample() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select an ingredient" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>Fruits</SelectGroupLabel>
          {fruits.map((fruit) => (
            <SelectItem key={fruit} value={fruit}>
              {fruit}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Vegetables</SelectGroupLabel>
          {vegetables.map((vegetable) => (
            <SelectItem key={vegetable} value={vegetable}>
              {vegetable}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
