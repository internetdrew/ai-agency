import * as React from "react";
import { Bot } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { ClientSwitcher } from "@/components/client-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton asChild tooltip="Home">
          <Link to="/" className="flex items-center">
            <Bot className="text-pink-600" />
            <span className="font-semibold">AI Agency</span>
          </Link>
        </SidebarMenuButton>
        <ClientSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
