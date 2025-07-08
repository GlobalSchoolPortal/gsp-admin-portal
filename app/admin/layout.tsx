"use client"

import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/layout/header"
import { type User } from "@/lib/auth"

// Optionally, you can get user info from cookies if needed for Header
// For now, use a placeholder or minimal user object
const placeholderUser: User = {
  id: "",
  name: "Admin",
  email: "",
  role: "ADMIN",
  orgId: "",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <Header user={placeholderUser} />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
