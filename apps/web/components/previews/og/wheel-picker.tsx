export function WheelPickerPreview() {
  const wheels = [
    ["07", "08", "09", "10", "11"],
    ["28", "29", "30", "31", "32"],
    ["", "AM", "PM", "", ""],
  ]
  const activeValues = ["09", "30", "PM"]

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
        {activeValues.map((value) => (
          <div
            key={value}
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: value === "PM" ? "13px" : "16px",
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
                textAlign: "center",
                color: "#f2f0ee",
                fontSize: wheelIndex === 2 ? "12px" : "15px",
                fontWeight: 400,
                transform: "translateX(2px) scale(0.84)",
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
