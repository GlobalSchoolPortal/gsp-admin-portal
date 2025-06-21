import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"

const classes = [
  {
    id: 1,
    subject: "Mathematics",
    class: "10A",
    time: "09:00 AM",
    room: "Room 101",
    status: "upcoming",
  },
  {
    id: 2,
    subject: "Physics",
    class: "11B",
    time: "10:30 AM",
    room: "Lab 2",
    status: "upcoming",
  },
  {
    id: 3,
    subject: "Mathematics",
    class: "9A",
    time: "02:00 PM",
    room: "Room 101",
    status: "upcoming",
  },
]

export function UpcomingClasses() {
  return (
    <div className="space-y-3">
      {classes.map((cls) => (
        <Card key={cls.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{cls.subject}</h4>
                <p className="text-sm text-muted-foreground">Class {cls.class}</p>
              </div>
              <Badge variant="outline">{cls.status}</Badge>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {cls.time}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                {cls.room}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
