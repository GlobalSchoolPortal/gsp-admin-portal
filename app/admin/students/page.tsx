import StudentsTableWrapper from "@/components/admin/students-table-wrapper"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import apiClient from "@/lib/api"
import type { Student } from "@/components/admin/students-table"
import { cookies } from "next/headers"

interface SearchParams {
  page?: string
}

function isPaginatedResponse(resp: any): resp is { content: Student[]; totalPages: number } {
  return resp && Array.isArray(resp.content) && typeof resp.totalPages === "number"
}

export default async function StudentsPage(props: { searchParams?: SearchParams }) {
  // Get current page from query param, default to 1
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1
  const pageSize = 10

  // Read token from cookies (HttpOnly cookie)
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Fetch students from the API (server-side)
  const response = await apiClient.getStudents(
    { academicYear: "2023-2024" },
    { page: currentPage - 1, size: pageSize },
    token // pass token for Authorization header
  )
  const students = isPaginatedResponse(response) ? (response.content as Student[]) : []
  const totalPages = isPaginatedResponse(response) ? response.totalPages : 1

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">Manage all student records and information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>View and manage student records</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentsTableWrapper
            students={students}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </CardContent>
      </Card>
    </div>
  )
}
