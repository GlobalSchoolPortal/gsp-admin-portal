"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Plus } from "lucide-react"

const meetings = [
  {
    id: "1",
    parent: "John Johnson",
    student: "Alice Johnson",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "Scheduled",
    type: "Academic Discussion",
  },
  {
    id: "2",
    parent: "Mary Smith",
    student: "Bob Smith",
    date: "2024-01-16",
    time: "2:00 PM",
    status: "Completed",
    type: "Behavior Discussion",
  },
]

export function TeacherMeetings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Upcoming Meetings</h3>
          <p className="text-sm text-muted-foreground">Manage your parent-teacher meetings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Time Slot
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parent</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {meeting.parent}
                </div>
              </TableCell>
              <TableCell>{meeting.student}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{meeting.date}</span>
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{meeting.time}</span>
                </div>
              </TableCell>
              <TableCell>{meeting.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    meeting.status === "Completed"
                      ? "default"
                      : meeting.status === "Scheduled"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {meeting.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
