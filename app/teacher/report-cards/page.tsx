import { TeacherReportCards } from "@/components/teacher/teacher-report-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherReportCardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Report Cards</h1>
        <p className="text-muted-foreground">Enter grades and generate report cards</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grade Entry</CardTitle>
          <CardDescription>Enter grades for your subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <TeacherReportCards />
        </CardContent>
      </Card>
    </div>
  )
}
