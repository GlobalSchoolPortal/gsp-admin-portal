"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const attendanceData = [
  { class: "10A", present: 28, absent: 4, total: 32, percentage: 87.5 },
  { class: "10B", present: 25, absent: 3, total: 28, percentage: 89.3 },
  { class: "9A", present: 29, absent: 1, total: 30, percentage: 96.7 },
  { class: "9B", present: 26, absent: 2, total: 28, percentage: 92.9 },
  { class: "11A", present: 23, absent: 2, total: 25, percentage: 92.0 },
  { class: "11B", present: 21, absent: 3, total: 24, percentage: 87.5 },
]

export function AttendanceOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {attendanceData.map((data) => (
        <Card key={data.class}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              Class {data.class}
              <Badge variant={data.percentage >= 90 ? "default" : "secondary"}>{data.percentage}%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={data.percentage} className="h-2" />
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <div className="font-medium text-green-600">{data.present}</div>
                <div className="text-muted-foreground">Present</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-red-600">{data.absent}</div>
                <div className="text-muted-foreground">Absent</div>
              </div>
              <div className="text-center">
                <div className="font-medium">{data.total}</div>
                <div className="text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
