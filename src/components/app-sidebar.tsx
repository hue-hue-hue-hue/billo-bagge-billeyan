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
import { useAppDispatch } from "@/redux/store";
import { setActiveConversation } from "@/redux/conversation/conversation.slice";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { open, toggleSidebar } = useSidebar();
  const { conversations } = useChat();
  const handleLibraryClick = () => {
    if (!open) toggleSidebar();
  };

  const handleConversationClick = (id: string) => {
    dispatch(setActiveConversation(id));
    router.push(`/conversation/${id}`);
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
              <div className="mt-4 space-y-2 pl-4 flex flex-col items-start justify-start">
                {conversations.map(
                  (conversation: { id: string; title: string }) => (
                    <div className="flex w-full">
                      <button
                        onClick={() => handleConversationClick(conversation.id)}
                        key={conversation.id}
                        className="truncate hover:text-[#A2BCE4]"
                      >
                        {conversation.title}
                      </button>
                    </div>
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
