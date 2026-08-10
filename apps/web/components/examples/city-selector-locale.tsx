import { CitySelector } from "@workspace/ui/components/city-selector"

export function CitySelectorLocaleExample() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          locale=&quot;fa&quot;
        </p>
        <CitySelector locale="fa" />
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          locale=&quot;en&quot;
        </p>
        <CitySelector locale="en" />
      </div>
    </div>
  )
}
