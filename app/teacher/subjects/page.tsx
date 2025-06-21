import { TeacherSubjectsTable } from "@/components/teacher/teacher-subjects-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherSubjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Subjects</h1>
        <p className="text-muted-foreground">Manage subjects you teach and enter grades</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teaching Subjects</CardTitle>
          <CardDescription>Subjects assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <TeacherSubjectsTable />
        </CardContent>
      </Card>
    </div>
  )
}
