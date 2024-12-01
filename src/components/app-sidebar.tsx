"use client";
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
import LIBRARYSVG from "@/assets/icons/library.svg";
import Image from "next/image";
import Link from "next/link";
import useChat from "@/hooks/useChat";

export function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const { conversations } = useChat();
  const handleLibraryClick = () => {
    if (!open) toggleSidebar();
  };

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
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={handleLibraryClick}>
              <div className="text-xl">
                <Image src={LIBRARYSVG} alt="home" />
                <span>Library</span>
              </div>
            </SidebarMenuButton>
            {open && conversations.length && (
              <div className="mt-4 space-y-2 pl-4 flex flex-col">
                {conversations.map(
                  (conversation: { id: string; title: string }) => (
                    <Link
                      href={`/conversation/${conversation.id}`}
                      key={conversation.id}
                      className="text-base cursor-pointer hover:underline"
                    >
                      {conversation.title}
                    </Link>
                  )
                )}
              </div>
            )}
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{!open && <SidebarTrigger />}</SidebarFooter>
    </Sidebar>
  );
}
