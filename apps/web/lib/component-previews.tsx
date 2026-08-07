/**
 * Shared preview mockups, built with plain inline styles (not Tailwind
 * classes) so the exact same JSX renders identically through Satori (the
 * per-component opengraph-image.tsx routes) and as regular React DOM (the
 * thumbnails on /docs/components).
 */

function ChevronDownGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(242,240,238,0.5)"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function TabsPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px",
        borderRadius: "14px",
        backgroundColor: "rgba(242,240,238,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          borderRadius: "10px",
          backgroundColor: "#f2f0ee",
          color: "#191817",
          fontSize: "17px",
          fontWeight: 600,
        }}
      >
        Overview
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "17px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        Activity
      </div>
    </div>
  )
}

export function ButtonPreview() {
  return (
    <div
      style={{
        display: "flex",
        padding: "12px 24px",
        borderRadius: "10px",
        backgroundColor: "#f2f0ee",
        color: "#191817",
        fontSize: "18px",
        fontWeight: 600,
      }}
    >
      Button
    </div>
  )
}

export function ButtonGroupPreview() {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      {["Button 1", "Button 2"].map((label, index) => (
        <div
          key={label}
          style={{
            display: "flex",
            padding: "12px 20px",
            fontSize: "17px",
            color: "#f2f0ee",
            borderLeft:
              index > 0 ? "1px solid rgba(242,240,238,0.16)" : undefined,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export function InputPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "220px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
        fontSize: "16px",
        color: "rgba(242,240,238,0.5)",
      }}
    >
      you@example.com
    </div>
  )
}

export function InputOTPPreview() {
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {["1", "2", "3", "4"].map((digit, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "44px",
            borderRadius: "8px",
            backgroundColor: index === 1 ? "#f2f0ee" : "rgba(242,240,238,0.06)",
            border: "1px solid rgba(242,240,238,0.16)",
            color: index === 1 ? "#191817" : "#f2f0ee",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {digit}
        </div>
      ))}
    </div>
  )
}

export function InputGroupPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "240px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
        fontSize: "16px",
        color: "rgba(242,240,238,0.5)",
      }}
    >
      Search...
    </div>
  )
}

export function TextareaPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "220px",
        minHeight: "64px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
        fontSize: "16px",
        color: "rgba(242,240,238,0.5)",
      }}
    >
      Type your message here.
    </div>
  )
}

export function ComboboxPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "260px",
        borderRadius: "14px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: "1px solid rgba(242,240,238,0.12)",
        }}
      >
        <div style={{ display: "flex", fontSize: "18px", color: "#f2f0ee" }}>
          Next.js
        </div>
        <div style={{ display: "flex" }}>
          <ChevronDownGlyph size={16} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: "rgba(242,240,238,0.6)",
          backgroundColor: "rgba(242,240,238,0.06)",
        }}
      >
        SvelteKit
      </div>
    </div>
  )
}

export function SelectPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "220px",
        padding: "12px 18px",
        borderRadius: "10px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      <div style={{ display: "flex", fontSize: "18px", color: "#f2f0ee" }}>
        Apple
      </div>
      <div style={{ display: "flex" }}>
        <ChevronDownGlyph size={16} />
      </div>
    </div>
  )
}

export function CitySelectorPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {[
        { label: "Province", value: "Alborz" },
        { label: "City", value: "Fardis" },
      ].map((field) => (
        <div
          key={field.label}
          style={{ display: "flex", flexDirection: "column", gap: "4px" }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "13px",
              color: "rgba(242,240,238,0.5)",
            }}
          >
            {field.label}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "220px",
              padding: "9px 14px",
              borderRadius: "10px",
              backgroundColor: "#191817",
              border: "1px solid rgba(242,240,238,0.16)",
              fontSize: "17px",
              color: "#f2f0ee",
            }}
          >
            <div style={{ display: "flex" }}>{field.value}</div>
            <div style={{ display: "flex" }}>
              <ChevronDownGlyph size={14} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SeparatorPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        width: "220px",
      }}
    >
      <div style={{ display: "flex", fontSize: "16px", color: "#f2f0ee" }}>
        PersianLabs/ui
      </div>
      <div
        style={{
          display: "flex",
          height: "1px",
          width: "100%",
          backgroundColor: "rgba(242,240,238,0.16)",
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        Design system foundation
      </div>
    </div>
  )
}

export function CardPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "220px",
        borderRadius: "14px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          padding: "16px 18px",
        }}
      >
        <div style={{ display: "flex", fontSize: "17px", color: "#f2f0ee" }}>
          Card Title
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "13px",
            color: "rgba(242,240,238,0.5)",
          }}
        >
          Card description text
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid rgba(242,240,238,0.12)",
          padding: "12px 18px",
          fontSize: "13px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        Card footer
      </div>
    </div>
  )
}

export function BreadcrumbPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "16px",
      }}
    >
      <div style={{ display: "flex", color: "rgba(242,240,238,0.5)" }}>
        Home
      </div>
      <div style={{ display: "flex", color: "rgba(242,240,238,0.3)" }}>/</div>
      <div style={{ display: "flex", color: "rgba(242,240,238,0.5)" }}>
        Components
      </div>
      <div style={{ display: "flex", color: "rgba(242,240,238,0.3)" }}>/</div>
      <div style={{ display: "flex", color: "#f2f0ee" }}>Breadcrumb</div>
    </div>
  )
}

export function EmptyPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        width: "220px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          backgroundColor: "rgba(242,240,238,0.08)",
        }}
      >
        <ChevronDownGlyph size={20} />
      </div>
      <div style={{ display: "flex", fontSize: "16px", color: "#f2f0ee" }}>
        No results
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: "rgba(242,240,238,0.5)",
          textAlign: "center",
        }}
      >
        Nothing to show yet
      </div>
    </div>
  )
}

export function SwitchPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "16px",
        color: "#f2f0ee",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "32px",
          height: "18px",
          borderRadius: "999px",
          backgroundColor: "#f2f0ee",
          padding: "2px",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "14px",
            height: "14px",
            borderRadius: "999px",
            backgroundColor: "#191817",
          }}
        />
      </div>
      Airplane Mode
    </div>
  )
}

export function CheckboxPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "16px",
        color: "#f2f0ee",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "16px",
          height: "16px",
          borderRadius: "4px",
          backgroundColor: "#f2f0ee",
          color: "#191817",
          fontSize: "12px",
        }}
      >
        ✓
      </div>
      Accept terms
    </div>
  )
}

export function RadioGroupPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {["Default", "Comfortable"].map((label, i) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "16px",
            color: "#f2f0ee",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              border: "1px solid rgba(242,240,238,0.4)",
              backgroundColor: i === 1 ? "#f2f0ee" : "transparent",
            }}
          >
            {i === 1 && (
              <div
                style={{
                  display: "flex",
                  width: "6px",
                  height: "6px",
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
  )
}

export function ProgressPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "220px",
        height: "8px",
        borderRadius: "999px",
        backgroundColor: "rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "66%",
          height: "100%",
          backgroundColor: "#f2f0ee",
          borderRadius: "999px",
        }}
      />
    </div>
  )
}

export function CollapsiblePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "220px",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#f2f0ee",
        }}
      >
        <span>3 starred repos</span>
        <ChevronDownGlyph size={14} />
      </div>
      <div
        style={{
          display: "flex",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid rgba(242,240,238,0.16)",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        @base_ui/react
      </div>
    </div>
  )
}

export function TogglePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        backgroundColor: "rgba(242,240,238,0.14)",
        color: "#f2f0ee",
        fontSize: "16px",
        fontWeight: 700,
      }}
    >
      B
    </div>
  )
}

export function ToggleGroupPreview() {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      {["B", "I", "U"].map((letter, i) => (
        <div
          key={letter}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            backgroundColor: i === 0 ? "rgba(242,240,238,0.14)" : "transparent",
            color: "#f2f0ee",
            fontSize: "16px",
            fontWeight: 700,
            borderInlineStart:
              i > 0 ? "1px solid rgba(242,240,238,0.16)" : undefined,
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  )
}

export function NativeSelectPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "180px",
        padding: "10px 14px",
        borderRadius: "8px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
        fontSize: "16px",
        color: "#f2f0ee",
      }}
    >
      Next.js
      <ChevronDownGlyph size={14} />
    </div>
  )
}

export function ElasticSliderPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "200px",
        height: "36px",
        borderRadius: "10px",
        backgroundColor: "rgba(242,240,238,0.1)",
        padding: "0 12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          width: "55%",
          backgroundColor: "rgba(242,240,238,0.14)",
        }}
      />
      <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
        Opacity
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        0.55
      </div>
    </div>
  )
}

export function ElasticRangeSliderPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "200px",
        height: "36px",
        borderRadius: "10px",
        backgroundColor: "rgba(242,240,238,0.1)",
        padding: "0 12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          insetInlineStart: "25%",
          insetInlineEnd: "20%",
          top: 0,
          bottom: 0,
          backgroundColor: "rgba(242,240,238,0.14)",
        }}
      />
      <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
        Price
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        $200 – $700
      </div>
    </div>
  )
}
