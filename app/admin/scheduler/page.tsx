import { MeetingSchedulerAdmin } from "@/components/admin/meeting-scheduler-admin"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar } from "lucide-react"

export default function SchedulerPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Meeting Scheduler</h1>
          <p className="text-muted-foreground">Manage parent-teacher meetings and appointments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Schedule</CardTitle>
          <CardDescription>View and manage scheduled meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <MeetingSchedulerAdmin />
        </CardContent>
      </Card>
    </div>
  )
}
