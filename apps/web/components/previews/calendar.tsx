import { chunk, preview } from "./shared"
export function CalendarPreview() {
  const weekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]
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
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 600,
          color: preview.foreground,
        }}
      >
        مرداد ۱۴۰۴
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
              color: preview.mutedForeground,
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
                      ? preview.primary
                      : isToday
                        ? preview.muted
                        : "transparent",
                    color: isSelected
                      ? preview.primaryForeground
                      : preview.foreground,
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
