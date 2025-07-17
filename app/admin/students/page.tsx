import StudentsTableWrapper from "@/components/admin/students-table-wrapper"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import apiClient from "@/lib/api"
import type { Student } from "@/components/admin/students-table"
import { cookies } from "next/headers"
import { Suspense } from "react"

interface SearchParams {
  page?: string
  search?: string
  year?: string
}

// Function to get current academic year - memoized
const getCurrentAcademicYear = () => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // January is 0
  
  // Academic year starts in July
  // If we're in or after July, we're in currentYear-nextYear academic year
  // If we're before July, we're in previousYear-currentYear academic year
  const academicStartYear = currentMonth >= 7 ? currentYear : currentYear - 1
  const academicEndYear = academicStartYear + 1
  
  return `${academicStartYear}-${academicEndYear}`
}

function isPaginatedResponse(resp: any): resp is { content: Student[]; totalPages: number } {
  return resp && Array.isArray(resp.content) && typeof resp.totalPages === "number"
}

// Loading component for better UX
function StudentsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-muted animate-pulse rounded" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded" />
        ))}
      </div>
    </div>
  )
}

export default async function StudentsPage(props: { searchParams?: SearchParams }) {
  // Fix: await searchParams
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1
  const searchTerm = searchParams?.search || ""
  const selectedYear = searchParams?.year || getCurrentAcademicYear()
  const pageSize = 10

  // Read token from cookies (HttpOnly cookie)
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
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
        <div className="text-center py-8 text-muted-foreground">
          Authentication required. Please log in.
        </div>
      </div>
    )
  }

  try {
    // Fetch students from the API (server-side) with search and year filter
    const response = await apiClient.getStudents(
      { 
        academicYear: selectedYear,
        search: searchTerm 
      },
      { page: currentPage - 1, size: pageSize },
      token
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

        <Suspense fallback={<StudentsTableSkeleton />}>
          <StudentsTableWrapper
            students={students}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error("❌ Failed to fetch students:", error)
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
        <div className="text-center py-8 text-muted-foreground">
          Failed to load students. Please try again later.
        </div>
      </div>
    )
  }
}
