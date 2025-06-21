import { AttendanceOverview } from "@/components/admin/attendance-overview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <p className="text-muted-foreground">Track and manage student attendance records</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
          <CardDescription>View attendance statistics and records</CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceOverview />
        </CardContent>
      </Card>
    </div>
  )
}
