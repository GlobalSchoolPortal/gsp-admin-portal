"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Clock,
  Settings,
  UserCheck,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    url: "/admin/students",
    icon: Users,
  },
  {
    title: "Parents",
    url: "/admin/parents",
    icon: UserCheck,
  },
  {
    title: "Teachers",
    url: "/admin/teachers",
    icon: GraduationCap,
  },
  {
    title: "Classes",
    url: "/admin/classes",
    icon: BookOpen,
  },
  {
    title: "Attendance",
    url: "/admin/attendance",
    icon: Calendar,
  },
  {
    title: "Report Cards",
    url: "/admin/report-cards",
    icon: FileText,
  },
  {
    title: "Academic Reports",
    url: "/admin/academic-reports",
    icon: BarChart3,
  },
  {
    title: "Scheduler",
    url: "/admin/scheduler",
    icon: Clock,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">SMS Admin</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-sm text-muted-foreground">School Management System v1.0</div>
      </SidebarFooter>
    </Sidebar>
  )
}
