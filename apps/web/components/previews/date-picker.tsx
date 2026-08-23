import { CalendarGlyph, chunk, preview } from "./shared"
export function DatePickerPreview() {
  const weekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]
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
          border: `1px solid ${preview.border}`,
          backgroundColor: preview.background,
        }}
      >
        <CalendarGlyph />
        <div
          style={{
            display: "flex",
            fontSize: "12px",
            color: preview.foreground,
          }}
        >
          ۱۴۰۵/۰۵/۱۴
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "8px",
          borderRadius: "10px",
          border: `1px solid ${preview.border}`,
          backgroundColor: preview.background,
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
                      backgroundColor: isSelected
                        ? preview.primary
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "4px",
            padding: "7px 9px",
            borderRadius: "7px",
            border: `1px solid ${preview.border}`,
            color: preview.foreground,
            fontSize: "10px",
          }}
        >
          <div style={{ display: "flex" }}>انتخاب زمان</div>
          <div style={{ display: "flex", fontWeight: 600 }}>۰۹:۳۰</div>
        </div>
      </div>
    </div>
  )
}
