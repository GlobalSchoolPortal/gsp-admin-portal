import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Calendar, Clock } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { UpcomingClasses } from "@/components/teacher/upcoming-classes"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your teaching overview.</p>
      </div>

      {/*<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">*/}
      {/*  <StatsCard title="My Classes" value="8" description="Active classes" icon={BookOpen} />*/}
      {/*  <StatsCard title="Total Students" value="245" description="Across all classes" icon={Users} />*/}
      {/*  <StatsCard title="Today's Classes" value="5" description="Scheduled for today" icon={Calendar} />*/}
      {/*  <StatsCard title="Pending Meetings" value="3" description="Parent meetings" icon={Clock} />*/}
      {/*</div>*/}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingClasses />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
