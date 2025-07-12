"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  UserPlus,
  CalendarDays,
  BarChart3,
  TrendingUp
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  const recentActivities = [
    {
      id: 1,
      user: "John Smith",
      action: "marked attendance for Class 10A",
      time: "2 minutes ago",
      avatar: "/placeholder-user.jpg",
      type: "attendance"
    },
    {
      id: 2,
      user: "Sarah Johnson",
      action: "uploaded report cards for Grade 9",
      time: "15 minutes ago",
      avatar: "/placeholder-user.jpg",
      type: "reports"
    },
    {
      id: 3,
      user: "Mike Wilson",
      action: "scheduled parent meeting",
      time: "1 hour ago",
      avatar: "/placeholder-user.jpg",
      type: "meeting"
    },
    {
      id: 4,
      user: "Emma Davis",
      action: "added new student record",
      time: "2 hours ago",
      avatar: "/placeholder-user.jpg",
      type: "student"
    },
    {
      id: 5,
      user: "David Brown",
      action: "updated class schedule",
      time: "3 hours ago",
      avatar: "/placeholder-user.jpg",
      type: "schedule"
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "attendance": return <Calendar className="h-4 w-4 text-blue-500" />
      case "reports": return <FileText className="h-4 w-4 text-green-500" />
      case "meeting": return <Clock className="h-4 w-4 text-purple-500" />
      case "student": return <UserPlus className="h-4 w-4 text-orange-500" />
      case "schedule": return <CalendarDays className="h-4 w-4 text-indigo-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">Welcome back! Here's what's happening at your school today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-blue-900">Total Students</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-bold text-blue-900">1,234</div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12%
                </div>
              </div>
              <p className="text-xs text-blue-700/70">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-green-900">Total Teachers</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <GraduationCap className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-bold text-green-900">89</div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +3
                </div>
              </div>
              <p className="text-xs text-green-700/70">+3 new this month</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-purple-900">Active Classes</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-bold text-purple-900">45</div>
                <Badge variant="secondary" className="text-xs">Active</Badge>
              </div>
              <p className="text-xs text-purple-700/70">Across all grades</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-orange-900">Attendance Rate</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-bold text-orange-900">94.2%</div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +2.1%
                </div>
              </div>
              <p className="text-xs text-orange-700/70">+2.1% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your school</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">Live</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50/50 transition-colors">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback className="text-xs">
                        {activity.user.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        {getActivityIcon(activity.type)}
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.user}</p>
                      </div>
                      <p className="text-xs text-gray-600">{activity.action}</p>
                    </div>
                    <p className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-left"
                  onClick={() => router.push('/admin/students')}
                >
                  <UserPlus className="h-4 w-4 mr-3 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">Add New Student</div>
                    <div className="text-xs text-muted-foreground">Register a new student</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-left"
                  onClick={() => router.push('/admin/scheduler')}
                >
                  <CalendarDays className="h-4 w-4 mr-3 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium">Schedule Meeting</div>
                    <div className="text-xs text-muted-foreground">Book parent-teacher meeting</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-left"
                  onClick={() => router.push('/admin/academic-reports')}
                >
                  <BarChart3 className="h-4 w-4 mr-3 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium">Generate Reports</div>
                    <div className="text-xs text-muted-foreground">Create academic reports</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-left"
                  onClick={() => router.push('/admin/attendance')}
                >
                  <Calendar className="h-4 w-4 mr-3 text-orange-600" />
                  <div className="flex-1">
                    <div className="font-medium">View Attendance</div>
                    <div className="text-xs text-muted-foreground">Check daily attendance</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
