const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://8bfb-202-173-125-60.ngrok-free.app"

interface BaseApiResponse {
  message?: string
  success: boolean
}

// Add StudentFilter interface
export enum ActiveStatus {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

interface StudentFilter {
  search?: string
  classroomId?: string
  status?: ActiveStatus
  academicYear: string
}

interface PaginatedApiResponse<T> extends BaseApiResponse {
  content: T[]
  pageable: {
    sort: { empty: boolean; unsorted: boolean; sorted: boolean }
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
  sort: { empty: boolean; unsorted: boolean; sorted: boolean }
}

interface SimpleApiResponse<T> extends BaseApiResponse {
  content: T
}

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

  private async request<T>(endpoint: string, options: RequestInit = {}, token?: string): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const orgId = this.getOrgId()

    // Use Record<string, string> for headers to allow custom keys
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }
    headers["ngrok-skip-browser-warning"] = "true"

    if (orgId) {
      headers["X-Org-Id"] = orgId
    }

    // Use provided token (from server/cookies) or fallback to sessionStorage (client)
    const authToken = token || (typeof window !== "undefined" ? sessionStorage.getItem("token") : null)
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    try {
      console.log("🌐 API request:", url, { method: options.method || "GET" })

      const response = await fetch(url, {
        ...options,
        headers,
      })

      console.log("📡 API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ API error response:", errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ API response data:", data)
      return data
    } catch (error) {
      console.error("❌ API request failed:", error)
      throw error
    }
  }

  async getOrganisations(params?: { page?: number; size?: number }): Promise<PaginatedApiResponse<any>> {
    const queryParams = new URLSearchParams()
    queryParams.append("page", (params?.page ?? 0).toString())
    queryParams.append("size", (params?.size ?? 10).toString())

    const query = queryParams.toString()
    const url = `${API_BASE_URL}/organisation/get-all?${query}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    }

    try {
      console.log("🏢 Fetching organisations from:", url)
      console.log("URL:", url)
      const response = await fetch(url, { headers })

      console.log("RESPONSE:", response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("✅ Organisations data:", data)
      return data
    } catch (error) {
      console.error("❌ Get organisations failed:", error)
      throw error
    }
  }

  async login(
      credentials: { email: string; password: string; type: string },
      orgId: string,
  ): Promise<SimpleApiResponse<any>> {
    const url = `${API_BASE_URL}/auth/login`

    try {
      console.log("🔐 Login request to:", url, { email: credentials.email, type: credentials.type })

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Org-Id": orgId,
        },
        body: JSON.stringify(credentials),
      })

      console.log("📡 Login response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Login error response:", errorText)
        throw new Error(`Login failed: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("✅ Login response data:", data)
      return data
    } catch (error) {
      console.error("❌ Login request failed:", error)
      throw error
    }
  }

  async logout(): Promise<SimpleApiResponse<any>> {
    return this.request("/auth/logout", {
      method: "POST",
    }) as Promise<SimpleApiResponse<any>>
  }

  // Dashboard APIs
  async getDashboardStats(): Promise<SimpleApiResponse<any>> {
    return this.request("/dashboard/stats") as Promise<SimpleApiResponse<any>>
  }


  async getStudents(
    filter: StudentFilter,
    params?: { page?: number; size?: number },
    token?: string
  ) {
    const queryParams = new URLSearchParams();
    queryParams.append("page", (params?.page ?? 0).toString());
    queryParams.append("size", (params?.size ?? 10).toString());

    const query = queryParams.toString();
    const url = `${this.baseURL}/student/get-all-by-filter?${query}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };
    const orgId = this.getOrgId();
    if (orgId) headers["X-Org-Id"] = orgId;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        search: filter.search,
        classroomId: filter.classroomId,
        status: filter.status,
        academicYear: filter.academicYear,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return await response.json();
  }

  // Add other methods as needed...

  // Add public method for parent by id
  async getParentById(id: string, token?: string) {
    const url = `${this.baseURL}/parent/get-by-id?id=${id}`;
    const orgId = this.getOrgId();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };
    if (orgId) headers["X-Org-Id"] = orgId;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Add public method for classroom by student id and academic year
  async getClassroomByStudentId(studentId: string, academicYear: string, token?: string) {
    const url = `${this.baseURL}/classroom/get-by-student-id?studentId=${studentId}&academicYear=${academicYear}`;
    const orgId = this.getOrgId();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };
    if (orgId) headers["X-Org-Id"] = orgId;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Replace teacher endpoint with student/get-by-id-academic-year
  async getStudentByIdAcademicYear(studentId: string, academicYear: string, token?: string) {
    const url = `${this.baseURL}/student/get-by-id-academic-year?id=${studentId}&academicYear=${academicYear}`;
    const orgId = this.getOrgId();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };
    if (orgId) headers["X-Org-Id"] = orgId;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      console.log('API result for student/get-by-id-academic-year:', data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Add public method for parents by student id
  async getParentsByStudentId(studentId: string, academicYear: string, token?: string) {
    const url = `${this.baseURL}/parent/get-by-student-id-and-academic-year?studentId=${studentId}&academicYear=${academicYear}`;
    const orgId = this.getOrgId();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };
    if (orgId) headers["X-Org-Id"] = orgId;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Add public method for classroom subjects by classroomId and academicYear
  async getClassroomSubjects(classroomId: string, academicYear: string, token?: string) {
    const url = `${this.baseURL}/classroom/${classroomId}/subjects?academicYear=${academicYear}&activeOnly=true`;
    const orgId = this.getOrgId();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };
    if (orgId) headers["X-Org-Id"] = orgId;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getParents(
    params?: { page?: number; size?: number; search?: string; academicYear: string },
    token?: string
  ) {
    const queryParams = new URLSearchParams();
    queryParams.append("page", (params?.page ?? 0).toString());
    queryParams.append("size", (params?.size ?? 10).toString());
    if (params?.search) queryParams.append("search", params.search);

    const query = queryParams.toString();
    const url = `${this.baseURL}/parent/get-all?${query}&&academicYear=${params?.academicYear}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };
    const orgId = this.getOrgId();
    if (orgId) headers["X-Org-Id"] = orgId;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return await response.json();
  }

  async getTeachers(
    params?: { page?: number; size?: number; search?: string; academicYear?: string },
    token?: string
  ) {
    const queryParams = new URLSearchParams();
    queryParams.append("page", (params?.page ?? 0).toString());
    queryParams.append("size", (params?.size ?? 10).toString());

    const query = queryParams.toString();
    const url = `${this.baseURL}/teacher/get-all-by-filter?${query}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };
    const orgId = this.getOrgId();
    if (orgId) headers["X-Org-Id"] = orgId;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        search: params?.search || null,
        classroomIds: null, // Can be updated later if needed
        status: "ALL",
        academicYear: params?.academicYear || "2023-2024",
        subjectIds: null, // Can be updated later if needed
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return await response.json();
  }
}


export const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
