"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Eye, Phone, Mail } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import dynamic from "next/dynamic"
import { useState } from "react"

interface Student {
  id: string
  name: string
  registrationNumber: string
}

export interface Parent {
  id: string
  name: string
  phoneNumber: string
  email: string
  occupation?: string
  relationshipType?: string
  students: Student[]
}

interface ParentsTableProps {
  parents: Parent[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  loading: boolean
}

// Dynamically import the ParentProfileDialog (to be created)
const ParentProfileDialog = dynamic(() => import("./parent-profile-dialog").then(mod => mod.ParentProfileDialog), { ssr: false })

export function ParentsTable({ parents, currentPage, totalPages, onPageChange, loading }: ParentsTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null)

  const handleView = (parent: Parent) => {
    setSelectedParent(parent)
    setDialogOpen(true)
  }

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) setSelectedParent(null)
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parent</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Relationship</TableHead>
            <TableHead>Children</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</TableCell>
            </TableRow>
          ) : parents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No parents found.</TableCell>
            </TableRow>
          ) : (
            parents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={"/placeholder.svg"} alt={parent.name} />
                      <AvatarFallback>
                        {parent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{parent.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {parent.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Phone className="mr-1 h-3 w-3" />
                    {parent.phoneNumber}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{parent.relationshipType || "-"}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {parent.students.map((student) => (
                      <Badge key={student.id} variant="secondary">
                        {student.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleView(parent)}>
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
            if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                pageLinks.push(
                  <PaginationItem key="end-ellipsis">
                    <span className="px-2 text-muted-foreground">...</span>
                  </PaginationItem>
                )
              }
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
      {/* Parent Profile Dialog */}
      {selectedParent && (
        <ParentProfileDialog
          parent={selectedParent}
          open={dialogOpen}
          onOpenChange={handleDialogChange}
        />
      )}
    </div>
  )
}
