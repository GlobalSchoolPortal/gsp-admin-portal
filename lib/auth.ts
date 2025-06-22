import apiClient from "./api"

export interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT"
  orgId: string
  avatar?: string
  phoneNumber?: string
}

export enum Affiliation {
  CBSE = "CBSE",
  ICSE = "ICSE",
  STATE_BOARD = "STATE_BOARD",
  IB = "IB",
  IGCSE = "IGCSE",
  NIOS = "NIOS",
}

export enum OrganisationStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum OrganisationType {
  SCHOOL = "SCHOOL",
  COLLEGE = "COLLEGE",
  UNIVERSITY = "UNIVERSITY",
  INSTITUTE = "INSTITUTE",
}

export enum OwnershipType {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  GOVERNMENT = "GOVERNMENT",
  TRUST = "TRUST",
}

export interface Address {
  addressLine1: string
  addressLine2: string
  street: string
  city: string
  state: string
  country: string
  zipCode: string
}

export interface SocialMedia {
  twitter?: string
  facebook?: string
  instagram?: string
  website?: string
}

export interface Reward {
  title: string
  description: string
  date: string
}

export interface Organisations {
  id?: string
  name: string
  branch?: string
  address: Address
  affiliation: Affiliation
  shortName: string
  contactNos: string[]
  emailIds: string[]
  organisationType: OrganisationType
  logo: string
  ownershipType: OwnershipType
  socialMedia: SocialMedia
  rewards?: Reward[]
  databaseName: string
  status: OrganisationStatus
  createdAt: string
  updatedAt: string
}

interface LoginResponse {
  success: boolean
  message?: string
  content: {
    token: string
    refreshToken: string
    expiresIn: number
    id: string
    email: string
    role: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT"
    phoneNumber?: string
    name?: string
  }
}

class AuthService {
  private user: User | null = null

  async getOrganisations(): Promise<Organisations[]> {
    try {
      const response = await apiClient.getOrganisations()
      console.log("📋 Organisations response:", response)
      return response.content
    } catch (error) {
      console.error("❌ Failed to fetch organisations:", error)
      throw error
    }
  }

  async login(email: string, password: string, orgId: string, role: string): Promise<User> {
    try {
      console.log("🔐 Starting login process for:", email, "as role:", role)

      // Set organization ID before login
      apiClient.setOrgId(orgId)

      // Use the selected role instead of hardcoding "ADMIN"
      const type = role
      const response = (await apiClient.login({ email, password, type }, orgId)) as LoginResponse

      console.log("📡 Login API response:", response)

      // Check if login was successful
      if (response) {
        // Create user object from login response
        const user: User = {
          id: response.id,
          name: response.name,
          email: response.email,
          role: response.role,
          orgId: orgId,
          phoneNumber: response.phoneNumber,
        }

        console.log("👤 Created user object:", user)

        // Store token and user data
        this.setTokenCookie(response.token)
        this.setUserRoleCookie(user.role) // Add this line to store role in cookie

        if (typeof window !== "undefined") {
          sessionStorage.setItem("token", response.token)
          sessionStorage.setItem("refreshToken", response.refreshToken)
          sessionStorage.setItem("user", JSON.stringify(user))
          sessionStorage.setItem("orgId", orgId)
        }

        this.user = user
        console.log("✅ Login successful, returning user")
        return user
      } else {
        console.error("❌ Login failed:", response.message)
        throw new Error(response.message || "Login failed")
      }
    } catch (error) {
      console.error("❌ Login error:", error)
      throw error
    }
  }

  private setTokenCookie(token: string) {
    if (typeof document !== "undefined") {
      const expires = new Date()
      expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000) // 24 hours

      document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
      console.log("🍪 Token cookie set")
    }
  }

  private setUserRoleCookie(role: string) {
    if (typeof document !== "undefined") {
      const expires = new Date()
      expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000) // 24 hours

      document.cookie = `userRole=${role}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
      console.log("🍪 User role cookie set:", role)
    }
  }

  logout() {
    console.log("🚪 Logging out user")
    if (typeof window !== "undefined") {
      // Clear sessionStorage
      sessionStorage.removeItem("user")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("refreshToken")
      sessionStorage.removeItem("orgId")

      // Clear cookies
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
    this.user = null
  }

  getCurrentUser(): User | null {
    if (this.user) return this.user

    if (typeof window !== "undefined") {
      const userData = sessionStorage.getItem("user")
      if (userData) {
        this.user = JSON.parse(userData)
        return this.user
      }
    }
    return null
  }

  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      const userData = sessionStorage.getItem("user")
      const token = sessionStorage.getItem("token")
      return !!(userData && token)
    }
    return false
  }

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("token")
    }
    return null
  }

  getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("refreshToken")
    }
    return null
  }

  getOrgId(): string | null {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("orgId")
    }
    return null
  }

  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return null

    try {
      // Implement refresh token logic here when API is ready
      return null
    } catch (error) {
      console.error("❌ Token refresh failed:", error)
      this.logout()
      return null
    }
  }
}

export const authService = new AuthService()
export default authService
