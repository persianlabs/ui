import { HoverDetail } from "@/components/hover-detail"
import { ScrollArea } from "@workspace/ui/components/scroll-area"

export interface ApiReferenceRow {
  prop: string
  type: string
  typeDetail?: string
  default?: string
  description: string
}

export function ApiReference({
  title,
  rows,
}: {
  title: string
  rows: ApiReferenceRow[]
}) {
  return (
    <div className="mt-6">
      <h3 className="text-foreground font-mono text-sm font-medium">{title}</h3>
      <ScrollArea
        scrollbarOrientation="horizontal"
        className="border-border mt-3 rounded-lg border"
      >
        <table className="min-w-[48rem] w-full text-left text-sm">
          <thead>
            <tr className="border-border bg-muted/40 border-b">
              <th className="text-muted-foreground px-4 py-2 font-medium">Prop</th>
              <th className="text-muted-foreground px-4 py-2 font-medium">Type</th>
              <th className="text-muted-foreground px-4 py-2 font-medium">Default</th>
              <th className="text-muted-foreground min-w-64 px-4 py-2 font-medium">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-border/60 divide-y">
            {rows.map((row) => (
              <tr key={row.prop}>
                <td className="text-foreground px-4 py-2.5 font-mono whitespace-nowrap">
                  {row.prop}
                </td>
                <td className="text-muted-foreground px-4 py-2.5 font-mono whitespace-nowrap">
                  {row.typeDetail ? (
                    <HoverDetail detail={row.typeDetail}>{row.type}</HoverDetail>
                  ) : (
                    row.type
                  )}
                </td>
                <td className="text-muted-foreground px-4 py-2.5 font-mono whitespace-nowrap">
                  {row.default ?? "—"}
                </td>
                <td className="text-muted-foreground min-w-64 px-4 py-2.5 leading-relaxed">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  )
}
