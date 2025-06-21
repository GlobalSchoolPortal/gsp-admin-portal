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
import { LayoutDashboard, User, BookOpen, Users, Calendar, Clock, FileText, GraduationCap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    url: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    url: "/teacher/profile",
    icon: User,
  },
  {
    title: "My Classes",
    url: "/teacher/my-classes",
    icon: BookOpen,
  },
  {
    title: "Students",
    url: "/teacher/students",
    icon: Users,
  },
  {
    title: "Subjects",
    url: "/teacher/subjects",
    icon: GraduationCap,
  },
  {
    title: "Attendance",
    url: "/teacher/attendance",
    icon: Calendar,
  },
  {
    title: "Meetings",
    url: "/teacher/meetings",
    icon: Clock,
  },
  {
    title: "Report Cards",
    url: "/teacher/report-cards",
    icon: FileText,
  },
]

export function TeacherSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">SMS Teacher</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Teaching</SidebarGroupLabel>
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
