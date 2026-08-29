const segments = [
  { width: 64, left: 12, right: 4, value: "1", label: "Hr." },
  { width: 78, left: 4, right: 4, value: "30", label: "Min." },
  { width: 48, left: 4, right: 12 },
]

export function DurationPickerPreview() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1px" }}>
      {segments.map((segment, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
            width: `${segment.width}px`,
            height: "48px",
            backgroundColor: "rgba(242,240,238,0.08)",
            border: "1px solid rgba(242,240,238,0.16)",
            borderTopLeftRadius: `${segment.left}px`,
            borderBottomLeftRadius: `${segment.left}px`,
            borderTopRightRadius: `${segment.right}px`,
            borderBottomRightRadius: `${segment.right}px`,
            fontSize: "15px",
            lineHeight: "1",
            fontWeight: 600,
            color: "#f2f0ee",
          }}
        >
          {segment.value ? (
            <>
              <span style={{ display: "flex", lineHeight: "1" }}>
                {segment.value}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  lineHeight: "1",
                  color: "rgba(242,240,238,0.5)",
                }}
              >
                {segment.label}
              </span>
            </>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="rgba(242,240,238,0.5)"
            >
              <path d="M3.78 16.31L3 21l4.69-.78c.81-.14 1.57-.53 2.15-1.11L20.42 8.53a2.25 2.25 0 0 0 0-3.18l-2.15-2.15a2.25 2.25 0 0 0-3.18 0L4.89 13.79c-.58.58-.97 1.34-1.11 2.15z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
