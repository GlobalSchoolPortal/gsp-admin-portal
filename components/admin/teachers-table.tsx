"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Eye, Phone, Mail, BookOpen, GraduationCap } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { useState } from "react"

export interface Subject {
  id: string
  name: string
  code: string
  description: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Classroom {
  id: string
  code: string
  name: string
  section: string
  description: string
  active: boolean
  roomCapacity: number
  createdAt: string
  updatedAt: string
}

export interface Teacher {
  id: string
  empCode: string
  name: string
  email: string
  subjects: Subject[]
  classrooms: Classroom[]
  status: string
}

interface TeachersTableProps {
  teachers: Teacher[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  loading?: boolean
}

export function TeachersTable({ teachers, currentPage, totalPages, onPageChange, loading = false }: TeachersTableProps) {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Employee Code</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead>Classes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell>
            </TableRow>
          ) : teachers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No teachers found.</TableCell>
            </TableRow>
          ) : (
            teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={teacher.name} />
                      <AvatarFallback>
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {teacher.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {teacher.empCode}
                  </Badge>
                </TableCell>
                <TableCell>
                  {teacher.subjects && teacher.subjects.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject) => (
                        <Badge key={subject.id} variant="outline" className="text-xs">
                          <BookOpen className="mr-1 h-3 w-3" />
                          {subject.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {teacher.classrooms && teacher.classrooms.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {teacher.classrooms.map((classroom) => (
                        <Badge key={classroom.id} variant="secondary" className="text-xs">
                          <GraduationCap className="mr-1 h-3 w-3" />
                          {classroom.code}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={teacher.status === "PRESENT" ? "default" : "secondary"}
                    className={teacher.status === "PRESENT" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {teacher.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
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
            ))
          )}
        </TableBody>
      </Table>
      
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
              <span className="sr-only">First</span>
              &laquo;
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
            const pageLinks = []
            const pageWindow = 2
            const startPage = Math.max(1, currentPage - pageWindow)
            const endPage = Math.min(totalPages, currentPage + pageWindow)
            // Always show first page
            pageLinks.push(
              <PaginationItem key={1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 1}
                  onClick={e => {
                    e.preventDefault()
                    onPageChange(1)
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )
            if (startPage > 2) {
              pageLinks.push(
                <PaginationItem key="start-ellipsis">
                  <span className="px-2 text-muted-foreground">...</span>
                </PaginationItem>
              )
            }
            for (let i = startPage; i <= endPage; i++) {
              if (i === 1 || i === totalPages) continue
              pageLinks.push(
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i}
                    onClick={e => {
                      e.preventDefault()
                      onPageChange(i)
                    }}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>
              )
            }
            if (endPage < totalPages - 1) {
              pageLinks.push(
                <PaginationItem key="end-ellipsis">
                  <span className="px-2 text-muted-foreground">...</span>
                </PaginationItem>
              )
            }
            if (totalPages > 1) {
              pageLinks.push(
                <PaginationItem key={totalPages}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === totalPages}
                    onClick={e => {
                      e.preventDefault()
                      onPageChange(totalPages)
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )
            }
            return pageLinks
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
              <span className="sr-only">Last</span>
              &raquo;
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
