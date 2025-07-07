import { SubjectPerformanceChart } from "@/components/admin/subject-performance-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

export default function AcademicReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Academic Reports</h1>
          <p className="text-muted-foreground">View academic performance analytics and trends</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Average scores by subject across all classes</CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Student grade distribution this term</CardDescription>
          </CardHeader>
          <CardContent>
            <SubjectPerformanceChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Alice Johnson</span>
                <span className="text-sm text-muted-foreground">95.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">David Wilson</span>
                <span className="text-sm text-muted-foreground">93.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Emma Brown</span>
                <span className="text-sm text-muted-foreground">91.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Averages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Class 10A</span>
                <span className="text-sm text-muted-foreground">87.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Class 10B</span>
                <span className="text-sm text-muted-foreground">84.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Class 11A</span>
                <span className="text-sm text-muted-foreground">89.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Overall</span>
                <span className="text-sm text-muted-foreground">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">This Week</span>
                <span className="text-sm text-muted-foreground">96.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Last Week</span>
                <span className="text-sm text-muted-foreground">92.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
