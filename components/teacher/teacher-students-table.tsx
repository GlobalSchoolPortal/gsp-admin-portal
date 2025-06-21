"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, MessageCircle } from "lucide-react"

const students = [
  {
    id: "1",
    name: "Alice Johnson",
    class: "10A",
    rollNumber: "001",
    attendance: 95,
    lastGrade: "A+",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Bob Smith",
    class: "10B",
    rollNumber: "002",
    attendance: 88,
    lastGrade: "B+",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Carol Davis",
    class: "11A",
    rollNumber: "003",
    attendance: 92,
    lastGrade: "A",
    status: "Active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function TeacherStudentsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Roll No.</TableHead>
          <TableHead>Attendance</TableHead>
          <TableHead>Last Grade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="font-medium">{student.name}</div>
              </div>
            </TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>{student.rollNumber}</TableCell>
            <TableCell>
              <Badge variant={student.attendance >= 90 ? "default" : "secondary"}>{student.attendance}%</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={student.lastGrade.startsWith("A") ? "default" : "secondary"}>{student.lastGrade}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
