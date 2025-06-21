"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Save } from "lucide-react"

const students = [
  { id: "1", name: "Alice Johnson", rollNumber: "001", status: "present" },
  { id: "2", name: "Bob Smith", rollNumber: "002", status: "present" },
  { id: "3", name: "Carol Davis", rollNumber: "003", status: "absent" },
  { id: "4", name: "David Wilson", rollNumber: "004", status: "present" },
  { id: "5", name: "Emma Brown", rollNumber: "005", status: "late" },
]

export function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("10A")
  const [attendanceData, setAttendanceData] = useState(students)

  const updateAttendance = (studentId: string, status: string) => {
    setAttendanceData((prev) => prev.map((student) => (student.id === studentId ? { ...student, status } : student)))
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

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Today: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Attendance
        </Button>
      </div>

      <div className="space-y-4">
        {attendanceData.map((student) => (
          <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt={student.name} />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`present-${student.id}`}
                  checked={student.status === "present"}
                  onCheckedChange={() => updateAttendance(student.id, "present")}
                />
                <label htmlFor={`present-${student.id}`} className="text-sm">
                  Present
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`absent-${student.id}`}
                  checked={student.status === "absent"}
                  onCheckedChange={() => updateAttendance(student.id, "absent")}
                />
                <label htmlFor={`absent-${student.id}`} className="text-sm">
                  Absent
                </label>
              </div>

              <Badge
                variant={
                  student.status === "present" ? "default" : student.status === "late" ? "secondary" : "destructive"
                }
              >
                {student.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
