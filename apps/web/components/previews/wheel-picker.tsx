import { preview } from "./shared"
export function WheelPickerPreview() {
  const wheels = [
    ["07", "08", "09", "10", "11"],
    ["28", "29", "30", "31", "32"],
    ["", "AM", "PM", "", ""],
  ]

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "220px",
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
            paddingTop: "0px",
            paddingBottom: "0px",
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
                fontSize: wheelIndex === 2 ? "12px" : "15px",
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
