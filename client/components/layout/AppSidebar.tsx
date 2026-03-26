"use client";
import Link from "next/link"
import {
  Home,
  LayoutDashboard,
  Briefcase,
  BarChart,
  Mail,
  Settings,
  User,
  PanelLeft,
  KanbanSquare,
} from "lucide-react"

import { LogOut } from "lucide-react"
import { logoutUser } from "@/app/services/userService";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher"
import { useRouter } from "next/navigation"

const mainItems = [
  { title: "Home", href: "/home", icon: Home },
  { title: "Job Postings", href: "/job_postings", icon: Briefcase },
  { title: "Resume Analyzer", href: "/resumeAnalyzer", icon: LayoutDashboard },
  { title: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { title: "Analytics", href: "#", icon: BarChart },
  { title: "Contact", href: "#", icon: Mail },
]

const footerItems = [
  { title: "Profile", href: "/profile", icon: User },
  { title: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login")
    } catch (err) {
      router.push("/login")
    }
  }
  return (
    <Sidebar collapsible="icon"className="shadow-[2px_0_10px_rgba(0,0,0,0.15)] 
    ">
      {/* HEADER */}
      <SidebarHeader className="flex items-center justify-between px-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">

          <span className="data-[collapsed=true]:hidden"></span>
        </Link>

        <SidebarTrigger className="ml-auto">
          <PanelLeft className="h-4 w-4" />
        </SidebarTrigger>
      </SidebarHeader>

      {/* MAIN CONTENT */}
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarMenu className="gap-4">
            {mainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild  className="py-2 px-3 text-sm">
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* LOGOUT */}
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Logout"
            onClick={handleLogout}
            className="py-2 px-3 text-sm text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

      {/* FOOTER (BOTTOM) */}
      <SidebarFooter className="pb-16">
        <SidebarMenu className="gap-4">
          {/* Language Switcher */}
          <SidebarMenuItem>
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </SidebarMenuItem>

          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild className="py-2 px-3 text-sm">
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
