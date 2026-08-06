export const CODE_FENCE = "```"

interface MarkdownTableRow {
  prop: string
  type: string
  default?: string
  description: string
}

export function apiRowsToMarkdownTable(rows: MarkdownTableRow[]) {
  const header = "| Prop | Type | Default | Description |"
  const divider = "| --- | --- | --- | --- |"
  const body = rows.map(
    (row) =>
      `| \`${row.prop}\` | \`${row.type}\` | ${row.default ?? "—"} | ${row.description} |`
  )

  return [header, divider, ...body].join("\n")
}
