"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Edit, Trash2 } from "lucide-react"

const meetings = [
  {
    id: "1",
    parent: "John Johnson",
    teacher: "Dr. Sarah Wilson",
    student: "Alice Johnson",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "30 min",
    status: "Scheduled",
    type: "Academic Discussion",
    room: "Conference Room A",
  },
  {
    id: "2",
    parent: "Mary Smith",
    teacher: "Mr. John Davis",
    student: "Bob Smith",
    date: "2024-01-16",
    time: "2:00 PM",
    duration: "30 min",
    status: "Completed",
    type: "Behavior Discussion",
    room: "Conference Room B",
  },
  {
    id: "3",
    parent: "Robert Davis",
    teacher: "Ms. Emily Brown",
    student: "Carol Davis",
    date: "2024-01-17",
    time: "11:00 AM",
    duration: "45 min",
    status: "Pending",
    type: "Progress Review",
    room: "Conference Room A",
  },
  {
    id: "4",
    parent: "Lisa Wilson",
    teacher: "Dr. Sarah Wilson",
    student: "David Wilson",
    date: "2024-01-18",
    time: "3:00 PM",
    duration: "30 min",
    status: "Scheduled",
    type: "Subject Selection",
    room: "Conference Room C",
  },
]

export function MeetingSchedulerAdmin() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing {meetings.length} scheduled meetings</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Filter by Status
          </Button>
          <Button variant="outline" size="sm">
            Filter by Teacher
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parent</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    {/*<AvatarImage src="/placeholder.svg" alt={meeting.parent} />*/}
                    <AvatarFallback>
                      {meeting.parent
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{meeting.parent}</div>
                </div>
              </TableCell>
              <TableCell>{meeting.teacher}</TableCell>
              <TableCell>{meeting.student}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span className="text-sm">{meeting.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    <span className="text-sm">{meeting.time}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{meeting.duration}</TableCell>
              <TableCell>{meeting.type}</TableCell>
              <TableCell>{meeting.room}</TableCell>
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
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
