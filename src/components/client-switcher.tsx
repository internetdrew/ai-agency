import {
  ChevronsUpDown,
  Plus,
  UserRoundPlus,
  Users,
  UsersRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import CreateClientDialog from "./CreateClientDialog";

export function ClientSwitcher() {
  const [activeClient, setActiveClient] = useState<string | null>(null);
  const [renderCreateClientDialog, setRenderCreateClientDialog] =
    useState(false);
  const { isMobile } = useSidebar();

  const { data: clients } = useQuery(trpc.clients.list.queryOptions());

  useEffect(() => {
    if (clients && clients.length > 0) {
      setActiveClient(clients[0]?.name);
    }
  }, [clients]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {clients && clients.length > 0 ? (
                  <Users className="size-4" />
                ) : (
                  <UserRoundPlus className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeClient || "No active client"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Clients
            </DropdownMenuLabel>
            {clients?.map((client, index) => (
              <DropdownMenuItem
                key={client.id}
                onClick={() => setActiveClient(client.name)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <UsersRound className="size-3.5 shrink-0" />
                </div>
                {client.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => setRenderCreateClientDialog(true)}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Add client
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <CreateClientDialog
        open={renderCreateClientDialog}
        onOpenChange={setRenderCreateClientDialog}
      />
    </SidebarMenu>
  );
}
