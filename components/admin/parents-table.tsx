"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Eye, Phone, Mail } from "lucide-react"

const parents = [
  {
    id: "1",
    name: "John Johnson",
    email: "john.johnson@email.com",
    phone: "+1 234-567-8901",
    children: ["Alice Johnson"],
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Mary Smith",
    email: "mary.smith@email.com",
    phone: "+1 234-567-8902",
    children: ["Bob Smith"],
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Robert Davis",
    email: "robert.davis@email.com",
    phone: "+1 234-567-8903",
    children: ["Carol Davis"],
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function ParentsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Parent</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Children</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parents.map((parent) => (
          <TableRow key={parent.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={parent.avatar || "/placeholder.svg"} alt={parent.name} />
                  <AvatarFallback>
                    {parent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{parent.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Mail className="mr-1 h-3 w-3" />
                    {parent.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center text-sm">
                <Phone className="mr-1 h-3 w-3" />
                {parent.phone}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {parent.children.map((child) => (
                  <Badge key={child} variant="outline">
                    {child}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={parent.status === "Active" ? "default" : "secondary"}>{parent.status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
