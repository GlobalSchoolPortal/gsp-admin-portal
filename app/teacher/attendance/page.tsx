import { TeacherAttendance } from "@/components/teacher/teacher-attendance"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherAttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance</h1>
        <p className="text-muted-foreground">Mark and track student attendance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Record daily attendance for your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <TeacherAttendance />
        </CardContent>
      </Card>
    </div>
  )
}
