import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import CHATSVG from "@/assets/icons/chat.svg";
import HOMESVG from "@/assets/icons/home.svg";
import PLUSSVG from "@/assets/icons/plus.svg";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="space-y-3">
        <div
          className={`flex items-center ${
            open ? "justify-between" : "justify-center"
          } `}
        >
          <Image src={CHATSVG} alt="chat" className="self-center" />

          {open && <SidebarTrigger />}
        </div>

        <SidebarMenuItem>
          <SidebarMenuButton
            className="px-6 py-2 bg-transparent border border-black dark:border-slate-600 dark:text-white text-black rounded-lg font-bold transform  transition duration-400"
            asChild
          >
            <div>
              <Image src={PLUSSVG} alt="home" />
              <span>New Chat</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="text-xl">
                <Image src={HOMESVG} alt="home" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{!open && <SidebarTrigger />}</SidebarFooter>
    </Sidebar>
  );
}
