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

function SearchGlyph({ size = 16 }: { size?: number }) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
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

export function CommandPreview() {
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
          gap: "8px",
          padding: "12px 18px",
          borderBottom: "1px solid rgba(242,240,238,0.12)",
        }}
      >
        <div style={{ display: "flex" }}>
          <SearchGlyph size={16} />
        </div>
        <div style={{ display: "flex", fontSize: "16px", color: "rgba(242,240,238,0.5)" }}>
          Search commands...
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: "#f2f0ee",
          backgroundColor: "rgba(242,240,238,0.06)",
        }}
      >
        Calendar
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        Calculator
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

export function TooltipPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: "6px",
          backgroundColor: "#f2f0ee",
          color: "#1a1a1a",
          fontSize: "12px",
          padding: "6px 10px",
        }}
      >
        Add to library
      </div>
      <div
        style={{
          display: "flex",
          width: "8px",
          height: "8px",
          backgroundColor: "#f2f0ee",
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          display: "flex",
          marginTop: "8px",
          borderRadius: "8px",
          border: "1px solid rgba(242,240,238,0.2)",
          fontSize: "13px",
          color: "#f2f0ee",
          padding: "6px 16px",
        }}
      >
        Hover
      </div>
    </div>
  )
}

export function AccordionPreview() {
  const rows = ["Is it accessible?", "Is it styled?", "Is it animated?"]
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "220px" }}>
      {rows.map((row, i) => (
        <div
          key={row}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 2px",
            borderBottom:
              i < rows.length - 1 ? "1px solid rgba(242,240,238,0.12)" : "none",
            fontSize: "13px",
            color: i === 0 ? "#f2f0ee" : "rgba(242,240,238,0.6)",
          }}
        >
          <span>{row}</span>
          <ChevronDownGlyph size={14} />
        </div>
      ))}
    </div>
  )
}

export function SheetPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "220px",
        height: "140px",
        borderRadius: "10px",
        backgroundColor: "rgba(242,240,238,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "absolute",
          insetInlineEnd: 0,
          top: 0,
          bottom: 0,
          width: "40%",
          backgroundColor: "#1a1a1a",
          borderInlineStart: "1px solid rgba(242,240,238,0.16)",
          padding: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60%",
            height: "8px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.5)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "80%",
            height: "6px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.2)",
          }}
        />
      </div>
    </div>
  )
}

export function ContextMenuPreview() {
  const rows = ["Back", "Forward", "Reload"]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "150px",
        borderRadius: "10px",
        backgroundColor: "#1a1a1a",
        border: "1px solid rgba(242,240,238,0.14)",
        padding: "6px",
        gap: "2px",
      }}
    >
      {rows.map((row, i) => (
        <div
          key={row}
          style={{
            display: "flex",
            borderRadius: "6px",
            padding: "6px 8px",
            fontSize: "12px",
            backgroundColor: i === 1 ? "rgba(242,240,238,0.12)" : "transparent",
            color: "#f2f0ee",
          }}
        >
          {row}
        </div>
      ))}
    </div>
  )
}

export function MenubarPreview() {
  const items = ["File", "Edit", "View"]
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        borderRadius: "10px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "rgba(242,240,238,0.04)",
        padding: "6px",
      }}
    >
      {items.map((item, i) => (
        <div
          key={item}
          style={{
            display: "flex",
            borderRadius: "6px",
            padding: "6px 10px",
            fontSize: "13px",
            backgroundColor: i === 0 ? "rgba(242,240,238,0.14)" : "transparent",
            color: "#f2f0ee",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export function DialogPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "220px",
        borderRadius: "14px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "rgba(242,240,238,0.04)",
        padding: "16px",
      }}
    >
      <div style={{ display: "flex", fontSize: "14px", color: "#f2f0ee" }}>
        Edit profile
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        Make changes to your profile here.
      </div>
      <div
        style={{
          display: "flex",
          height: "24px",
          borderRadius: "6px",
          border: "1px solid rgba(242,240,238,0.16)",
        }}
      />
    </div>
  )
}

export function AlertDialogPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        width: "200px",
        borderRadius: "14px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "rgba(242,240,238,0.04)",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
        Are you absolutely sure?
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: "rgba(242,240,238,0.6)",
        }}
      >
        This action cannot be undone.
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
        <div
          style={{
            display: "flex",
            borderRadius: "6px",
            border: "1px solid rgba(242,240,238,0.2)",
            padding: "6px 14px",
            fontSize: "12px",
            color: "#f2f0ee",
          }}
        >
          Cancel
        </div>
        <div
          style={{
            display: "flex",
            borderRadius: "6px",
            backgroundColor: "#ef4444",
            padding: "6px 14px",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          Confirm
        </div>
      </div>
    </div>
  )
}

export function DrawerPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        height: "140px",
        borderRadius: "10px",
        backgroundColor: "rgba(242,240,238,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          position: "absolute",
          insetInlineStart: 0,
          insetInlineEnd: 0,
          bottom: 0,
          height: "55%",
          backgroundColor: "#1a1a1a",
          borderTop: "1px solid rgba(242,240,238,0.16)",
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",
          padding: "10px 12px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "36px",
            height: "4px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.3)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "60%",
            height: "8px",
            borderRadius: "999px",
            backgroundColor: "rgba(242,240,238,0.5)",
          }}
        />
      </div>
    </div>
  )
}

export function ResponsiveDialogPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <DialogPreview />
    </div>
  )
}

export function ResponsiveAlertDialogPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <AlertDialogPreview />
    </div>
  )
}

export function ResponsiveMenuPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <ContextMenuPreview />
    </div>
  )
}

export function AlertPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "220px",
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "#191817",
        padding: "12px 14px",
      }}
    >
      <div style={{ display: "flex", fontSize: "14px", color: "#f2f0ee" }}>
        Heads up
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        You can add components to your app
      </div>
    </div>
  )
}

export function AspectRatioPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "220px",
        height: "124px",
        borderRadius: "12px",
        backgroundColor: "rgba(242,240,238,0.08)",
        border: "1px solid rgba(242,240,238,0.16)",
        fontSize: "12px",
        color: "rgba(242,240,238,0.5)",
      }}
    >
      16 : 9
    </div>
  )
}

export function AvatarPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "48px",
        height: "48px",
        borderRadius: "9999px",
        backgroundColor: "rgba(242,240,238,0.14)",
        color: "#f2f0ee",
        fontSize: "16px",
        fontWeight: 700,
      }}
    >
      CN
    </div>
  )
}

export function DirectionPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        color: "#f2f0ee",
      }}
    >
      <div style={{ display: "flex" }}>LTR</div>
      <div style={{ display: "flex", color: "rgba(242,240,238,0.3)" }}>
        {"<->"}
      </div>
      <div style={{ display: "flex" }}>RTL</div>
    </div>
  )
}

export function HoverCardPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "200px",
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "#191817",
        padding: "12px 14px",
      }}
    >
      <div style={{ display: "flex", fontSize: "14px", color: "#f2f0ee" }}>
        @shadcn
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        The React Framework for design engineers
      </div>
    </div>
  )
}

export function ItemPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "220px",
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.16)",
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          backgroundColor: "rgba(242,240,238,0.14)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
          Item title
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            color: "rgba(242,240,238,0.5)",
          }}
        >
          Item description
        </div>
      </div>
    </div>
  )
}

export function MarkerPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "200px",
        fontSize: "12px",
        color: "rgba(242,240,238,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "1px",
          flex: 1,
          backgroundColor: "rgba(242,240,238,0.16)",
        }}
      />
      <div style={{ display: "flex" }}>OR</div>
      <div
        style={{
          display: "flex",
          height: "1px",
          flex: 1,
          backgroundColor: "rgba(242,240,238,0.16)",
        }}
      />
    </div>
  )
}

export function BubblePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          borderRadius: "12px",
          backgroundColor: "rgba(242,240,238,0.1)",
          color: "#f2f0ee",
          fontSize: "12px",
          padding: "8px 12px",
        }}
      >
        Hey there!
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-end",
          borderRadius: "12px",
          backgroundColor: "#f2f0ee",
          color: "#191817",
          fontSize: "12px",
          padding: "8px 12px",
        }}
      >
        How can I help?
      </div>
    </div>
  )
}

export function MessagePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "28px",
          height: "28px",
          borderRadius: "9999px",
          backgroundColor: "rgba(242,240,238,0.14)",
        }}
      />
      <div
        style={{
          display: "flex",
          borderRadius: "12px",
          backgroundColor: "rgba(242,240,238,0.1)",
          color: "#f2f0ee",
          fontSize: "12px",
          padding: "8px 12px",
        }}
      >
        Got it, thanks!
      </div>
    </div>
  )
}

export function MessageScrollerPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "9999px",
        backgroundColor: "rgba(242,240,238,0.14)",
        color: "#f2f0ee",
      }}
    >
      ↓
    </div>
  )
}

export function PaginationPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        color: "rgba(242,240,238,0.5)",
      }}
    >
      <div style={{ display: "flex" }}>‹</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "26px",
          height: "26px",
          borderRadius: "8px",
          border: "1px solid rgba(242,240,238,0.16)",
          color: "#f2f0ee",
        }}
      >
        1
      </div>
      <div style={{ display: "flex" }}>2</div>
      <div style={{ display: "flex" }}>3</div>
      <div style={{ display: "flex" }}>›</div>
    </div>
  )
}

export function ResizablePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "180px",
        height: "80px",
        borderRadius: "10px",
        border: "1px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "rgba(242,240,238,0.08)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "2px",
          backgroundColor: "rgba(242,240,238,0.24)",
        }}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      />
    </div>
  )
}

export function SkeletonPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "44px",
          height: "44px",
          borderRadius: "9999px",
          backgroundColor: "rgba(242,240,238,0.1)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "140px",
          height: "10px",
          borderRadius: "6px",
          backgroundColor: "rgba(242,240,238,0.1)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "100px",
          height: "10px",
          borderRadius: "6px",
          backgroundColor: "rgba(242,240,238,0.1)",
        }}
      />
    </div>
  )
}

export function TablePreview() {
  const rows = [
    { name: "Invoice", value: "INV001" },
    { name: "Status", value: "Paid" },
  ]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "220px",
        borderRadius: "10px",
        border: "1px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid rgba(242,240,238,0.16)",
          backgroundColor: "rgba(242,240,238,0.06)",
          fontSize: "12px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        <div style={{ display: "flex" }}>Field</div>
        <div style={{ display: "flex" }}>Value</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 12px",
            borderBottom:
              i < rows.length - 1
                ? "1px solid rgba(242,240,238,0.1)"
                : undefined,
            fontSize: "13px",
            color: "#f2f0ee",
          }}
        >
          <div style={{ display: "flex" }}>{row.name}</div>
          <div style={{ display: "flex", color: "rgba(242,240,238,0.6)" }}>
            {row.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export function BadgePreview() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <div
        style={{
          display: "flex",
          borderRadius: "9999px",
          backgroundColor: "#f2f0ee",
          color: "#191817",
          fontSize: "12px",
          fontWeight: 600,
          padding: "3px 10px",
        }}
      >
        Default
      </div>
      <div
        style={{
          display: "flex",
          borderRadius: "9999px",
          border: "1px solid rgba(242,240,238,0.24)",
          color: "#f2f0ee",
          fontSize: "12px",
          fontWeight: 600,
          padding: "3px 10px",
        }}
      >
        Outline
      </div>
    </div>
  )
}

export function DropdownMenuPreview() {
  const rows = ["Profile", "Billing", "Settings"]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "160px",
        borderRadius: "10px",
        backgroundColor: "#1a1a1a",
        border: "1px solid rgba(242,240,238,0.14)",
        padding: "6px",
        gap: "2px",
      }}
    >
      {rows.map((row, i) => (
        <div
          key={row}
          style={{
            display: "flex",
            borderRadius: "6px",
            padding: "6px 8px",
            fontSize: "12px",
            backgroundColor: i === 0 ? "rgba(242,240,238,0.12)" : "transparent",
            color: "#f2f0ee",
          }}
        >
          {row}
        </div>
      ))}
    </div>
  )
}

export function FieldPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "200px",
      }}
    >
      <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
        Email
      </div>
      <div
        style={{
          display: "flex",
          padding: "9px 12px",
          borderRadius: "8px",
          backgroundColor: "#191817",
          border: "1px solid rgba(242,240,238,0.16)",
          fontSize: "13px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        you@example.com
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        We&apos;ll never share your email.
      </div>
    </div>
  )
}

export function KbdPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {["⌘", "K"].map((key) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "22px",
            height: "22px",
            borderRadius: "5px",
            backgroundColor: "rgba(242,240,238,0.1)",
            color: "rgba(242,240,238,0.7)",
            fontSize: "12px",
            padding: "0 5px",
          }}
        >
          {key}
        </div>
      ))}
    </div>
  )
}

export function LabelPreview() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
          fontSize: "11px",
        }}
      >
        ✓
      </div>
      <div style={{ display: "flex", fontSize: "14px", color: "#f2f0ee" }}>
        Accept terms and conditions
      </div>
    </div>
  )
}

export function PopoverPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "200px",
        borderRadius: "12px",
        border: "1px solid rgba(242,240,238,0.16)",
        backgroundColor: "#191817",
        padding: "14px 16px",
      }}
    >
      <div style={{ display: "flex", fontSize: "13px", color: "#f2f0ee" }}>
        Dimensions
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: "rgba(242,240,238,0.5)",
        }}
      >
        Set the dimensions for the layer.
      </div>
    </div>
  )
}

export function ScrollAreaPreview() {
  const rows = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"]
  return (
    <div
      style={{
        display: "flex",
        width: "140px",
        height: "110px",
        borderRadius: "10px",
        border: "1px solid rgba(242,240,238,0.16)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "12px",
        }}
      >
        {rows.map((row) => (
          <div
            key={row}
            style={{ display: "flex", fontSize: "12px", color: "#f2f0ee" }}
          >
            {row}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          insetInlineEnd: "3px",
          top: "8px",
          bottom: "8px",
          width: "4px",
          borderRadius: "999px",
          backgroundColor: "rgba(242,240,238,0.24)",
        }}
      />
    </div>
  )
}

export function SpinnerPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "9999px",
        border: "2px solid rgba(242,240,238,0.16)",
        borderTopColor: "#f2f0ee",
      }}
    />
  )
}

function TomanGlyph({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="#f2f0ee"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.057 1.742L3.821 1l.78.75-.776.741-.768-.749zm3.23 2.48c0 .622-.16 1.111-.478 1.467-.201.221-.462.39-.783.505a3.251 3.251 0 01-1.083.163h-.555c-.421 0-.801-.074-1.139-.223a2.045 2.045 0 01-.9-.738A2.238 2.238 0 011 4.148c0-.059.001-.117.004-.176.03-.55.204-1.158.525-1.827l1.095.484c-.257.532-.397 1-.419 1.403-.002.04-.004.08-.004.12 0 .252.055.458.166.618a.887.887 0 00.5.354c.085.028.178.048.278.06.079.01.16.014.243.014h.555c.458 0 .769-.081.933-.244.14-.139.21-.383.21-.731V2.02h1.2v2.202zm5.433 3.184l-.72-.7.709-.706.735.707-.724.7zm-2.856.308c.542 0 .973.19 1.293.569.297.346.445.777.445 1.293v.364h.18v-.004h.41c.221 0 .377-.028.467-.084.093-.055.14-.14.14-.258v-.069c.004-.243.017-1.044 0-1.115L13 8.05v1.574a1.4 1.4 0 01-.287.863c-.306.405-.804.607-1.495.607h-.627c-.061.733-.434 1.257-1.117 1.573-.267.122-.58.21-.937.265a5.845 5.845 0 01-.914.067v-1.159c.612 0 1.072-.082 1.38-.247.25-.132.376-.298.376-.499h-.515c-.436 0-.807-.113-1.113-.339-.367-.273-.55-.667-.55-1.18 0-.488.122-.901.367-1.24.296-.415.728-.622 1.296-.622zm.533 2.226v-.364c0-.217-.048-.389-.143-.516a.464.464 0 00-.39-.187.478.478 0 00-.396.187.705.705 0 00-.136.449.65.65 0 00.003.067c.008.125.066.22.177.283.093.054.21.08.352.08h.533zM9.5 6.707l.72.7.724-.7L10.209 6l-.709.707zm-6.694 4.888h.03c.433-.01.745-.106.937-.29.024.012.065.035.12.068l.074.039.081.042c.135.073.261.133.379.18.345.146.67.22.977.22a1.216 1.216 0 00.87-.34c.3-.285.449-.714.449-1.286a2.19 2.19 0 00-.335-1.145c-.299-.457-.732-.685-1.3-.685-.502 0-.916.192-1.242.575-.113.132-.21.284-.294.456-.032.062-.06.125-.084.191a.504.504 0 00-.03.078 1.67 1.67 0 00-.022.06c-.103.309-.171.485-.205.53-.072.09-.214.14-.427.147-.123-.005-.209-.03-.256-.076-.057-.054-.085-.153-.085-.297V7l-1.201-.5v3.562c0 .261.048.496.143.703.071.158.168.296.29.413.123.118.266.211.43.28.198.084.42.13.665.136v.001h.036zm2.752-1.014a.778.778 0 00.044-.353.868.868 0 00-.165-.47c-.1-.134-.217-.201-.35-.201-.18 0-.33.103-.447.31-.042.071-.08.158-.114.262a2.434 2.434 0 00-.04.12l-.015.053-.015.046c.142.118.323.216.544.293.18.062.325.092.433.092.044 0 .086-.05.125-.152z"
      />
    </svg>
  )
}

export function TomanIconPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "56px",
        height: "56px",
        borderRadius: "14px",
        backgroundColor: "rgba(242,240,238,0.08)",
      }}
    >
      <TomanGlyph size={28} />
    </div>
  )
}

export function PriceInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "200px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "16px",
          fontWeight: 600,
          color: "#f2f0ee",
        }}
      >
        125,000
      </div>
      <div style={{ display: "flex", marginInlineStart: "auto" }}>
        <TomanGlyph size={16} />
      </div>
    </div>
  )
}

function CheckCircleGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#34d399"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function ToastPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        width: "230px",
        padding: "12px 14px",
        borderRadius: "16px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CheckCircleGlyph size={18} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", fontSize: "13px", fontWeight: 600, color: "#f2f0ee" }}>
          Event created
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            color: "rgba(242,240,238,0.5)",
          }}
        >
          Sunday, December 3 at 9:00 AM
        </div>
      </div>
    </div>
  )
}

export function CopyButtonPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        backgroundColor: "#191817",
        border: "1px solid rgba(242,240,238,0.16)",
      }}
    >
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f2f0ee"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </div>
  )
}
