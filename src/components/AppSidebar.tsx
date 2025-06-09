import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  User, 
  UserPlus, 
  Calendar, 
  MessageCircle,
  Menu,
  X
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navigation = [
  { 
    title: "Quản lý bác sỹ", 
    url: "/doctors", 
    icon: User,
    description: "Thêm, sửa, xóa thông tin bác sỹ"
  },
  { 
    title: "Quản lý bệnh nhân", 
    url: "/patients", 
    icon: UserPlus,
    description: "Quản lý hồ sơ bệnh nhân"
  },
  { 
    title: "Đặt lịch hẹn", 
    url: "/appointments", 
    icon: Calendar,
    description: "Quản lý lịch hẹn khám bệnh"
  },
  { 
    title: "Chatbot hỗ trợ", 
    url: "/chatbot", 
    icon: MessageCircle,
    description: "Tư vấn và hỗ trợ tự động"
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-foreground">HealthCare</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Quản lý hệ thống
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto">
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 ${getNavClass({ isActive })}`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs opacity-70 truncate">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t">
            <div className="text-xs text-muted-foreground text-center">
              Healthcare Admin System v1.0
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}