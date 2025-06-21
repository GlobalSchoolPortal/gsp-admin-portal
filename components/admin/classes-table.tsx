"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, Users, GraduationCap } from "lucide-react"

const classes = [
  {
    id: "1",
    name: "Class 10A",
    teacher: "Dr. Sarah Wilson",
    students: 32,
    subjects: ["Math", "Physics", "Chemistry", "English"],
    room: "Room 101",
    status: "Active",
  },
  {
    id: "2",
    name: "Class 10B",
    teacher: "Mr. John Davis",
    students: 28,
    subjects: ["Math", "Physics", "Chemistry", "English"],
    room: "Room 102",
    status: "Active",
  },
  {
    id: "3",
    name: "Class 11A",
    teacher: "Ms. Emily Brown",
    students: 25,
    subjects: ["Advanced Math", "Physics", "Chemistry", "Biology"],
    room: "Room 201",
    status: "Active",
  },
]

export function ClassesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class</TableHead>
          <TableHead>Class Teacher</TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Subjects</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classes.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell className="font-medium">{cls.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                {cls.teacher}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                {cls.students}
              </div>
            </TableCell>
            <TableCell>{cls.room}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {cls.subjects.slice(0, 2).map((subject) => (
                  <Badge key={subject} variant="outline">
                    {subject}
                  </Badge>
                ))}
                {cls.subjects.length > 2 && <Badge variant="secondary">+{cls.subjects.length - 2}</Badge>}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={cls.status === "Active" ? "default" : "secondary"}>{cls.status}</Badge>
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
