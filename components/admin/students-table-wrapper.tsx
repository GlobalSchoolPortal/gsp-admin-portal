"use client"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import React from "react"
import { StudentsTable, Student } from "./students-table"

export default function StudentsTableWrapper({
  students,
  currentPage,
  totalPages,
}: {
  students: Student[]
  currentPage: number
  totalPages: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <StudentsTable
      students={students}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  )
} 