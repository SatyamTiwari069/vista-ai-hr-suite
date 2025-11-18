import React from 'react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { navigationConfig } from '@/config/navigation';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const DashboardSidebar: React.FC = () => {
  const { user } = useAuth();
  const { state } = useSidebar();
  const navigation = user ? navigationConfig[user.role] : [];
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className={isCollapsed ? 'w-16' : 'w-64'}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">Vista HRMS</h2>
              <p className="text-xs text-sidebar-foreground/60">AI-Powered HR</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            {!isCollapsed && <SidebarGroupLabel>{section.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.href}
                        className="flex items-center gap-3 hover:bg-sidebar-accent"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!isCollapsed && (
                          <span className="flex-1">{item.title}</span>
                        )}
                        {!isCollapsed && item.badge && (
                          <Badge variant="secondary" className="text-xs bg-gradient-ai text-white">
                            {item.badge}
                          </Badge>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
