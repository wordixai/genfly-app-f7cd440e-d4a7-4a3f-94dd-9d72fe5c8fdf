import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Users, 
  FileText, 
  Home,
  Search,
  PlusCircle
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const SidebarNav = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="grid h-screen w-full overflow-hidden lg:grid-cols-[auto_1fr]">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="font-semibold">SRE故障管理系统</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索..."
                className="w-full bg-background pl-8"
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>首页</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/fault-reports")}>
                  <Link to="/fault-reports">
                    <AlertTriangle className="h-4 w-4" />
                    <span>故障报告</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/analytics")}>
                  <Link to="/analytics">
                    <BarChart3 className="h-4 w-4" />
                    <span>统计分析</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/teams")}>
                  <Link to="/teams">
                    <Users className="h-4 w-4" />
                    <span>团队管理</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/documents")}>
                  <Link to="/documents">
                    <FileText className="h-4 w-4" />
                    <span>文档中心</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarGroup>
              <SidebarGroupLabel>故障管理</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/fault-reports/create")}>
                      <Link to="/fault-reports/create">
                        <PlusCircle className="h-4 w-4" />
                        <span>创建故障报告</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/fault-reports/review")}>
                      <Link to="/fault-reports/review">
                        <FileText className="h-4 w-4" />
                        <span>故障复盘</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/fault-reports/improvements")}>
                      <Link to="/fault-reports/improvements">
                        <Settings className="h-4 w-4" />
                        <span>改进跟踪</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              <span>系统设置</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarNav;