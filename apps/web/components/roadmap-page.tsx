import { cn } from "@workspace/ui/lib/utils"

export interface RoadmapPhase {
  title: string
  status: "now" | "next" | "later"
  tagline?: string
  items: string[]
}

const STATUS_META = {
  now: {
    label: "In progress",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  next: {
    label: "Next up",
    className:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  },
  later: {
    label: "Later",
    className: "bg-muted text-muted-foreground",
  },
} as const

export function RoadmapPage({
  eyebrow,
  title,
  description,
  phases,
}: {
  eyebrow: string
  title: string
  description: string
  phases: RoadmapPhase[]
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-8">
      <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-12 flex flex-col gap-6">
        {phases.map((phase) => {
          const status = STATUS_META[phase.status]
          return (
            <section
              key={phase.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{phase.title}</h2>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                    status.className
                  )}
                >
                  {status.label}
                </span>
              </div>
              {phase.tagline && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {phase.tagline}
                </p>
              )}
              <ul className="mt-4 flex flex-col gap-2.5">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
