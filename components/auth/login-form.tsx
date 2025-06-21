"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { authService, type Organisations } from "@/lib/auth"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [organisations, setOrganisations] = useState<Organisations[]>([])
  const [selectedOrganisation, setSelectedOrganisation] = useState<string>("")
  const [loadingOrganisations, setLoadingOrganisations] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadOrganisations()
  }, [])

  const loadOrganisations = async () => {
    try {
      setLoadingOrganisations(true)
      const organisationsData = await authService.getOrganisations()
      setOrganisations(organisationsData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load organisations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingOrganisations(false)
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedOrganisation) {
      toast({
        title: "Organisation Required",
        description: "Please select an organisation to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const user = await authService.login(email, password, selectedOrganisation)
      console.log("✅ Login successful, user:", user)

      toast({
        title: "Login successful",
        description: "Redirecting to your dashboard...",
      })

      // Determine redirect path based on user role
      let redirectPath: string

      if (user.role === "ADMIN") {
        redirectPath = "/admin/dashboard"
        console.log("🎯 Redirecting to admin dashboard")
      } else if (user.role === "TEACHER") {
        redirectPath = "/teacher/dashboard"
        console.log("🎯 Redirecting to teacher dashboard")
      } else {
        redirectPath = "/parent/dashboard"
        console.log("🎯 Redirecting to parent dashboard")
      }

      console.log("🚀 Final redirect path:", redirectPath)

      // Wait a moment to ensure sessionStorage is set, then navigate
      setTimeout(() => {
        console.log("🔄 Attempting navigation...")

        // Verify sessionStorage is set
        const token = sessionStorage.getItem("token")
        const userData = sessionStorage.getItem("user")

        console.log("🔍 Token in sessionStorage:", !!token)
        console.log("🔍 User in sessionStorage:", !!userData)

        if (token && userData) {
          console.log("✅ SessionStorage verified, navigating...")
          // Force a hard navigation to ensure the page loads fresh
          window.location.href = redirectPath
        } else {
          console.error("❌ SessionStorage not set properly")
          toast({
            title: "Session Error",
            description: "Please try logging in again.",
            variant: "destructive",
          })
        }
      }, 100)

    } catch (error) {
      console.error("❌ Login error:", error)
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="organisation">Select Organisation</Label>
          {loadingOrganisations ? (
              <div className="flex items-center justify-center p-3 border rounded-md">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading organisations...
              </div>
          ) : (
              <Select value={selectedOrganisation} onValueChange={setSelectedOrganisation} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your organisation" />
                </SelectTrigger>
                <SelectContent>
                  {organisations && organisations.length > 0 ? (
                      organisations.map((organisation) => (
                          <SelectItem key={organisation.id} value={organisation.id!}>
                            {organisation.name}
                          </SelectItem>
                      ))
                  ) : (
                      <SelectItem value="no organisation" disabled>
                        No organisations available
                      </SelectItem>
                  )}
                </SelectContent>
              </Select>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Enter your email" required disabled={isLoading} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || loadingOrganisations}>
          {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
          ) : (
              "Sign In"
          )}
        </Button>

        <div className="text-sm text-muted-foreground text-center">
          <p>Demo credentials:</p>
          <p>Admin: admin@school.edu</p>
          <p>Teacher: teacher@school.edu</p>
          <p>Password: password123</p>
        </div>
      </form>
  )
}