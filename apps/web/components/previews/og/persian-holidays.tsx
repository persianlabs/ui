export function PersianHolidaysPreview() {
  const days = [
    { label: "1", holiday: false },
    { label: "2", holiday: false },
    { label: "3", holiday: true },
    { label: "4", holiday: false },
    { label: "5", holiday: false },
  ]

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {days.map((day) => (
        <div
          key={day.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            backgroundColor: day.holiday
              ? "rgba(239,68,68,0.18)"
              : "rgba(242,240,238,0.08)",
            color: day.holiday ? "#f87171" : "#f2f0ee",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {day.label}
        </div>
      ))}
    </div>
  )
}
