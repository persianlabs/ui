import { CardNumberInput } from "@workspace/ui/components/bank-input"

export function BankInputSeparatorExample() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      {[
        { label: "Space (default)", separator: " " },
        { label: "Hyphen", separator: "-" },
        { label: "Middle dot", separator: " · " },
        { label: "Slash", separator: " / " },
        { label: "Period", separator: "." },
        { label: "Em dash", separator: " — " },
      ].map(({ label, separator }) => (
        <div key={label} className="grid gap-1.5">
          <p className="text-xs text-muted-foreground">{label}</p>
          <CardNumberInput
            defaultValue="6219861918949297"
            separator={separator}
            aria-label={`${label} card separator`}
          />
        </div>
      ))}
    </div>
  )
}
