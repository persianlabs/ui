import { Badge } from "@workspace/ui/components/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

const statusDotClass: Record<string, string> = {
  Paid: "bg-emerald-500",
  Unpaid: "bg-muted-foreground/50",
  Pending: "bg-amber-500",
  Failed: "bg-destructive",
}

const projects = [
  { project: "Website Redesign", status: "Paid", team: "Frontend Team", budget: "$12,500" },
  { project: "Mobile App", status: "Unpaid", team: "Mobile Team", budget: "$8,750" },
  { project: "API Integration", status: "Pending", team: "Backend Team", budget: "$5,200" },
  { project: "Database Migration", status: "Paid", team: "DevOps Team", budget: "$3,800" },
]

export function TableCardExample() {
  return (
    <Table variant="card" className="w-full max-w-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Team</TableHead>
          <TableHead className="text-end">Budget</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((row) => (
          <TableRow key={row.project}>
            <TableCell className="font-medium">{row.project}</TableCell>
            <TableCell>
              <Badge variant="outline" className="gap-1.5">
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${statusDotClass[row.status]}`}
                />
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.team}</TableCell>
            <TableCell className="text-end">{row.budget}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Budget</TableCell>
          <TableCell className="text-end">$30,250</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
