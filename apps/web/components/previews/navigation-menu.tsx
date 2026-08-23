import { preview } from "./shared"
export function NavigationMenuPreview() {
  const items = ["Home", "Components", "Docs"]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px",
        borderRadius: "12px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
      }}
    >
      {items.map((item, index) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            padding: "5px 10px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: index === 1 ? 600 : 400,
            color: index === 1 ? preview.foreground : preview.mutedForeground,
            backgroundColor: index === 1 ? preview.muted : "transparent",
          }}
        >
          {item}
          {index === 1 && (
            <svg
              aria-hidden="true"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
