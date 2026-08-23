export function QuestionnairePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        width: "260px",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "8px",
          width: "100%",
          borderRadius: "999px",
          backgroundColor: "rgba(242,240,238,0.16)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60%",
            borderRadius: "999px",
            backgroundColor: "#f2f0ee",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {["Developer", "Designer"].map((label, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderRadius: "16px",
              border: `2px solid ${i === 0 ? "#f2f0ee" : "rgba(242,240,238,0.16)"}`,
              padding: "12px 16px",
              fontSize: "19px",
              color: "#f2f0ee",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                height: "20px",
                borderRadius: "999px",
                border: `2px solid ${i === 0 ? "#f2f0ee" : "rgba(242,240,238,0.4)"}`,
                backgroundColor: i === 0 ? "#f2f0ee" : "transparent",
              }}
            >
              {i === 0 && (
                <div
                  style={{
                    display: "flex",
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    backgroundColor: "#191817",
                  }}
                />
              )}
            </div>
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
