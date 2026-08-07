import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

export function SelectMixedDirectionExample() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <div dir="ltr" className="flex flex-col gap-1.5">
        <span className="text-xs text-muted-foreground">
          dir=&quot;ltr&quot; island
        </span>
        <Select defaultValue="Next.js">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Next.js">Next.js</SelectItem>
              <SelectItem value="Remix">Remix</SelectItem>
              <SelectItem value="Astro">Astro</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div dir="rtl" className="flex flex-col gap-1.5">
        <span className="text-xs text-muted-foreground">
          جزیره‌ی dir=&quot;rtl&quot;
        </span>
        <Select defaultValue="نکست‌جی‌اس">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="نکست‌جی‌اس">نکست‌جی‌اس</SelectItem>
              <SelectItem value="ریمیکس">ریمیکس</SelectItem>
              <SelectItem value="استرو">استرو</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
