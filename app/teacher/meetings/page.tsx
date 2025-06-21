import { TeacherMeetings } from "@/components/teacher/teacher-meetings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeacherMeetingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Parent Meetings</h1>
        <p className="text-muted-foreground">Manage your meeting schedule with parents</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Meetings</CardTitle>
          <CardDescription>Your upcoming and past meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <TeacherMeetings />
        </CardContent>
      </Card>
    </div>
  )
}
