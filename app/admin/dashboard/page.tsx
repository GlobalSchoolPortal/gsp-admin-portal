"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, BookOpen, Calendar } from "lucide-react"
import { authService } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  // This should run immediately when component mounts
  console.log("🏠 ADMIN DASHBOARD COMPONENT MOUNTED - FIRST LINE")

  useEffect(() => {
    console.log("🔄 ADMIN DASHBOARD useEffect RUNNING")

    // Check authentication
    const currentUser = authService.getCurrentUser()
    console.log("👤 Current user from auth service:", currentUser)

    if (!currentUser) {
      console.log("❌ No user found, redirecting to login")
      router.push("/login")
      return
    }

    if (currentUser.role !== "ADMIN") {
      console.log("❌ User is not admin, redirecting")
      router.push("/login")
      return
    }

    console.log("✅ User is valid admin, setting up dashboard")
    setUser(currentUser)
    setIsLoading(false)
    console.log("✅Admin dashboard ready")
  }, [router])

  console.log("🎨 ADMIN DASHBOARD RENDERING, isLoading:", isLoading)

  if (isLoading) {
    console.log("⏳ Showing loading state")
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">Loading dashboard...</p>
          </div>
        </div>
    )
  }

  console.log("🎯 Rendering main dashboard content")

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your school.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+3 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Across all grades</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your school</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">Student John Doe enrolled in Grade 10</p>
                <p className="text-sm">Teacher meeting scheduled for tomorrow</p>
                <p className="text-sm">New parent-teacher conference added</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full text-left p-2 hover:bg-gray-100 rounded">Add New Student</button>
                <button className="w-full text-left p-2 hover:bg-gray-100 rounded">Schedule Meeting</button>
                <button className="w-full text-left p-2 hover:bg-gray-100 rounded">Generate Reports</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
