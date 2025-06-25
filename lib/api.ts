const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://675f-192-140-152-217.ngrok-free.app"

interface BaseApiResponse {
  message?: string
  success: boolean
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

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const orgId = this.getOrgId()

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }
    headers["ngrok-skip-browser-warning"] = "true"


    if (orgId) {
      headers["X-Org-Id"] = orgId
    }

    const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
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

  // Add other methods as needed...
}

export const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
