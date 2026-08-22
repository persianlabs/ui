/**
 * Shared preview mockups, built with plain inline styles (not Tailwind
 * classes) so the exact same JSX renders identically through Satori (the
 * per-component opengraph-image.tsx routes) and as regular React DOM (the
 * thumbnails on /docs/components).
 */

const preview = {
  background: "var(--background)",
  foreground: "var(--foreground)",
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",
  border: "var(--border)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",
  success: "var(--success)",
}

export function ReceiptPrinterPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "190px",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "190px",
          height: "78px",
          flexDirection: "column",
          padding: "12px",
          borderRadius: "20px",
          backgroundColor: "#292825",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.14), 0 14px 28px rgba(0,0,0,.22)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            color: "#d6d3d1",
            fontSize: "9px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "12px",
              height: "12px",
              borderRadius: "99px",
              backgroundColor: "#86efac",
              color: "#14532d",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "9px",
              fontWeight: 900,
            }}
          >
            ✓
          </div>{" "}
          ORDER COMPLETE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            padding: "8px",
            borderRadius: "7px",
            backgroundColor: "#151514",
            color: "#c7e6ad",
            fontSize: "8px",
            letterSpacing: "1px",
          }}
        >
          READY · 12:48
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            zIndex: 2,
            right: "18px",
            bottom: "10px",
            left: "18px",
            height: "5px",
            borderRadius: "3px",
            backgroundColor: "#11110f",
            border: "1px solid #050504",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          zIndex: 1,
          width: "150px",
          marginTop: "-12px",
          minHeight: "124px",
          flexDirection: "column",
          padding: "16px",
          backgroundColor: "#fffdf7",
          color: "#282722",
          fontFamily: "monospace",
          boxShadow:
            "inset 0 13px 14px -15px rgba(0,0,0,.85), 0 10px 16px rgba(0,0,0,.16)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: "1px",
          }}
        >
          MORNING GOODS
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "18px",
            paddingBottom: "8px",
            borderBottom: "1px dashed #a8a29e",
            fontSize: "8px",
          }}
        >
          <span>Everyday watch</span>
          <span>$128</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "9px",
            fontSize: "10px",
            fontWeight: 900,
          }}
        >
          <span>TOTAL</span>
          <span>$138.24</span>
        </div>
      </div>
    </div>
  )
}
function ChevronDownGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={preview.mutedForeground}
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
      stroke={preview.mutedForeground}
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
        backgroundColor: preview.muted,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          borderRadius: "10px",
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
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
          color: preview.mutedForeground,
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
        backgroundColor: preview.primary,
        color: preview.primaryForeground,
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
        border: `1px solid ${preview.border}`,
      }}
    >
      {["Button 1", "Button 2"].map((label, index) => (
        <div
          key={label}
          style={{
            display: "flex",
            padding: "12px 20px",
            fontSize: "17px",
            color: preview.foreground,
            borderLeft: index > 0 ? `1px solid ${preview.border}` : undefined,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        fontSize: "16px",
        color: preview.mutedForeground,
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
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: index === 1 ? preview.primary : preview.muted,
            border: `1px solid ${preview.border}`,
            color: index === 1 ? preview.primaryForeground : preview.foreground,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        fontSize: "16px",
        color: preview.mutedForeground,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        fontSize: "16px",
        color: preview.mutedForeground,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: `1px solid ${preview.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "18px",
            color: preview.foreground,
          }}
        >
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
          color: preview.mutedForeground,
          backgroundColor: preview.muted,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 18px",
          borderBottom: `1px solid ${preview.border}`,
        }}
      >
        <div style={{ display: "flex" }}>
          <SearchGlyph size={16} />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: preview.mutedForeground,
          }}
        >
          Search commands...
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: preview.foreground,
          backgroundColor: preview.muted,
        }}
      >
        Calendar
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px 18px",
          fontSize: "16px",
          color: preview.mutedForeground,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
      }}
    >
      <div
        style={{ display: "flex", fontSize: "18px", color: preview.foreground }}
      >
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
              color: preview.mutedForeground,
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
              backgroundColor: preview.background,
              border: `1px solid ${preview.border}`,
              fontSize: "17px",
              color: preview.foreground,
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
      <div
        style={{ display: "flex", fontSize: "16px", color: preview.foreground }}
      >
        PersianLabs/ui
      </div>
      <div
        style={{
          display: "flex",
          height: "1px",
          width: "100%",
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: preview.mutedForeground,
        }}
      >
        Design system foundation
      </div>
    </div>
  )
}

export function TypographyPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "220px",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "22px",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: preview.foreground,
        }}
      >
        Persian interfaces
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "1px",
          backgroundColor: preview.border,
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          lineHeight: 1.5,
          color: preview.mutedForeground,
        }}
      >
        Clear hierarchy for headings, paragraphs, and readable Persian copy.
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
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
        <div
          style={{
            display: "flex",
            fontSize: "17px",
            color: preview.foreground,
          }}
        >
          Card Title
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "13px",
            color: preview.mutedForeground,
          }}
        >
          Card description text
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: `1px solid ${preview.border}`,
          padding: "12px 18px",
          fontSize: "13px",
          color: preview.mutedForeground,
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
      <div style={{ display: "flex", color: preview.mutedForeground }}>
        Home
      </div>
      <div style={{ display: "flex", color: preview.mutedForeground }}>/</div>
      <div style={{ display: "flex", color: preview.mutedForeground }}>
        Components
      </div>
      <div style={{ display: "flex", color: preview.mutedForeground }}>/</div>
      <div style={{ display: "flex", color: preview.foreground }}>
        Breadcrumb
      </div>
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
          backgroundColor: preview.muted,
        }}
      >
        <ChevronDownGlyph size={20} />
      </div>
      <div
        style={{ display: "flex", fontSize: "16px", color: preview.foreground }}
      >
        No results
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: preview.mutedForeground,
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
        color: preview.foreground,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "32px",
          height: "18px",
          borderRadius: "999px",
          backgroundColor: preview.primary,
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
            backgroundColor: preview.background,
          }}
        />
      </div>
      Airplane Mode
    </div>
  )
}

export function CarouselPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          borderRadius: "9999px",
          border: `1px solid ${preview.border}`,
          backgroundColor: preview.background,
          color: preview.mutedForeground,
          fontSize: "11px",
        }}
      >
        ‹
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            style={{
              display: "flex",
              width: index === 1 ? "44px" : "36px",
              height: index === 1 ? "44px" : "36px",
              borderRadius: "10px",
              border: `1px solid ${preview.border}`,
              backgroundColor: index === 1 ? preview.muted : preview.background,
              color: preview.foreground,
              fontSize: index === 1 ? "14px" : "12px",
              fontWeight: 600,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {index + 2}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          borderRadius: "9999px",
          border: `1px solid ${preview.border}`,
          backgroundColor: preview.background,
          color: preview.foreground,
          fontSize: "11px",
        }}
      >
        ›
      </div>
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
        color: preview.foreground,
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
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
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
            color: preview.foreground,
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
              border: `1px solid ${preview.border}`,
              backgroundColor: i === 1 ? preview.primary : "transparent",
            }}
          >
            {i === 1 && (
              <div
                style={{
                  display: "flex",
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  backgroundColor: preview.background,
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
        backgroundColor: preview.muted,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "66%",
          height: "100%",
          backgroundColor: preview.primary,
          borderRadius: "999px",
        }}
      />
    </div>
  )
}

export function SliderPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "220px",
        height: "16px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "6px",
          borderRadius: "999px",
          backgroundColor: preview.muted,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "40%",
            height: "100%",
            backgroundColor: preview.primary,
            borderRadius: "999px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "1px",
          left: "calc(40% - 7px)",
          width: "16px",
          height: "16px",
          borderRadius: "999px",
          backgroundColor: preview.background,
          border: `2px solid ${preview.primary}`,
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
          color: preview.foreground,
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
          border: `1px solid ${preview.border}`,
          color: preview.mutedForeground,
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
        backgroundColor: preview.muted,
        color: preview.foreground,
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
        border: `1px solid ${preview.border}`,
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
            backgroundColor: i === 0 ? preview.muted : "transparent",
            color: preview.foreground,
            fontSize: "16px",
            fontWeight: 700,
            borderInlineStart:
              i > 0 ? `1px solid ${preview.border}` : undefined,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
        fontSize: "16px",
        color: preview.foreground,
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
        backgroundColor: preview.muted,
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
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Opacity
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: preview.mutedForeground,
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
        backgroundColor: preview.muted,
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
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Price
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "13px",
          color: preview.mutedForeground,
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
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
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
          backgroundColor: preview.primary,
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          display: "flex",
          marginTop: "8px",
          borderRadius: "8px",
          border: `1px solid ${preview.border}`,
          fontSize: "13px",
          color: preview.foreground,
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
              i < rows.length - 1 ? `1px solid ${preview.border}` : "none",
            fontSize: "13px",
            color: i === 0 ? preview.foreground : preview.mutedForeground,
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
        backgroundColor: preview.muted,
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
          backgroundColor: preview.background,
          borderInlineStart: `1px solid ${preview.border}`,
          padding: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60%",
            height: "8px",
            borderRadius: "999px",
            backgroundColor: preview.muted,
          }}
        />
        <div
          style={{
            display: "flex",
            width: "80%",
            height: "6px",
            borderRadius: "999px",
            backgroundColor: preview.muted,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
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
            backgroundColor: i === 1 ? preview.muted : "transparent",
            color: preview.foreground,
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
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.muted,
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
            backgroundColor: i === 0 ? preview.muted : "transparent",
            color: preview.foreground,
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
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.muted,
        padding: "16px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "14px", color: preview.foreground }}
      >
        Edit profile
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: preview.mutedForeground,
        }}
      >
        Make changes to your profile here.
      </div>
      <div
        style={{
          display: "flex",
          height: "24px",
          borderRadius: "6px",
          border: `1px solid ${preview.border}`,
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
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.muted,
        padding: "16px",
        textAlign: "center",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Are you absolutely sure?
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: preview.mutedForeground,
        }}
      >
        This action cannot be undone.
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
        <div
          style={{
            display: "flex",
            borderRadius: "6px",
            border: `1px solid ${preview.border}`,
            padding: "6px 14px",
            fontSize: "12px",
            color: preview.foreground,
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
        backgroundColor: preview.muted,
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
          backgroundColor: preview.background,
          borderTop: `1px solid ${preview.border}`,
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
            backgroundColor: preview.muted,
          }}
        />
        <div
          style={{
            display: "flex",
            width: "60%",
            height: "8px",
            borderRadius: "999px",
            backgroundColor: preview.muted,
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
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
        padding: "12px 14px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "14px", color: preview.foreground }}
      >
        Heads up
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: preview.mutedForeground,
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
        backgroundColor: preview.muted,
        border: `1px solid ${preview.border}`,
        fontSize: "12px",
        color: preview.mutedForeground,
      }}
    >
      16 : 9
    </div>
  )
}

export function AttachmentPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        width: "220px",
        padding: "10px",
        borderRadius: "16px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "36px",
          height: "36px",
          flexShrink: 0,
          borderRadius: "9px",
          backgroundColor: preview.muted,
          color: preview.foreground,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          aria-hidden="true"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: preview.foreground,
            whiteSpace: "nowrap",
          }}
        >
          sales-dashboard.pdf
        </div>
        <div
          style={{
            marginTop: "2px",
            fontSize: "11px",
            color: preview.mutedForeground,
            whiteSpace: "nowrap",
          }}
        >
          PDF · 2.4 MB
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "22px",
          height: "22px",
          marginLeft: "auto",
          flexShrink: 0,
          borderRadius: "9999px",
          color: preview.mutedForeground,
          fontSize: "13px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </div>
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
        backgroundColor: preview.muted,
        color: preview.foreground,
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
        color: preview.foreground,
      }}
    >
      <div style={{ display: "flex" }}>LTR</div>
      <div style={{ display: "flex", color: preview.mutedForeground }}>
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
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
        padding: "12px 14px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "14px", color: preview.foreground }}
      >
        @shadcn
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "12px",
          color: preview.mutedForeground,
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
        border: `1px solid ${preview.border}`,
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          backgroundColor: preview.muted,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <div
          style={{
            display: "flex",
            fontSize: "13px",
            color: preview.foreground,
          }}
        >
          Item title
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            color: preview.mutedForeground,
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
        color: preview.mutedForeground,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "1px",
          flex: 1,
          backgroundColor: preview.muted,
        }}
      />
      <div style={{ display: "flex" }}>OR</div>
      <div
        style={{
          display: "flex",
          height: "1px",
          flex: 1,
          backgroundColor: preview.muted,
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
          backgroundColor: preview.muted,
          color: preview.foreground,
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
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
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
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          borderRadius: "12px",
          backgroundColor: preview.muted,
          color: preview.foreground,
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
        backgroundColor: preview.muted,
        color: preview.foreground,
      }}
    >
      ↓
    </div>
  )
}

export function NavigationMenuPreview() {
  const items = ["Home", "Components", "Docs"]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px",
        borderRadius: "12px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
      }}
    >
      {items.map((item, index) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            padding: "5px 10px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: index === 1 ? 600 : 400,
            color: index === 1 ? preview.foreground : preview.mutedForeground,
            backgroundColor: index === 1 ? preview.muted : "transparent",
          }}
        >
          {item}
          {index === 1 && (
            <svg
              aria-hidden="true"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

export function PaginationPreview() {
  const pages = ["1", "2", "3"]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          color: preview.mutedForeground,
          fontSize: "16px",
        }}
      >
        ‹
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        {pages.map((page) => {
          const active = page === "2"

          return (
            <div
              key={page}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: active
                  ? `1px solid ${preview.border}`
                  : "1px solid transparent",
                backgroundColor: "transparent",
                color: active ? preview.foreground : preview.mutedForeground,
                fontSize: "12px",
                fontWeight: active ? 600 : 500,
              }}
            >
              {page}
            </div>
          )
        })}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            color: preview.mutedForeground,
            fontSize: "12px",
          }}
        >
          •••
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          color: preview.mutedForeground,
          fontSize: "16px",
        }}
      >
        ›
      </div>
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
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          width: "2px",
          backgroundColor: preview.muted,
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
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          width: "140px",
          height: "10px",
          borderRadius: "6px",
          backgroundColor: preview.muted,
        }}
      />
      <div
        style={{
          display: "flex",
          width: "100px",
          height: "10px",
          borderRadius: "6px",
          backgroundColor: preview.muted,
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
        border: `1px solid ${preview.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: `1px solid ${preview.border}`,
          backgroundColor: preview.muted,
          fontSize: "12px",
          color: preview.mutedForeground,
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
              i < rows.length - 1 ? `1px solid ${preview.border}` : undefined,
            fontSize: "13px",
            color: preview.foreground,
          }}
        >
          <div style={{ display: "flex" }}>{row.name}</div>
          <div style={{ display: "flex", color: preview.mutedForeground }}>
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
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
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
          border: `1px solid ${preview.border}`,
          color: preview.foreground,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
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
            backgroundColor: i === 0 ? preview.muted : "transparent",
            color: preview.foreground,
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
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Email
      </div>
      <div
        style={{
          display: "flex",
          padding: "9px 12px",
          borderRadius: "8px",
          backgroundColor: preview.background,
          border: `1px solid ${preview.border}`,
          fontSize: "13px",
          color: preview.mutedForeground,
        }}
      >
        you@example.com
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: preview.mutedForeground,
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
            backgroundColor: preview.muted,
            color: preview.mutedForeground,
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
          backgroundColor: preview.primary,
          color: preview.primaryForeground,
          fontSize: "11px",
        }}
      >
        ✓
      </div>
      <div
        style={{ display: "flex", fontSize: "14px", color: preview.foreground }}
      >
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
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
        padding: "14px 16px",
      }}
    >
      <div
        style={{ display: "flex", fontSize: "13px", color: preview.foreground }}
      >
        Dimensions
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "11px",
          color: preview.mutedForeground,
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
        border: `1px solid ${preview.border}`,
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
            style={{
              display: "flex",
              fontSize: "12px",
              color: preview.foreground,
            }}
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
          backgroundColor: preview.muted,
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
        border: `2px solid ${preview.border}`,
        borderTopColor: preview.primary,
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
      fill={preview.foreground}
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
        backgroundColor: preview.muted,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "16px",
          fontWeight: 600,
          color: preview.foreground,
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
      stroke={preview.success}
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
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
        <div
          style={{
            display: "flex",
            fontSize: "13px",
            fontWeight: 600,
            color: preview.foreground,
          }}
        >
          Event created
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            color: preview.mutedForeground,
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
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
      }}
    >
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke={preview.foreground}
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

export function DateWheelPickerPreview() {
  const wheels = [
    ["۱۴۰۱", "۱۴۰۲", "۱۴۰۳", "۱۴۰۴", "۱۴۰۵"],
    ["بهمن", "اسفند", "فروردین", "اردیبهشت", "خرداد"],
    ["۱۷", "۱۸", "۱۹", "۲۰", "۲۱"],
  ]

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "190px",
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
                color: preview.foreground,
                fontSize: wheelIndex === 1 ? "12px" : "14px",
                fontWeight: optionIndex === 2 ? 600 : 400,
                transform: `scale(${optionIndex === 2 ? 1.08 : 0.84})`,
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

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size))
  }
  return result
}

function CalendarGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={preview.mutedForeground}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

export function DataTablePreview() {
  const rows = [
    { selected: true, cells: ["ken99@example.com", "$316"] },
    { selected: false, cells: ["abe45@example.com", "$242"] },
    { selected: false, cells: ["silas22@example.com", "$625"] },
  ]

  return (
    <div
      style={{
        width: "230px",
        borderRadius: "10px",
        border: `1px solid ${preview.border}`,
        backgroundColor: preview.background,
        overflow: "hidden",
        fontSize: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          padding: "7px 10px",
          borderBottom: `1px solid ${preview.border}`,
          color: preview.mutedForeground,
          fontWeight: 600,
        }}
      >
        <div style={{ width: "14px" }} />
        <div style={{ flex: 1 }}>Email</div>
        <div style={{ textAlign: "right" }}>Amount</div>
      </div>
      {rows.map((row) => (
        <div
          key={row.cells[0]}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "7px 10px",
            borderBottom: `1px solid ${preview.border}`,
            backgroundColor: row.selected ? preview.muted : "transparent",
            color: preview.foreground,
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "3px",
              border: `1px solid ${row.selected ? preview.primary : preview.border}`,
              backgroundColor: row.selected ? preview.primary : "transparent",
              color: preview.primaryForeground,
              fontSize: "8px",
              lineHeight: "11px",
              textAlign: "center",
            }}
          >
            ✓
          </div>
          <div style={{ flex: 1 }}>{row.cells[0]}</div>
          <div style={{ fontWeight: 600 }}>{row.cells[1]}</div>
        </div>
      ))}
    </div>
  )
}

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

export function BankInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "250px",
        alignItems: "center",
        gap: "8px",
        padding: "10px 16px 10px 12px",
        border: `1px solid ${preview.border}`,
        borderRadius: "9px",
        color: preview.foreground,
        fontFamily: "monospace",
        fontSize: "12px",
        letterSpacing: "0.06em",
      }}
    >
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
        6219-8619-1894-9297
      </div>
      <svg
        aria-label="Blubank"
        role="img"
        viewBox="0 0 48 48"
        style={{
          display: "flex",
          width: "22px",
          height: "22px",
          flexShrink: 0,
        }}
      >
        <path
          fill="#000"
          d="M11.411 12.804a1.902 1.902 0 1 0 0-3.804 1.902 1.902 0 0 0 0 3.804"
        />
        <path
          fill="#4e91e6"
          d="M36.135 21.267V30.3c0 1.996 1.48 3.518 3.423 3.518 1.924 0 3.423-1.522 3.423-3.46v-9.092a2.38 2.38 0 0 1 2.378-2.377h2.377v11.22a8.178 8.178 0 0 1-16.356 0V18.89h2.377a2.377 2.377 0 0 1 2.378 2.377"
        />
        <path
          fill="#4e91e6"
          fillRule="evenodd"
          d="M25.2 11.663h2.377V35.91a2.377 2.377 0 0 1-2.378 2.377h-2.377V14.04a2.377 2.377 0 0 1 2.377-2.377"
          clipRule="evenodd"
        />
        <path
          fill="#4e91e6"
          d="M4.755 11.663v9.027c1.504-1.364 3.424-2.18 5.515-2.18 4.832 0 8.748 4.363 8.748 9.746v.238c0 5.562-4.257 9.794-9.509 9.794-5.159 0-9.358-4.232-9.505-9.509H0v-14.74a2.38 2.38 0 0 1 2.377-2.376zm4.659 11.22c-2.73 0-4.945 2.448-4.945 5.468s2.214 5.468 4.945 5.468 4.945-2.448 4.945-5.468-2.214-5.468-4.945-5.468"
        />
      </svg>
    </div>
  )
}

export function PasswordInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "220px",
        padding: "10px 14px",
        borderRadius: "10px",
        backgroundColor: preview.background,
        border: `1px solid ${preview.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          fontSize: "18px",
          letterSpacing: "0.1em",
          color: preview.foreground,
        }}
      >
        ••••••••
      </div>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={preview.mutedForeground}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "flex", flexShrink: 0 }}
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  )
}

export function MobileNumberInputPreview() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "220px",
        alignItems: "center",
        gap: "8px",
        padding: "10px 14px",
        border: `1px solid ${preview.border}`,
        borderRadius: "9px",
        color: preview.foreground,
        fontFamily: "monospace",
        fontSize: "13px",
        letterSpacing: "0.04em",
      }}
    >
      <div style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
        0912 123 4567
      </div>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={preview.success}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "flex", flexShrink: 0 }}
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  )
}

export function QRCodePreview() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "96px",
        height: "96px",
        borderRadius: "14px",
        backgroundColor: "#ffffff",
        border: `1px solid ${preview.border}`,
      }}
    >
      <svg
        aria-hidden="true"
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "flex" }}
      >
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
        <path d="M21 21v.01" />
        <path d="M12 7v3a2 2 0 0 1-2 2H7" />
        <path d="M3 12h.01" />
        <path d="M12 3h.01" />
        <path d="M12 16v.01" />
        <path d="M16 12h1" />
        <path d="M21 12v.01" />
        <path d="M12 21v-1" />
      </svg>
    </div>
  )
}

export function QuestionnairePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        width: "160px",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "5px",
          width: "100%",
          borderRadius: "999px",
          backgroundColor: preview.muted,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60%",
            borderRadius: "999px",
            backgroundColor: preview.primary,
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {["Developer", "Designer"].map((label, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "10px",
              border: `1px solid ${i === 0 ? preview.primary : preview.border}`,
              padding: "7px 10px",
              fontSize: "12px",
              color: preview.foreground,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "13px",
                height: "13px",
                borderRadius: "999px",
                border: `1px solid ${i === 0 ? preview.primary : preview.border}`,
                backgroundColor: i === 0 ? preview.primary : "transparent",
              }}
            >
              {i === 0 && (
                <div
                  style={{
                    display: "flex",
                    width: "5px",
                    height: "5px",
                    borderRadius: "999px",
                    backgroundColor: preview.background,
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
