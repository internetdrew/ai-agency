import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { NAV_ITEMS } from "@/constants";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Manage</SidebarGroupLabel>
      <SidebarMenu>
        {NAV_ITEMS.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <NavLink to={item.url}>
                {({ isActive }) => (
                  <>
                    {item.icon && (
                      <item.icon
                        className={isActive ? "" : "text-muted-foreground"}
                      />
                    )}
                    <span
                      className={
                        isActive ? "font-medium" : "text-muted-foreground"
                      }
                    >
                      {item.title}
                    </span>
                  </>
                )}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
