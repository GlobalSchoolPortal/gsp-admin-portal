"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Eye, Phone, Mail } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"
import { PaginationWithNumbers } from "@/components/ui/pagination-with-numbers"

interface Student {
  id: string
  name: string
  registrationNumber: string
  classroom: {
    code: string
    name: string
    section: string
  }
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
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
                    <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                    <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                    <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                  </div>
                </TableCell>
              </TableRow>
            ))
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
                      {/*<AvatarImage src={"/placeholder.svg"} alt={parent.name} />*/}
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

      <PaginationWithNumbers
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showPagination={!loading && parents.length > 0}
      />

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
