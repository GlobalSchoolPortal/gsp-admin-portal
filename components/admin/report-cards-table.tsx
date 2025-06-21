"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Edit, Send } from "lucide-react"

const reportCards = [
  {
    id: "1",
    student: "Alice Johnson",
    class: "10A",
    term: "Term 1 2024",
    totalMarks: 450,
    maxMarks: 500,
    percentage: 90,
    grade: "A+",
    status: "Generated",
    date: "2024-01-15",
  },
  {
    id: "2",
    student: "Bob Smith",
    class: "10B",
    term: "Term 1 2024",
    totalMarks: 380,
    maxMarks: 500,
    percentage: 76,
    grade: "B+",
    status: "Generated",
    date: "2024-01-15",
  },
  {
    id: "3",
    student: "Carol Davis",
    class: "9A",
    term: "Term 1 2024",
    totalMarks: 420,
    maxMarks: 500,
    percentage: 84,
    grade: "A",
    status: "Pending",
    date: "2024-01-15",
  },
  {
    id: "4",
    student: "David Wilson",
    class: "11A",
    term: "Term 1 2024",
    totalMarks: 465,
    maxMarks: 500,
    percentage: 93,
    grade: "A+",
    status: "Generated",
    date: "2024-01-15",
  },
]

export function ReportCardsTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing {reportCards.length} report cards</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Filter by Class
          </Button>
          <Button variant="outline" size="sm">
            Filter by Status
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Marks</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reportCards.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.student}</TableCell>
              <TableCell>{report.class}</TableCell>
              <TableCell>{report.term}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>
                    {report.totalMarks}/{report.maxMarks}
                  </div>
                  <div className="text-sm text-muted-foreground">{report.percentage}%</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={report.grade.startsWith("A") ? "default" : "secondary"}>{report.grade}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={report.status === "Generated" ? "default" : "secondary"}>{report.status}</Badge>
              </TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Send className="h-4 w-4" />
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
