import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectGroupLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

const northAmerica = [
  "Eastern Standard Time",
  "Central Standard Time",
  "Mountain Standard Time",
  "Pacific Standard Time",
]
const europeAfrica = [
  "Greenwich Mean Time",
  "Central European Time",
  "Eastern European Time",
]
const asia = [
  "Moscow Time",
  "India Standard Time",
  "China Standard Time",
  "Japan Standard Time",
]
const australiaPacific = [
  "Australian Western Standard Time",
  "Australian Eastern Standard Time",
]

export function SelectScrollableExample() {
  return (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>North America</SelectGroupLabel>
          {northAmerica.map((zone) => (
            <SelectItem key={zone} value={zone}>
              {zone}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Europe & Africa</SelectGroupLabel>
          {europeAfrica.map((zone) => (
            <SelectItem key={zone} value={zone}>
              {zone}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Asia</SelectGroupLabel>
          {asia.map((zone) => (
            <SelectItem key={zone} value={zone}>
              {zone}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectGroupLabel>Australia & Pacific</SelectGroupLabel>
          {australiaPacific.map((zone) => (
            <SelectItem key={zone} value={zone}>
              {zone}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
