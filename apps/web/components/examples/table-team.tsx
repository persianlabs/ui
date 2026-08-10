"use client"

import { MoreHorizontalIcon } from "lucide-react"
import * as React from "react"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

const members = [
  {
    id: "1",
    name: "Sara Ahmadi",
    initials: "SA",
    role: "Owner",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Kian Rahimi",
    initials: "KR",
    role: "Admin",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Niloofar Zare",
    initials: "NZ",
    role: "Member",
    status: "invited" as const,
  },
]

export function TableTeamExample() {
  const [selected, setSelected] = React.useState<string[]>([])
  const allSelected = selected.length === members.length

  return (
    <Table variant="card" className="w-full max-w-xl">
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox
              checked={allSelected}
              onCheckedChange={(checked) =>
                setSelected(checked ? members.map((m) => m.id) : [])
              }
              aria-label="Select all"
            />
          </TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow
            key={member.id}
            data-state={selected.includes(member.id) ? "selected" : undefined}
          >
            <TableCell>
              <Checkbox
                checked={selected.includes(member.id)}
                onCheckedChange={(checked) =>
                  setSelected((current) =>
                    checked
                      ? [...current, member.id]
                      : current.filter((id) => id !== member.id)
                  )
                }
                aria-label={`Select ${member.name}`}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{member.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {member.role}
            </TableCell>
            <TableCell>
              <Badge
                variant={member.status === "active" ? "default" : "outline"}
              >
                {member.status === "active" ? "Active" : "Invited"}
              </Badge>
            </TableCell>
            <TableCell className="text-end">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Change role</DropdownMenuItem>
                  <DropdownMenuItem>Resend invite</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
