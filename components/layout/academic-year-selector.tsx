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
import { useEffect, useState } from "react"

export function AcademicYearSelector() {
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
    setSelectedYear(yearFromUrl || currentAcademicYear)
  }, [searchParams])

  const yearOptions = generateYearOptions()

  const handleYearChange = (year: string) => {
    setSelectedYear(year) // Update local state first
    const params = new URLSearchParams(searchParams.toString())
    params.set("year", year)
    params.set("page", "1") // Reset to first page when year changes
    router.push(`?${params.toString()}`)
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