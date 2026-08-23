export function TimePickerPreview() {
  const wheels = [
    ["08", "09", "10", "11", "12"],
    ["15", "30", "45", "00", "15"],
  ]
  const activeValues = ["09", "30"]

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "180px",
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
              fontSize: "16px",
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
                fontSize: "15px",
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
