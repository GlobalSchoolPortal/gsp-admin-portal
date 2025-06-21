// "use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
// import { RecentActivity } from "@/components/dashboard/recent-activity"
// import { AttendanceChart } from "@/components/dashboard/attendance-chart"

export default function AdminDashboard() {
        console.log("ADMIN DASHBOARD")
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your school.</p>
      </div>

      {/*<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">*/}
      {/*  <StatsCard*/}
      {/*    title="Total Students"*/}
      {/*    icon={Users}*/}
      {/*    endpoint="/dashboard/stats"*/}
      {/*    defaultValue="1,234"*/}
      {/*    defaultDescription="+12% from last month"*/}
      {/*  />*/}
      {/*  <StatsCard*/}
      {/*    title="Total Teachers"*/}
      {/*    icon={GraduationCap}*/}
      {/*    endpoint="/dashboard/stats"*/}
      {/*    defaultValue="89"*/}
      {/*    defaultDescription="+3 new this month"*/}
      {/*  />*/}
      {/*  <StatsCard*/}
      {/*    title="Active Classes"*/}
      {/*    icon={BookOpen}*/}
      {/*    endpoint="/dashboard/stats"*/}
      {/*    defaultValue="45"*/}
      {/*    defaultDescription="Across all grades"*/}
      {/*  />*/}
      {/*  <StatsCard*/}
      {/*    title="Attendance Rate"*/}
      {/*    icon={Calendar}*/}
      {/*    endpoint="/dashboard/stats"*/}
      {/*    defaultValue="94.2%"*/}
      {/*    defaultDescription="+2.1% from last week"*/}
      {/*  />*/}
      {/*</div>*/}

      {/*<div className="grid gap-6 md:grid-cols-2">*/}
      {/*  <Card>*/}
      {/*    <CardHeader>*/}
      {/*      <CardTitle>Attendance Overview</CardTitle>*/}
      {/*      <CardDescription>Weekly attendance trends</CardDescription>*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent>*/}
      {/*      /!*<AttendanceChart />*!/*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}

      {/*  <Card>*/}
      {/*    <CardHeader>*/}
      {/*      <CardTitle>Recent Activity</CardTitle>*/}
      {/*      <CardDescription>Latest updates from your school</CardDescription>*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent>*/}
      {/*      /!*<RecentActivity />*!/*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*</div>*/}
    </div>
  )
}
