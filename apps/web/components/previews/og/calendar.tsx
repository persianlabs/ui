import { chunk } from "./shared"
export function CalendarPreview() {
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"]
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const today = 16
  const selected = 20
  // Fixed square cells for both the weekday header and the day grid, sized
  // so 7 columns plus the box's own padding land back on a round 200px --
  // a percentage width here would drift from the fixed pixel height below
  // and stop being square (the exact bug this preview used to have).
  const cellSize = 24
  const padding = 16

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: `${cellSize * 7 + padding * 2}px`,
        padding: `${padding}px`,
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 600,
          color: "#f2f0ee",
        }}
      >
        August 2026
      </div>
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
              fontSize: "10px",
              color: "rgba(242,240,238,0.5)",
            }}
          >
            {day}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {chunk(days, 7).map((week, weekIndex) => (
          // A single flex row whose 7 children sum to exactly the
          // container's content width relies on Satori rounding that
          // boundary the same way a browser would -- it doesn't, and wraps
          // the 7th cell early. Explicit non-wrapping week rows sidestep
          // that instead of trusting flexWrap at an exact-width boundary.
          <div key={weekIndex} style={{ display: "flex" }}>
            {week.map((day) => {
              const isToday = day === today
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
                    fontSize: "10px",
                    borderRadius: "6px",
                    backgroundColor: isSelected
                      ? "#f2f0ee"
                      : isToday
                        ? "rgba(242,240,238,0.08)"
                        : "transparent",
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
    </div>
  )
}
