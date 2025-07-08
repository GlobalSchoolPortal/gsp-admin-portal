import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { useState } from "react";
import dynamic from "next/dynamic";

export interface Student {
  id: string
  name: string
  email: string
  registrationNumber: string
  classroom: {
    code: string
    name: string
    section: string
  }
  active: boolean
}

interface StudentsTableProps {
  students: Student[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const StudentProfileDialog = dynamic(() => import("./student-profile-dialog").then(mod => mod.StudentProfileDialog), { ssr: false });

export function StudentsTable({ students, currentPage, totalPages, onPageChange }: StudentsTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setSelectedStudent(null);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Registration No.</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={"/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{student.classroom?.code || "-"}</TableCell>
              <TableCell>{student.registrationNumber}</TableCell>
              <TableCell>
                <Badge variant={student.active ? "default" : "secondary"}>{student.active ? "Active" : "Inactive"}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleView(student)}>
                    <Eye className="h-4 w-4" />
                  </Button>
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
      {students.length === 0 && <div className="text-center py-8 text-muted-foreground">No students found.</div>}
      <Pagination className="mt-4 flex justify-end">
        <PaginationContent>
          {/* First Page Button */}
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-label="Go to first page"
              size="default"
              onClick={e => {
                e.preventDefault()
                if (currentPage !== 1) onPageChange(1)
              }}
              aria-disabled={currentPage === 1}
              className="gap-1 px-2 border bg-background hover:bg-muted"
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">First</span>
            </PaginationLink>
          </PaginationItem>
          {/* Previous Page Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              aria-disabled={currentPage === 1}
              className="border bg-background hover:bg-muted"
            />
          </PaginationItem>
          {/* Page Numbers with Ellipsis */}
          {(() => {
            const pageLinks = [];
            const pageWindow = 2; // show 2 neighbors on each side
            const startPage = Math.max(1, currentPage - pageWindow);
            const endPage = Math.min(totalPages, currentPage + pageWindow);
            // Always show first page
            pageLinks.push(
              <PaginationItem key={1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 1}
                  onClick={e => {
                    e.preventDefault();
                    onPageChange(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            );
            if (startPage > 2) {
              pageLinks.push(
                <PaginationItem key="start-ellipsis">
                  <span className="px-2 text-muted-foreground">...</span>
                </PaginationItem>
              );
            }
            // Middle page numbers
            for (let i = startPage; i <= endPage; i++) {
              if (i === 1 || i === totalPages) continue; // already handled
              pageLinks.push(
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i}
                    onClick={e => {
                      e.preventDefault();
                      onPageChange(i);
                    }}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            // Always show last page
            if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                pageLinks.push(
                  <PaginationItem key="end-ellipsis">
                    <span className="px-2 text-muted-foreground">...</span>
                  </PaginationItem>
                );
              }
              pageLinks.push(
                <PaginationItem key={totalPages}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === totalPages}
                    onClick={e => {
                      e.preventDefault();
                      onPageChange(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return pageLinks;
          })()}
          {/* Next Page Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={e => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              aria-disabled={currentPage === totalPages}
              className="border bg-background hover:bg-muted"
            />
          </PaginationItem>
          {/* Last Page Button */}
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-label="Go to last page"
              size="default"
              onClick={e => {
                e.preventDefault()
                if (currentPage !== totalPages) onPageChange(totalPages)
              }}
              aria-disabled={currentPage === totalPages}
              className="gap-1 px-2 border bg-background hover:bg-muted"
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Last</span>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {selectedStudent && (
        <StudentProfileDialog
          student={selectedStudent}
          open={dialogOpen}
          onOpenChange={handleDialogChange}
        />
      )}
    </div>
  )
}
