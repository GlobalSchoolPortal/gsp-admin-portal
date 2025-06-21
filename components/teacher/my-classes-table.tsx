"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Users, BookOpen, Calendar } from "lucide-react"

const classes = [
  {
    id: "1",
    name: "10A",
    subject: "Mathematics",
    students: 32,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "Room 101",
    status: "Active",
  },
  {
    id: "2",
    name: "10B",
    subject: "Mathematics",
    students: 28,
    schedule: "Tue, Thu - 10:30 AM",
    room: "Room 101",
    status: "Active",
  },
  {
    id: "3",
    name: "11A",
    subject: "Physics",
    students: 25,
    schedule: "Mon, Wed - 2:00 PM",
    room: "Lab 2",
    status: "Active",
  },
]

export function MyClassesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Class</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Schedule</TableHead>
          <TableHead>Room</TableHead>
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
                <BookOpen className="mr-2 h-4 w-4" />
                {cls.subject}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                {cls.students}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {cls.schedule}
              </div>
            </TableCell>
            <TableCell>{cls.room}</TableCell>
            <TableCell>
              <Badge variant={cls.status === "Active" ? "default" : "secondary"}>{cls.status}</Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
