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
import Image from "next/image"

const groupedMenuItems = [
  {
    label: "People",
    items: [
      { title: "Students", url: "/admin/students", icon: Users },
      { title: "Parents", url: "/admin/parents", icon: UserCheck },
      { title: "Teachers", url: "/admin/teachers", icon: GraduationCap },
    ],
  },
  {
    label: "Academics",
    items: [
      { title: "Classes", url: "/admin/classes", icon: BookOpen },
      { title: "Attendance", url: "/admin/attendance", icon: Calendar },
      { title: "Scheduler", url: "/admin/scheduler", icon: Clock },
    ],
  },
  {
    label: "Reports",
    items: [
      { title: "Report Cards", url: "/admin/report-cards", icon: FileText },
      { title: "Academic Reports", url: "/admin/academic-reports", icon: BarChart3 },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Settings", url: "/admin/settings", icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-1">
          <GraduationCap className="w-6 h-6 text-primary" />
          <h2 className="text-base font-bold tracking-tight">SMS Admin</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground px-4 pt-4 pb-2">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"} className={pathname === "/admin/dashboard" ? "bg-primary/10 text-primary font-semibold" : "hover:bg-accent/60 transition-colors"}>
                                        <Link href="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md">
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="text-sm">Dashboard</span>
                      </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {groupedMenuItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground px-4 pt-4 pb-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className={
                        pathname === item.url
                          ? "bg-primary/10 text-primary font-semibold"
                          : "hover:bg-accent/60 transition-colors"
                      }
                    >
                      <Link href={item.url} className="flex items-center gap-2 px-3 py-2 rounded-md">
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-1 px-4 py-3 border-t">
          <div className="text-[10px] text-muted-foreground">Logged in as <span className="font-medium text-foreground">Admin</span></div>
          <div className="text-[10px] text-muted-foreground">School Management System v1.0</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
