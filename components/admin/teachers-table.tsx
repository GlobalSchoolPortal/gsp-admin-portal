"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Eye } from "lucide-react"

const teachers = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@school.edu",
    subjects: ["Mathematics", "Physics"],
    classes: ["10A", "11B"],
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Mr. John Davis",
    email: "john.davis@school.edu",
    subjects: ["English", "Literature"],
    classes: ["9A", "10B"],
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Ms. Emily Brown",
    email: "emily.brown@school.edu",
    subjects: ["Chemistry", "Biology"],
    classes: ["11A", "12A"],
    status: "On Leave",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function TeachersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Teacher</TableHead>
          <TableHead>Subjects</TableHead>
          <TableHead>Classes</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                  <AvatarFallback>
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{teacher.name}</div>
                  <div className="text-sm text-muted-foreground">{teacher.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {teacher.subjects.map((subject) => (
                  <Badge key={subject} variant="outline">
                    {subject}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {teacher.classes.map((cls) => (
                  <Badge key={cls} variant="secondary">
                    {cls}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>{teacher.status}</Badge>
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
