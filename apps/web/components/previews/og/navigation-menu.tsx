export function NavigationMenuPreview() {
  const items = ["Home", "Components", "Docs"]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px",
        borderRadius: "20px",
        border: "1px solid rgba(242,240,238,0.18)",
        backgroundColor: "rgba(242,240,238,0.07)",
      }}
    >
      {items.map((item, index) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "12px 22px",
            borderRadius: "14px",
            fontSize: "24px",
            fontWeight: index === 1 ? 600 : 400,
            color: index === 1 ? "#f2f0ee" : "rgba(242,240,238,0.55)",
            backgroundColor:
              index === 1 ? "rgba(242,240,238,0.14)" : "transparent",
          }}
        >
          {item}
          {index === 1 && (
            <svg
              aria-hidden="true"
              width="20"
              height="20"
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
