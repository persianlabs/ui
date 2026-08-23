export function DateWheelPickerPreview() {
  const wheels = [
    ["2022", "2023", "2024", "2025", "2026"],
    ["Feb", "Mar", "Apr", "May", "Jun"],
    ["17", "18", "19", "20", "21"],
  ]
  const activeValues = ["2024", "Apr", "19"]

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "220px",
        height: "150px",
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          right: "0px",
          left: "0px",
          height: "30px",
          transform: "translateY(-50%)",
          backgroundColor: "#2b2926",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          pointerEvents: "none",
        }}
      >
        {activeValues.map((value, index) => (
          <div
            key={`${value}-${index}`}
            style={{
              display: "flex",
              flex: index === 1 ? 1.4 : 1,
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 900,
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            {value}
          </div>
        ))}
      </div>
      {wheels.map((options, wheelIndex) => (
        <div
          key={wheelIndex}
          style={{
            display: "flex",
            position: "relative",
            flex: wheelIndex === 1 ? 1.4 : 1,
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
                textAlign: "center",
                color: "#f2f0ee",
                fontSize: "14px",
                fontWeight: 400,
                transform: "scale(0.84)",
                opacity: optionIndex === 1 || optionIndex === 3 ? 0.42 : 0.16,
              }}
            >
              {optionIndex === 2 ? "" : option}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
