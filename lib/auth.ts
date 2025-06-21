import apiClient from "./api"

export interface User {
  id: string
  name?: string
  email: string
  role: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT"
  orgId: string
  avatar?: string
  phoneNumber?: string
}

export enum Affiliation {
  CBSE = 'CBSE',
  ICSE = 'ICSE',
  STATE_BOARD = 'STATE_BOARD',
  IB = 'IB',
  IGCSE = 'IGCSE',
  NIOS = 'NIOS'
}

export enum OrganisationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export enum OrganisationType {
  SCHOOL = 'SCHOOL',
  COLLEGE = 'COLLEGE',
  UNIVERSITY = 'UNIVERSITY',
  INSTITUTE = 'INSTITUTE'
}

export enum OwnershipType {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  GOVERNMENT = 'GOVERNMENT',
  TRUST = 'TRUST'
}

// Address interface
export interface Address {
  addressLine1: string
  addressLine2: string
  street: string
  city: string
  state: string
  country: string
  zipCode: string
}

// Social Media interface
export interface SocialMedia {
  twitter?: string
  facebook?: string
  instagram?: string
  website?: string
}

// Reward interface
export interface Reward {
  title: string
  description: string
  date: string // ISO string format for Instant
}

// Main Organisation/School interface
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
  createdAt: string // ISO string format
  updatedAt: string // ISO string format
}

// Login response interface based on your API response
interface LoginResponse {
  token: string
  refreshToken: string
  expiresIn: number
  id: string
  email: string
  role: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT"
  phoneNumber?: string
}

class AuthService {
  private user: User | null = null

  async getOrganisations(): Promise<Organisations[]> {
    try {
      const response = await apiClient.getOrganisations()
      return response.content
    } catch (error) {
      console.error("Failed to fetch schools:", error)
      throw error
    }
  }

  async login(email: string, password: string, orgId: string): Promise<User> {
    try {
      // Set school ID before login
      apiClient.setOrgId(orgId)
      const type = "ADMIN";
      const response = await apiClient.login({ email, password, type }, orgId)
      if (response) {

        // Create user object from login response
        const user: User = {
          id: response.id,
          email: response.email,
          role: response.role,
          orgId: orgId,
          phoneNumber: response.phoneNumber
        }

        // Store token, refresh token, and user data in both cookies and sessionStorage
        if (typeof window !== "undefined") {
          // Store in cookies for middleware access
          document.cookie = `token=${response.token}; path=/; secure; samesite=strict; max-age=${7 * 24 * 60 * 60}` // 7 days
          document.cookie = `refreshToken=${response.refreshToken}; path=/; secure; samesite=strict; max-age=${30 * 24 * 60 * 60}` // 30 days
          document.cookie = `user=${JSON.stringify(user)}; path=/; secure; samesite=strict; max-age=${7 * 24 * 60 * 60}`
          document.cookie = `orgId=${orgId}; path=/; secure; samesite=strict; max-age=${7 * 24 * 60 * 60}`

          // Also keep in sessionStorage for client-side access if needed
          sessionStorage.setItem("token", response.token)
          sessionStorage.setItem("refreshToken", response.refreshToken)
          sessionStorage.setItem("user", JSON.stringify(user))
          sessionStorage.setItem("orgId", orgId)
        }

        this.user = user
        return user
      } else {
        throw new Error(response.message || "Login failed")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

// Helper function to set cookies more cleanly
  private setCookie(name: string, value: string, days: number = 7) {
    if (typeof window !== "undefined") {
      const expires = new Date()
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
      document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`
    }
  }

// Updated logout method to clear cookies
  async logout(): Promise<void> {
    try {
      if (typeof window !== "undefined") {
        // Clear sessionStorage
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("refreshToken")
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("orgId")

        // Clear cookies
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "orgId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      }

      this.user = null
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    }
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
    return this.getCurrentUser() !== null && this.getToken() !== null
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

  // Method to refresh token if needed
  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return null

    try {
      // You'll need to implement this endpoint in your API client
      // const response = await apiClient.refreshToken(refreshToken)
      // For now, return null as the endpoint isn't implemented
      return null
    } catch (error) {
      console.error("Token refresh failed:", error)
      // If refresh fails, logout user
      await this.logout()
      return null
    }
  }
}

export const authService = new AuthService()
export default authService