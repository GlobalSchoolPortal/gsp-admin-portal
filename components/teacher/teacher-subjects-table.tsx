"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Edit } from "lucide-react"

const subjects = [
  {
    id: "1",
    name: "Mathematics",
    classes: ["10A", "10B"],
    students: 60,
    averageGrade: "B+",
    status: "Active",
  },
  {
    id: "2",
    name: "Physics",
    classes: ["11A"],
    students: 25,
    averageGrade: "A-",
    status: "Active",
  },
  {
    id: "3",
    name: "Chemistry",
    classes: ["11B"],
    students: 22,
    averageGrade: "B",
    status: "Active",
  },
]

export function TeacherSubjectsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Subject</TableHead>
          <TableHead>Classes</TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Average Grade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects.map((subject) => (
          <TableRow key={subject.id}>
            <TableCell>
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span className="font-medium">{subject.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {subject.classes.map((cls) => (
                  <Badge key={cls} variant="outline">
                    {cls}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                {subject.students}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{subject.averageGrade}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={subject.status === "Active" ? "default" : "secondary"}>{subject.status}</Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Enter Grades
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
