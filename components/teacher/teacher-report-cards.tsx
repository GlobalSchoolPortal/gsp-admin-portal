"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Download } from "lucide-react"

const students = [
  {
    id: "1",
    name: "Alice Johnson",
    rollNumber: "001",
    math: 95,
    physics: 88,
    chemistry: 92,
  },
  {
    id: "2",
    name: "Bob Smith",
    rollNumber: "002",
    math: 78,
    physics: 82,
    chemistry: 75,
  },
  {
    id: "3",
    name: "Carol Davis",
    rollNumber: "003",
    math: 85,
    physics: 90,
    chemistry: 88,
  },
]

export function TeacherReportCards() {
  const [selectedClass, setSelectedClass] = useState("10A")
  const [selectedSubject, setSelectedSubject] = useState("mathematics")

  const calculateGrade = (score: number) => {
    if (score >= 90) return "A+"
    if (score >= 85) return "A"
    if (score >= 80) return "B+"
    if (score >= 75) return "B"
    if (score >= 70) return "C+"
    if (score >= 65) return "C"
    return "F"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10A">Class 10A</SelectItem>
              <SelectItem value="10B">Class 10B</SelectItem>
              <SelectItem value="11A">Class 11A</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Grades
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Roll No.</TableHead>
            <TableHead>Math</TableHead>
            <TableHead>Physics</TableHead>
            <TableHead>Chemistry</TableHead>
            <TableHead>Average</TableHead>
            <TableHead>Grade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const average = Math.round((student.math + student.physics + student.chemistry) / 3)
            const grade = calculateGrade(average)

            return (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>
                  <Input type="number" defaultValue={student.math} className="w-20" min="0" max="100" />
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={student.physics} className="w-20" min="0" max="100" />
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={student.chemistry} className="w-20" min="0" max="100" />
                </TableCell>
                <TableCell className="font-medium">{average}</TableCell>
                <TableCell>
                  <Badge variant={grade.startsWith("A") ? "default" : "secondary"}>{grade}</Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
