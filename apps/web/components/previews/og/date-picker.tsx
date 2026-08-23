import { CalendarGlyph, chunk } from "./shared"
export function DatePickerPreview() {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"]
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const selected = 14
  const cellSize = 24
  // The calendar box below has its own 8px padding on every side, so its
  // content area is only as wide as (its own width - 16px). Sizing this
  // outer wrapper to exactly cellSize * 7 shortchanged that content area by
  // 16px, squeezing the last weekday/day column out of column alignment.
  const calendarBoxPadding = 8

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: `${cellSize * 7 + calendarBoxPadding * 2}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 10px",
          borderRadius: "8px",
          border: "1px solid rgba(242,240,238,0.16)",
        }}
      >
        <CalendarGlyph />
        <div style={{ display: "flex", fontSize: "12px", color: "#f2f0ee" }}>
          2026/08/14
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "8px",
          borderRadius: "10px",
          border: "1px solid rgba(242,240,238,0.16)",
        }}
      >
        <div style={{ display: "flex" }}>
          {weekdays.map((day, index) => (
            <div
              key={`${day}-${index}`}
              style={{
                display: "flex",
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                flexShrink: 0,
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                color: "rgba(242,240,238,0.5)",
              }}
            >
              {day}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {chunk(days, 7).map((week, weekIndex) => (
            <div key={weekIndex} style={{ display: "flex" }}>
              {week.map((day) => {
                const isSelected = day === selected
                return (
                  <div
                    key={day}
                    style={{
                      display: "flex",
                      width: `${cellSize}px`,
                      height: `${cellSize}px`,
                      flexShrink: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      borderRadius: "5px",
                      backgroundColor: isSelected ? "#f2f0ee" : "transparent",
                      color: isSelected ? "#191817" : "#f2f0ee",
                    }}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "4px",
            padding: "7px 9px",
            borderRadius: "7px",
            border: "1px solid rgba(242,240,238,0.16)",
            color: "#f2f0ee",
            fontSize: "10px",
          }}
        >
          <div style={{ display: "flex" }}>Select time</div>
          <div style={{ display: "flex", fontWeight: 600 }}>09:30</div>
        </div>
      </div>
    </div>
  )
}
