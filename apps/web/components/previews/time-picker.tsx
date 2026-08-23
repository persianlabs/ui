import { preview } from "./shared"
export function TimePickerPreview() {
  const wheels = [
    ["08", "09", "10", "11", "12"],
    ["15", "30", "45", "00", "15"],
  ]

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "150px",
        height: "150px",
        borderRadius: "12px",
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "59px",
          right: "0px",
          left: "0px",
          height: "30px",
          borderTop: `1px solid ${preview.border}`,
          borderBottom: `1px solid ${preview.border}`,
          backgroundColor: preview.background,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          pointerEvents: "none",
        }}
      />
      {wheels.map((options, wheelIndex) => (
        <div
          key={wheelIndex}
          style={{
            display: "flex",
            position: "relative",
            zIndex: 1,
            flex: 1,
            flexDirection: "column",
          }}
        >
          {options.map((option, optionIndex) => (
            <div
              key={`${wheelIndex}-${optionIndex}`}
              style={{
                display: "flex",
                width: "100%",
                height: "30px",
                alignItems: "center",
                justifyContent: "center",
                color: preview.foreground,
                fontSize: "15px",
                fontWeight: optionIndex === 2 ? 600 : 400,
                transform: `scale(${optionIndex === 2 ? 1.12 : 0.84})`,
                opacity:
                  optionIndex === 2
                    ? 1
                    : optionIndex === 1 || optionIndex === 3
                      ? 0.42
                      : 0.16,
              }}
            >
              {option}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
