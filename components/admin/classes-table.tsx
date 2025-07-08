"use client"

import { useState } from "react"
import { Eye, Edit, Trash2, Plus, Users, BookOpen, Clock, Calendar, MapPin, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data
const classData = {
  "Class 10A": {
    id: "10A",
    teacher: "Dr. Sarah Wilson",
    room: "Room 101",
    totalStudents: 32,
    status: "Active",
    students: [
      {
        id: 1,
        name: "Alice Johnson",
        rollNo: "10A001",
        email: "alice@school.edu",
        phone: "+1234567890",
        attendance: "95%",
      },
      { id: 2, name: "Bob Smith", rollNo: "10A002", email: "bob@school.edu", phone: "+1234567891", attendance: "88%" },
      {
        id: 3,
        name: "Carol Davis",
        rollNo: "10A003",
        email: "carol@school.edu",
        phone: "+1234567892",
        attendance: "92%",
      },
      {
        id: 4,
        name: "David Wilson",
        rollNo: "10A004",
        email: "david@school.edu",
        phone: "+1234567893",
        attendance: "85%",
      },
      {
        id: 5,
        name: "Emma Brown",
        rollNo: "10A005",
        email: "emma@school.edu",
        phone: "+1234567894",
        attendance: "97%",
      },
    ],
    subjects: [
      { id: 1, name: "Mathematics", code: "MATH101", teacher: "Dr. Sarah Wilson", credits: 4, hours: 5 },
      { id: 2, name: "Physics", code: "PHY101", teacher: "Mr. Robert Lee", credits: 4, hours: 5 },
      { id: 3, name: "Chemistry", code: "CHEM101", teacher: "Ms. Lisa Wang", credits: 4, hours: 4 },
      { id: 4, name: "English", code: "ENG101", teacher: "Mrs. Mary Johnson", credits: 3, hours: 4 },
      { id: 5, name: "History", code: "HIST101", teacher: "Mr. James Miller", credits: 3, hours: 3 },
    ],
    teachers: [
      {
        id: 1,
        name: "Dr. Sarah Wilson",
        subject: "Mathematics",
        email: "sarah@school.edu",
        phone: "+1234567800",
        experience: "8 years",
      },
      {
        id: 2,
        name: "Mr. Robert Lee",
        subject: "Physics",
        email: "robert@school.edu",
        phone: "+1234567801",
        experience: "6 years",
      },
      {
        id: 3,
        name: "Ms. Lisa Wang",
        subject: "Chemistry",
        email: "lisa@school.edu",
        phone: "+1234567802",
        experience: "5 years",
      },
      {
        id: 4,
        name: "Mrs. Mary Johnson",
        subject: "English",
        email: "mary@school.edu",
        phone: "+1234567803",
        experience: "10 years",
      },
      {
        id: 5,
        name: "Mr. James Miller",
        subject: "History",
        email: "james@school.edu",
        phone: "+1234567804",
        experience: "7 years",
      },
    ],
    timetable: [
      {
        day: "Monday",
        periods: [
          { time: "9:00-10:00", subject: "Mathematics", teacher: "Dr. Sarah Wilson", room: "Room 101" },
          { time: "10:00-11:00", subject: "Physics", teacher: "Mr. Robert Lee", room: "Lab 1" },
          { time: "11:15-12:15", subject: "Chemistry", teacher: "Ms. Lisa Wang", room: "Lab 2" },
          { time: "12:15-1:15", subject: "English", teacher: "Mrs. Mary Johnson", room: "Room 101" },
          { time: "2:00-3:00", subject: "History", teacher: "Mr. James Miller", room: "Room 101" },
        ],
      },
      {
        day: "Tuesday",
        periods: [
          { time: "9:00-10:00", subject: "Physics", teacher: "Mr. Robert Lee", room: "Lab 1" },
          { time: "10:00-11:00", subject: "Mathematics", teacher: "Dr. Sarah Wilson", room: "Room 101" },
          { time: "11:15-12:15", subject: "English", teacher: "Mrs. Mary Johnson", room: "Room 101" },
          { time: "12:15-1:15", subject: "History", teacher: "Mr. James Miller", room: "Room 101" },
          { time: "2:00-3:00", subject: "Chemistry", teacher: "Ms. Lisa Wang", room: "Lab 2" },
        ],
      },
      {
        day: "Wednesday",
        periods: [
          { time: "9:00-10:00", subject: "Chemistry", teacher: "Ms. Lisa Wang", room: "Lab 2" },
          { time: "10:00-11:00", subject: "English", teacher: "Mrs. Mary Johnson", room: "Room 101" },
          { time: "11:15-12:15", subject: "Mathematics", teacher: "Dr. Sarah Wilson", room: "Room 101" },
          { time: "12:15-1:15", subject: "Physics", teacher: "Mr. Robert Lee", room: "Lab 1" },
          { time: "2:00-3:00", subject: "History", teacher: "Mr. James Miller", room: "Room 101" },
        ],
      },
    ],
    examSchedule: [
      {
        id: 1,
        subject: "Mathematics",
        date: "2024-03-15",
        time: "9:00 AM - 12:00 PM",
        duration: "3 hours",
        term: "Mid Term",
        room: "Hall A",
      },
      {
        id: 2,
        subject: "Physics",
        date: "2024-03-17",
        time: "9:00 AM - 12:00 PM",
        duration: "3 hours",
        term: "Mid Term",
        room: "Hall B",
      },
      {
        id: 3,
        subject: "Chemistry",
        date: "2024-03-19",
        time: "9:00 AM - 12:00 PM",
        duration: "3 hours",
        term: "Mid Term",
        room: "Hall A",
      },
      {
        id: 4,
        subject: "English",
        date: "2024-03-21",
        time: "9:00 AM - 11:00 AM",
        duration: "2 hours",
        term: "Mid Term",
        room: "Hall C",
      },
      {
        id: 5,
        subject: "History",
        date: "2024-03-23",
        time: "9:00 AM - 11:00 AM",
        duration: "2 hours",
        term: "Mid Term",
        room: "Hall C",
      },
    ],
    seatingPlan: {
      "Mid Term": [
        { rollNo: "10A001", name: "Alice Johnson", seat: "A1", hall: "Hall A" },
        { rollNo: "10A002", name: "Bob Smith", seat: "A2", hall: "Hall A" },
        { rollNo: "10A003", name: "Carol Davis", seat: "A3", hall: "Hall B" },
        { rollNo: "10A004", name: "David Wilson", seat: "A4", hall: "Hall B" },
        { rollNo: "10A005", name: "Emma Brown", seat: "A5", hall: "Hall C" },
      ],
      "Final Term": [
        { rollNo: "10A001", name: "Alice Johnson", seat: "B1", hall: "Hall A" },
        { rollNo: "10A002", name: "Bob Smith", seat: "B2", hall: "Hall A" },
        { rollNo: "10A003", name: "Carol Davis", seat: "B3", hall: "Hall B" },
        { rollNo: "10A004", name: "David Wilson", seat: "B4", hall: "Hall B" },
        { rollNo: "10A005", name: "Emma Brown", seat: "B5", hall: "Hall C" },
      ],
    },
  },
}

const classes = [
  {
    id: "Class 10A",
    teacher: "Dr. Sarah Wilson",
    students: 32,
    room: "Room 101",
    subjects: ["Math", "Physics", "+2"],
    status: "Active",
  },
  {
    id: "Class 10B",
    teacher: "Mr. John Davis",
    students: 28,
    room: "Room 102",
    subjects: ["Math", "Physics", "+2"],
    status: "Active",
  },
  {
    id: "Class 11A",
    teacher: "Ms. Emily Brown",
    students: 25,
    room: "Room 201",
    subjects: ["Advanced Math", "Physics", "+2"],
    status: "Active",
  },
]

export default function ClassManagement() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedTerm, setSelectedTerm] = useState("Mid Term")

  const handleViewClass = (classId: string) => {
    setSelectedClass(classId)
  }

  const currentClassData = selectedClass ? classData[selectedClass as keyof typeof classData] : null

  return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Class Management</h1>
            <p className="text-muted-foreground">Manage classes, assignments, and timetables</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Class
          </Button>
        </div>

        {/* Classes Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Classes</CardTitle>
            <CardDescription>View and manage class information</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Class Teacher</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">{classItem.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          {classItem.teacher}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {classItem.students}
                        </div>
                      </TableCell>
                      <TableCell>{classItem.room}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {classItem.subjects.slice(0, 2).map((subject, index) => (
                              <Badge key={index} variant="secondary">
                                {subject}
                              </Badge>
                          ))}
                          {classItem.subjects.length > 2 && <Badge variant="outline">{classItem.subjects[2]}</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{classItem.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleViewClass(classItem.id)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <BookOpen className="w-5 h-5" />
                                  {selectedClass} - Class Details
                                </DialogTitle>
                              </DialogHeader>

                              {currentClassData && (
                                  <Tabs defaultValue="students" className="w-full">
                                    <TabsList className="grid w-full grid-cols-6">
                                      <TabsTrigger value="students" className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Students
                                      </TabsTrigger>
                                      <TabsTrigger value="subjects" className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        Subjects
                                      </TabsTrigger>
                                      <TabsTrigger value="teachers" className="flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4" />
                                        Teachers
                                      </TabsTrigger>
                                      <TabsTrigger value="timetable" className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Timetable
                                      </TabsTrigger>
                                      <TabsTrigger value="exams" className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Exams
                                      </TabsTrigger>
                                      <TabsTrigger value="seating" className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Seating
                                      </TabsTrigger>
                                    </TabsList>

                                    {/* Students Tab */}
                                    <TabsContent value="students" className="space-y-4">
                                      <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">
                                          Students List ({currentClassData.totalStudents} students)
                                        </h3>
                                        <Button size="sm">
                                          <Plus className="w-4 h-4 mr-2" />
                                          Add Student
                                        </Button>
                                      </div>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Roll No</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Attendance</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {currentClassData.students.map((student) => (
                                              <TableRow key={student.id}>
                                                <TableCell className="font-medium">{student.rollNo}</TableCell>
                                                <TableCell>
                                                  <div className="flex items-center gap-2">
                                                    <Avatar className="w-8 h-8">
                                                      <AvatarImage
                                                          src={`/placeholder.svg?height=32&width=32&text=${student.name.charAt(0)}`}
                                                      />
                                                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    {student.name}
                                                  </div>
                                                </TableCell>
                                                <TableCell>{student.email}</TableCell>
                                                <TableCell>{student.phone}</TableCell>
                                                <TableCell>
                                                  <Badge
                                                      variant={
                                                        Number.parseInt(student.attendance) >= 90 ? "default" : "destructive"
                                                      }
                                                  >
                                                    {student.attendance}
                                                  </Badge>
                                                </TableCell>
                                              </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TabsContent>

                                    {/* Subjects Tab */}
                                    <TabsContent value="subjects" className="space-y-4">
                                      <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">
                                          Subjects ({currentClassData.subjects.length} subjects)
                                        </h3>
                                        <Button size="sm">
                                          <Plus className="w-4 h-4 mr-2" />
                                          Add Subject
                                        </Button>
                                      </div>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Subject Code</TableHead>
                                            <TableHead>Subject Name</TableHead>
                                            <TableHead>Teacher</TableHead>
                                            <TableHead>Credits</TableHead>
                                            <TableHead>Hours/Week</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {currentClassData.subjects.map((subject) => (
                                              <TableRow key={subject.id}>
                                                <TableCell className="font-medium">{subject.code}</TableCell>
                                                <TableCell>{subject.name}</TableCell>
                                                <TableCell>{subject.teacher}</TableCell>
                                                <TableCell>
                                                  <Badge variant="outline">{subject.credits}</Badge>
                                                </TableCell>
                                                <TableCell>{subject.hours}</TableCell>
                                              </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TabsContent>

                                    {/* Teachers Tab */}
                                    <TabsContent value="teachers" className="space-y-4">
                                      <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">
                                          Teachers ({currentClassData.teachers.length} teachers)
                                        </h3>
                                        <Button size="sm">
                                          <Plus className="w-4 h-4 mr-2" />
                                          Assign Teacher
                                        </Button>
                                      </div>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Experience</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {currentClassData.teachers.map((teacher) => (
                                              <TableRow key={teacher.id}>
                                                <TableCell>
                                                  <div className="flex items-center gap-2">
                                                    <Avatar className="w-8 h-8">
                                                      <AvatarImage
                                                          src={`/placeholder.svg?height=32&width=32&text=${teacher.name.charAt(0)}`}
                                                      />
                                                      <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                      <div className="font-medium">{teacher.name}</div>
                                                    </div>
                                                  </div>
                                                </TableCell>
                                                <TableCell>
                                                  <Badge>{teacher.subject}</Badge>
                                                </TableCell>
                                                <TableCell>{teacher.email}</TableCell>
                                                <TableCell>{teacher.phone}</TableCell>
                                                <TableCell>{teacher.experience}</TableCell>
                                              </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TabsContent>

                                    {/* Timetable Tab */}
                                    <TabsContent value="timetable" className="space-y-4">
                                      <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Weekly Timetable</h3>
                                        <Button size="sm">
                                          <Edit className="w-4 h-4 mr-2" />
                                          Edit Timetable
                                        </Button>
                                      </div>
                                      <div className="space-y-4">
                                        {currentClassData.timetable.map((day) => (
                                            <Card key={day.day}>
                                              <CardHeader className="pb-3">
                                                <CardTitle className="text-base">{day.day}</CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                <div className="grid gap-2">
                                                  {day.periods.map((period, index) => (
                                                      <div
                                                          key={index}
                                                          className="flex items-center justify-between p-2 bg-muted/50 rounded"
                                                      >
                                                        <div className="flex items-center gap-4">
                                                          <Badge variant="outline">{period.time}</Badge>
                                                          <span className="font-medium">{period.subject}</span>
                                                          <span className="text-sm text-muted-foreground">{period.teacher}</span>
                                                        </div>
                                                        <Badge variant="secondary">{period.room}</Badge>
                                                      </div>
                                                  ))}
                                                </div>
                                              </CardContent>
                                            </Card>
                                        ))}
                                      </div>
                                    </TabsContent>

                                    {/* Exams Tab */}
                                    <TabsContent value="exams" className="space-y-4">
                                      <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Exam Schedule</h3>
                                        <Button size="sm">
                                          <Plus className="w-4 h-4 mr-2" />
                                          Add Exam
                                        </Button>
                                      </div>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Duration</TableHead>
                                            <TableHead>Term</TableHead>
                                            <TableHead>Room</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {currentClassData.examSchedule.map((exam) => (
                                              <TableRow key={exam.id}>
                                                <TableCell className="font-medium">{exam.subject}</TableCell>
                                                <TableCell>{exam.date}</TableCell>
                                                <TableCell>{exam.time}</TableCell>
                                                <TableCell>{exam.duration}</TableCell>
                                                <TableCell>
                                                  <Badge variant={exam.term === "Mid Term" ? "default" : "secondary"}>
                                                    {exam.term}
                                                  </Badge>
                                                </TableCell>
                                                <TableCell>{exam.room}</TableCell>
                                              </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TabsContent>

                                    {/* Seating Plan Tab */}
                                    <TabsContent value="seating" className="space-y-4">
                                      <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">Exam Seating Plan</h3>
                                        <div className="flex gap-2">
                                          <Button
                                              variant={selectedTerm === "Mid Term" ? "default" : "outline"}
                                              size="sm"
                                              onClick={() => setSelectedTerm("Mid Term")}
                                          >
                                            Mid Term
                                          </Button>
                                          <Button
                                              variant={selectedTerm === "Final Term" ? "default" : "outline"}
                                              size="sm"
                                              onClick={() => setSelectedTerm("Final Term")}
                                          >
                                            Final Term
                                          </Button>
                                        </div>
                                      </div>
                                      <Table>
                                        <TableHeader>
                                          <TableRow>
                                            <TableHead>Roll No</TableHead>
                                            <TableHead>Student Name</TableHead>
                                            <TableHead>Seat Number</TableHead>
                                            <TableHead>Exam Hall</TableHead>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {currentClassData.seatingPlan[
                                              selectedTerm as keyof typeof currentClassData.seatingPlan
                                              ].map((seat) => (
                                              <TableRow key={seat.rollNo}>
                                                <TableCell className="font-medium">{seat.rollNo}</TableCell>
                                                <TableCell>{seat.name}</TableCell>
                                                <TableCell>
                                                  <Badge variant="outline">{seat.seat}</Badge>
                                                </TableCell>
                                                <TableCell>{seat.hall}</TableCell>
                                              </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TabsContent>
                                  </Tabs>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  )
}
