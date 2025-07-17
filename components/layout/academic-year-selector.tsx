"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { Suspense, useEffect, useState } from "react"

// Separate the inner component that uses useSearchParams
function AcademicYearSelectorInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedYear, setSelectedYear] = useState("")
  
  // Get current academic year (e.g., "2023-2024")
  const getCurrentAcademicYear = () => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1 // JavaScript months are 0-based
    
    // Academic year starts in July
    // If we're in or after July, we're in currentYear-nextYear academic year
    // If we're before July, we're in previousYear-currentYear academic year
    const academicStartYear = currentMonth >= 7 ? currentYear : currentYear - 1
    const academicEndYear = academicStartYear + 1
    
    return `${academicStartYear}-${academicEndYear}`
  }

  // Generate academic year options (oldest to newest)
  const generateYearOptions = () => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    
    // Determine the latest valid academic year based on current month
    const latestStartYear = currentMonth >= 7 ? currentYear : currentYear - 1
    
    // Generate years in ascending order (oldest first)
    const years: string[] = []
    for (let i = 5; i >= 0; i--) {
      const startYear = latestStartYear - i
      years.push(`${startYear}-${startYear + 1}`)
    }
    return years
  }

  // Initialize and sync the selected year with URL params
  useEffect(() => {
    const yearFromUrl = searchParams.get("year")
    const currentAcademicYear = getCurrentAcademicYear()
    const storedYear = localStorage.getItem("selectedAcademicYear")
    
    // Priority: URL > localStorage > current academic year
    const yearToUse = yearFromUrl || storedYear || currentAcademicYear
    
    // Update localStorage
    localStorage.setItem("selectedAcademicYear", yearToUse)
    
    // If no year in URL, update URL with the year we're using
    if (!yearFromUrl) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("year", yearToUse)
      const newPath = `${window.location.pathname}?${params.toString()}`
      // Use replace to avoid adding to history
      router.replace(newPath)
    }
    
    setSelectedYear(yearToUse)
  }, [searchParams])

  const yearOptions = generateYearOptions()

  const handleYearChange = (year: string) => {
    // Update localStorage first
    localStorage.setItem("selectedAcademicYear", year)
    
    // Update local state
    setSelectedYear(year)
    
    // Update URL while preserving other parameters
    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.set("year", year)
    currentParams.set("page", "1") // Reset to first page when year changes
    
    // Construct the new URL with the current pathname
    const newPath = `${window.location.pathname}?${currentParams.toString()}`
    
    // Use replace to avoid adding to history
    router.replace(newPath)
  }

  return (
    <Select value={selectedYear} onValueChange={handleYearChange}>
      <SelectTrigger 
        className="w-[140px] h-8 bg-white/50 hover:bg-white/80 transition-colors text-sm ring-0 focus:ring-0 focus:ring-offset-0"
      >
        <Calendar className="mr-2 h-3 w-3 text-red-500" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent 
        className="min-w-[140px] max-h-[180px]"
        align="end"
      >
        {yearOptions.map((year) => (
          <SelectItem 
            key={year} 
            value={year} 
            className="text-sm py-1.5 cursor-pointer hover:bg-accent/50"
          >
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// Fallback component while loading
function AcademicYearSelectorFallback() {
  return (
    <div className="w-[140px] h-8 bg-white/50 rounded-md flex items-center px-3">
      <Calendar className="mr-2 h-3 w-3 text-red-500" />
      <div className="h-4 w-16 bg-muted/20 animate-pulse rounded" />
    </div>
  )
}

// Main component that wraps everything in Suspense
export function AcademicYearSelector() {
  return (
    <Suspense fallback={<AcademicYearSelectorFallback />}>
      <AcademicYearSelectorInner />
    </Suspense>
  )
} 