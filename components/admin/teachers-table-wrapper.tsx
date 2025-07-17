"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import React, { useCallback, useState, useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"
import { TeachersTable, Teacher } from "./teachers-table"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeachersTableWrapper({
  teachers,
  currentPage,
  totalPages,
  loading = false,
}: {
  teachers: Teacher[]
  currentPage: number
  totalPages: number
  loading?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Get values from URL params (source of truth for search results)
  const searchTermFromUrl = searchParams.get("search") || ""
  const selectedYear = searchParams.get("year")
  
  // Local state for input field (for smooth typing experience)
  const [inputValue, setInputValue] = useState(searchTermFromUrl)

  // Sync local state with URL when URL changes (e.g., browser back/forward)
  useEffect(() => {
    setInputValue(searchTermFromUrl)
  }, [searchTermFromUrl])

  // Optimized URL update function
  const updateSearchParams = useCallback((updates: { search?: string; page?: number; year?: string }) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (updates.search !== undefined) {
      if (updates.search) {
        params.set("search", updates.search)
      } else {
        params.delete("search")
      }
    }
    
    if (updates.year !== undefined) {
      if (updates.year) {
        params.set("year", updates.year)
      } else {
        params.delete("year")
      }
    }
    
    if (updates.page !== undefined) {
      params.set("page", updates.page.toString())
    }
    
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  // Debounced search with use-debounce (300ms)
  const debouncedSearch = useDebouncedCallback(
    (search: string) => {
      updateSearchParams({ search, page: 1 })
    },
    300
  )

  const handlePageChange = (page: number) => {
    updateSearchParams({ page })
  }

  const handleClearSearch = () => {
    setInputValue("")
    updateSearchParams({ search: "", page: 1 })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value) // Update local state immediately for smooth typing
    debouncedSearch(value) // Debounce the URL update
  }

  // Calculate total subjects and classes for better info display
  const totalSubjects = teachers.reduce((sum, teacher) => sum + (teacher.subjects?.length || 0), 0)
  const totalClasses = teachers.reduce((sum, teacher) => sum + (teacher.classrooms?.length || 0), 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Teachers</CardTitle>
            <CardDescription>View and manage teacher records</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or employee code..."
                value={inputValue}
                onChange={handleInputChange}
                className="pl-10 pr-10"
              />
              {inputValue && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search Results Info */}
        {searchTermFromUrl && (
          <div className="text-sm text-muted-foreground mb-4">
            {teachers.length > 0 ? (
              `Found ${teachers.length} teacher${teachers.length === 1 ? '' : 's'} for "${searchTermFromUrl}"${selectedYear ? ` in ${selectedYear}` : ''} • ${totalSubjects} subjects • ${totalClasses} classes`
            ) : (
              `No teachers found for "${searchTermFromUrl}"${selectedYear ? ` in ${selectedYear}` : ''}`
            )}
          </div>
        )}

        <TeachersTable
          teachers={teachers}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </CardContent>
    </Card>
  )
} 