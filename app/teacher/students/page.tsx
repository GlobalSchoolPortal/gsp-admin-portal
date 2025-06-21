import { TeacherStudentsTable } from "@/components/teacher/teacher-students-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherStudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Students</h1>
        <p className="text-muted-foreground">View and manage students in your classes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>Students across all your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <TeacherStudentsTable />
        </CardContent>
      </Card>
    </div>
  )
}
