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

const fruits = ["سیب", "موز", "بلوبری"]
const vegetables = ["هویج", "بروکلی", "اسفناج"]

export function SelectRtlExample() {
  return (
    <Select>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="یک میوه انتخاب کنید" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>میوه‌ها</SelectGroupLabel>
          {fruits.map((fruit) => (
            <SelectItem key={fruit} value={fruit}>
              {fruit}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>سبزیجات</SelectGroupLabel>
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
