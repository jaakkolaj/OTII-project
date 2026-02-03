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
} from "lucide-react"

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

const mainItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "Job Postings", href: "/job_postings", icon: Briefcase },
  { title: "Resume Analyzer", href: "/resumeAnalyzer", icon: LayoutDashboard },
  { title: "Analytics", href: "#", icon: BarChart },
  { title: "Contact", href: "#", icon: Mail },
]

const footerItems = [
  { title: "Profile", href: "#", icon: User },
  { title: "Settings", href: "#", icon: Settings },
]

export function AppSidebar() {
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
                <SidebarMenuButton tooltip={item.title} asChild  className="py-[1vh] px-[1vw] text-[clamp(0.8rem,1vw,1.2rem)]">
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

      {/* FOOTER (BOTTOM) */}
      <SidebarFooter className="pb-16">
        <SidebarMenu className="gap-4">
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild className="py-[1vh] px-[1vw] text-[clamp(0.8rem,1vw,1.2rem)]">
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
