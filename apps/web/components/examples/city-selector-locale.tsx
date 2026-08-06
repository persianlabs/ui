import { CitySelector } from "@workspace/ui/components/city-selector"

export function CitySelectorLocaleExample() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-muted-foreground mb-2 text-xs font-medium">
          locale=&quot;fa&quot;
        </p>
        <CitySelector locale="fa" />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-xs font-medium">
          locale=&quot;en&quot;
        </p>
        <CitySelector locale="en" />
      </div>
    </div>
  )
}
