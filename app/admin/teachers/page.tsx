import TeachersTableWrapper from "@/components/admin/teachers-table-wrapper"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import apiClient from "@/lib/api"
import type { Teacher } from "@/components/admin/teachers-table"
import { cookies } from "next/headers"
import { Suspense } from "react"

interface SearchParams {
  page?: string
  search?: string
  year?: string
}

// Function to get current academic year
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

function isPaginatedResponse(resp: any): resp is { content: Teacher[]; totalPages: number } {
  return resp && Array.isArray(resp.content) && typeof resp.totalPages === "number"
}

// Loading component for better UX
function TeachersTableSkeleton() {
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

export default async function TeachersPage(props: { searchParams?: SearchParams }) {
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
            <h1 className="text-3xl font-bold">Teacher Management</h1>
            <p className="text-muted-foreground">Manage teacher profiles and assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
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
    // Log the API request parameters
    console.log("🔍 Teachers API Request:", {
      page: currentPage - 1,
      size: pageSize,
      search: searchTerm,
      academicYear: selectedYear,
      token: token ? "present" : "missing"
    })

    // Fetch teachers from the API (server-side) with search and year filter
    const response = await apiClient.getTeachers(
      { 
        page: currentPage - 1, 
        size: pageSize, 
        search: searchTerm,
        academicYear: selectedYear
      },
      token
    )

    // Log the API response
    console.log("📊 Teachers API Response:", {
      success: response?.success,
      totalElements: response?.totalElements,
      totalPages: response?.totalPages,
      currentPage: response?.number,
      teachersCount: response?.content?.length || 0,
      hasContent: !!response?.content,
      responseType: isPaginatedResponse(response) ? "paginated" : "simple",
      sampleTeacher: response?.content?.[0] ? {
        id: response.content[0].id,
        empCode: response.content[0].empCode,
        name: response.content[0].name,
        subjectsCount: response.content[0].subjects?.length || 0,
        classroomsCount: response.content[0].classrooms?.length || 0,
        status: response.content[0].status
      } : null
    })

    const teachers = isPaginatedResponse(response) ? (response.content as Teacher[]) : []
    const totalPages = isPaginatedResponse(response) ? response.totalPages : 1

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Teacher Management</h1>
            <p className="text-muted-foreground">Manage teacher profiles and assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </div>
        </div>

        <Suspense fallback={<TeachersTableSkeleton />}>
          <TeachersTableWrapper
            teachers={teachers}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error("❌ Failed to fetch teachers:", error)
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Teacher Management</h1>
            <p className="text-muted-foreground">Manage teacher profiles and assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </div>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          Failed to load teachers. Please try again later.
        </div>
      </div>
    )
  }
}
