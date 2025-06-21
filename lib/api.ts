const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
const API_BASE_URL_DEV = "http://localhost:8081"

// Base API Response interface
interface BaseApiResponse {
  message?: string
  success: boolean
}

// Paginated API Response interface
interface PaginatedApiResponse<T> extends BaseApiResponse {
  content: T[]
  pageable: {
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  empty: boolean
  number: number
  numberOfElements: number
  size: number
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
}

// Simple API Response interface (for single objects)
interface SimpleApiResponse<T> extends BaseApiResponse {
  content: T
}

// Union type for API responses
type ApiResponse<T> = PaginatedApiResponse<T> | SimpleApiResponse<T>

class ApiClient {
  private baseURL: string
  private orgId: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  setOrgId(orgId: string) {
    this.orgId = orgId
    if (typeof window !== "undefined") {
      sessionStorage.setItem("orgId", orgId)
    }
  }

  getOrgId(): string | null {
    if (this.orgId) return this.orgId
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("orgId")
    }
    return null
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    // Fix: Use baseURL + endpoint for full URL
    const url = `${this.baseURL}${endpoint}`
    const orgId = this.getOrgId()

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (orgId) {
      headers["X-Org-Id"] = orgId
    }

    const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    try {
      console.log("API request:", url, options)
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Auth APIs
  async getOrganisations(params?: { page?: number; size?: number }): Promise<PaginatedApiResponse<any>> {
    const queryParams = new URLSearchParams()
    queryParams.append("page", (params?.page ?? 0).toString())
    queryParams.append("size", (params?.size ?? 10).toString())

    const query = queryParams.toString()
    // Fix: Use different base URL for organizations
    const url = `${API_BASE_URL}/organisation/get-all?${query}`

    const orgId = this.getOrgId()
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (orgId) {
      headers["X-Org-Id"] = orgId
    }

    const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, { headers })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  async login(credentials: { email: string; password: string; type: string }, orgId: string): Promise<SimpleApiResponse<any>> {
    // Fix: Use different base URL for login
    const url = `${API_BASE_URL_DEV}/auth/login`

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Org-Id": orgId,
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Login request failed:", error)
      throw error
    }
  }

  async logout(): Promise<SimpleApiResponse<any>> {
    return this.request("/auth/logout", {
      method: "POST",
    }) as Promise<SimpleApiResponse<any>>
  }

  // Student APIs
  async getStudents(params?: { page?: number; size?: number; search?: string }): Promise<PaginatedApiResponse<any>> {
    const queryParams = new URLSearchParams()
    if (params?.page !== undefined) queryParams.append("page", params.page.toString())
    if (params?.size !== undefined) queryParams.append("size", params.size.toString())
    if (params?.search) queryParams.append("search", params.search)

    const query = queryParams.toString()
    return this.request(`/students${query ? `?${query}` : ""}`) as Promise<PaginatedApiResponse<any>>
  }

  async createStudent(student: any): Promise<SimpleApiResponse<any>> {
    return this.request("/students", {
      method: "POST",
      body: JSON.stringify(student),
    }) as Promise<SimpleApiResponse<any>>
  }

  async updateStudent(id: string, student: any): Promise<SimpleApiResponse<any>> {
    return this.request(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(student),
    }) as Promise<SimpleApiResponse<any>>
  }

  async deleteStudent(id: string): Promise<SimpleApiResponse<any>> {
    return this.request(`/students/${id}`, {
      method: "DELETE",
    }) as Promise<SimpleApiResponse<any>>
  }

  // Teacher APIs
  async getTeachers(params?: { page?: number; size?: number; search?: string }): Promise<PaginatedApiResponse<any>> {
    const queryParams = new URLSearchParams()
    if (params?.page !== undefined) queryParams.append("page", params.page.toString())
    if (params?.size !== undefined) queryParams.append("size", params.size.toString())
    if (params?.search) queryParams.append("search", params.search)

    const query = queryParams.toString()
    return this.request(`/teachers${query ? `?${query}` : ""}`) as Promise<PaginatedApiResponse<any>>
  }

  async createTeacher(teacher: any): Promise<SimpleApiResponse<any>> {
    return this.request("/teachers", {
      method: "POST",
      body: JSON.stringify(teacher),
    }) as Promise<SimpleApiResponse<any>>
  }

  async updateTeacher(id: string, teacher: any): Promise<SimpleApiResponse<any>> {
    return this.request(`/teachers/${id}`, {
      method: "PUT",
      body: JSON.stringify(teacher),
    }) as Promise<SimpleApiResponse<any>>
  }

  async deleteTeacher(id: string): Promise<SimpleApiResponse<any>> {
    return this.request(`/teachers/${id}`, {
      method: "DELETE",
    }) as Promise<SimpleApiResponse<any>>
  }

  // Parent APIs
  async getParents(params?: { page?: number; size?: number; search?: string }): Promise<PaginatedApiResponse<any>> {
    const queryParams = new URLSearchParams()
    if (params?.page !== undefined) queryParams.append("page", params.page.toString())
    if (params?.size !== undefined) queryParams.append("size", params.size.toString())
    if (params?.search) queryParams.append("search", params.search)

    const query = queryParams.toString()
    return this.request(`/parents${query ? `?${query}` : ""}`) as Promise<PaginatedApiResponse<any>>
  }

  async createParent(parent: any): Promise<SimpleApiResponse<any>> {
    return this.request("/parents", {
      method: "POST",
      body: JSON.stringify(parent),
    }) as Promise<SimpleApiResponse<any>>
  }

  // Class APIs
  async getClasses(): Promise<PaginatedApiResponse<any>> {
    return this.request("/classes") as Promise<PaginatedApiResponse<any>>
  }

  async createClass(classData: any): Promise<SimpleApiResponse<any>> {
    return this.request("/classes", {
      method: "POST",
      body: JSON.stringify(classData),
    }) as Promise<SimpleApiResponse<any>>
  }

  // Attendance APIs
  async getAttendance(params?: { classId?: string; date?: string }): Promise<PaginatedApiResponse<any>> {
    const queryParams = new URLSearchParams()
    if (params?.classId) queryParams.append("classId", params.classId)
    if (params?.date) queryParams.append("date", params.date)

    const query = queryParams.toString()
    return this.request(`/attendance${query ? `?${query}` : ""}`) as Promise<PaginatedApiResponse<any>>
  }

  async markAttendance(attendanceData: any): Promise<SimpleApiResponse<any>> {
    return this.request("/attendance", {
      method: "POST",
      body: JSON.stringify(attendanceData),
    }) as Promise<SimpleApiResponse<any>>
  }

  // Report Card APIs
  async getReportCards(params?: { studentId?: string; term?: string }): Promise<PaginatedApiResponse<any>> {
    const queryParams = new URLSearchParams()
    if (params?.studentId) queryParams.append("studentId", params.studentId)
    if (params?.term) queryParams.append("term", params.term)

    const query = queryParams.toString()
    return this.request(`/report-cards${query ? `?${query}` : ""}`) as Promise<PaginatedApiResponse<any>>
  }

  async generateReportCard(reportData: any): Promise<SimpleApiResponse<any>> {
    return this.request("/report-cards", {
      method: "POST",
      body: JSON.stringify(reportData),
    }) as Promise<SimpleApiResponse<any>>
  }

  // Meeting APIs
  async getMeetings(params?: { teacherId?: string; parentId?: string }): Promise<PaginatedApiResponse<any>> {
    const queryParams = new URLSearchParams()
    if (params?.teacherId) queryParams.append("teacherId", params.teacherId)
    if (params?.parentId) queryParams.append("parentId", params.parentId)

    const query = queryParams.toString()
    return this.request(`/meetings${query ? `?${query}` : ""}`) as Promise<PaginatedApiResponse<any>>
  }

  async scheduleMeeting(meetingData: any): Promise<SimpleApiResponse<any>> {
    return this.request("/meetings", {
      method: "POST",
      body: JSON.stringify(meetingData),
    }) as Promise<SimpleApiResponse<any>>
  }

  // Dashboard APIs
  async getDashboardStats(): Promise<SimpleApiResponse<any>> {
    return this.request("/dashboard/stats") as Promise<SimpleApiResponse<any>>
  }

  async getAcademicReports(): Promise<SimpleApiResponse<any>> {
    return this.request("/reports/academic") as Promise<SimpleApiResponse<any>>
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export default apiClient