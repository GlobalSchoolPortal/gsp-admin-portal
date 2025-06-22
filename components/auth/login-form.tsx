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
import { Loader2, User, GraduationCap, Users, BookOpen, ChevronDown } from "lucide-react"

const roleOptions = [
  { value: "ADMIN", label: "Administrator", icon: User },
  { value: "TEACHER", label: "Teacher", icon: GraduationCap },
  { value: "PARENT", label: "Parent", icon: Users },
  { value: "STUDENT", label: "Student", icon: BookOpen },
]

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [organisations, setOrganisations] = useState<Organisations[]>([])
  const [selectedOrganisation, setSelectedOrganisation] = useState<string>("")
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [loadingOrganisations, setLoadingOrganisations] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if both organization and role are selected
  const canShowCredentials = selectedOrganisation && selectedRole

  useEffect(() => {
    loadOrganisations()
  }, [])

  const loadOrganisations = async () => {
    try {
      console.log("📋 Loading organisations...")
      setLoadingOrganisations(true)
      const organisationsData = await authService.getOrganisations()
      console.log("✅ Organisations loaded:", organisationsData.length)
      setOrganisations(organisationsData)
    } catch (error) {
      console.error("❌ Failed to load organisations:", error)
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

    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select your role to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log("🚀 Starting login process...")
    console.log("👤 Selected role:", selectedRole)

    try {
      const user = await authService.login(email, password, selectedOrganisation, selectedRole)
      console.log("✅ Login successful, user:", user)

      toast({
        title: "Login successful",
        description: "Redirecting to your dashboard...",
      })

      // Add a small delay to ensure state is properly set
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Determine redirect path based on user role
      let redirectPath: string

      if (user.role === "ADMIN") {
        redirectPath = "/admin/dashboard"
        console.log("🎯 Redirecting to admin dashboard")
      } else if (user.role === "TEACHER") {
        redirectPath = "/teacher/dashboard"
        console.log("🎯 Redirecting to teacher dashboard")
      } else if (user.role === "PARENT") {
        redirectPath = "/parent/dashboard"
        console.log("🎯 Redirecting to parent dashboard")
      } else {
        redirectPath = "/student/dashboard"
        console.log("🎯 Redirecting to student dashboard")
      }

      console.log("🚀 Final redirect path:", redirectPath)

      // Try router.replace first
      router.replace(redirectPath)

      // If that doesn't work, fall back to hard navigation after a delay
      setTimeout(() => {
        if (window.location.pathname !== redirectPath) {
          console.log("🔄 Router.replace didn't work, using window.location")
          window.location.href = redirectPath
        }
      }, 1000)
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
        {/* Step 1: Organization Selection */}
        <div className="space-y-2">
          <Label htmlFor="organisation" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
            1
          </span>
            Select Organisation
          </Label>
          {loadingOrganisations ? (
              <div className="flex items-center justify-center p-3 border rounded-md">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading organisations...
              </div>
          ) : (
              <Select value={selectedOrganisation} onValueChange={setSelectedOrganisation} required>
                <SelectTrigger className={selectedOrganisation ? "border-green-200 bg-green-50" : ""}>
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

        {/* Step 2: Role Selection */}
        <div className="space-y-2">
          <Label htmlFor="role" className="flex items-center gap-2">
          <span
              className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
                  selectedOrganisation ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
              }`}
          >
            2
          </span>
            Select Role
          </Label>
          <Select value={selectedRole} onValueChange={setSelectedRole} required disabled={!selectedOrganisation}>
            <SelectTrigger
                className={`${
                    !selectedOrganisation
                        ? "opacity-50 cursor-not-allowed"
                        : selectedRole
                            ? "border-green-200 bg-green-50"
                            : ""
                }`}
            >
              <SelectValue placeholder={!selectedOrganisation ? "Select organisation first" : "Choose your role"} />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => {
                const IconComponent = role.icon
                return (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        <span>{role.label}</span>
                      </div>
                    </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Progress Indicator */}
        {!canShowCredentials && (
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ChevronDown className="h-4 w-4" />
                <span>Complete steps above to continue</span>
              </div>
            </div>
        )}

        {/* Step 3: Credentials (Hidden until both selections are made) */}
        {canShowCredentials && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                3
              </span>
                  <span className="font-medium text-sm">Enter your credentials</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                    className="transition-all duration-200"
                />
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
                    className="transition-all duration-200"
                />
              </div>

              <Button
                  type="submit"
                  className="w-full transition-all duration-200"
                  disabled={isLoading || loadingOrganisations}
              >
                {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                ) : (
                    "Sign In"
                )}
              </Button>

              {/* Demo Credentials - Only show when credentials section is visible */}
            </div>
        )}
      </form>
  )
}
