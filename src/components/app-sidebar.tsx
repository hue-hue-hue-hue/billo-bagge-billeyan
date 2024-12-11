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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getChats } from "@/utils/apiFunctions";
import { useChatStore } from "@/zustand/chat";
import { useWebSocketLogs } from "@/hooks/useSocketState";
// import { ApiSDK } from "@/utils/apiSDK";

export function AppSidebar() {
  const router = useRouter();
  // const [chats, setChats] = useState<Chat[]>([]);
  const { sidebarChats: chats, addSidebarChats } = useChatStore();
  const { isConnected, toolCalls } = useWebSocketLogs();
  const { open, toggleSidebar } = useSidebar();
  const handleLibraryClick = () => {
    if (!open) toggleSidebar();
  };
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getChats();
        addSidebarChats(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);
  const handleConversationClick = (id: string) => {
    router.push(`/chat/${id}`);
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
            <Link href={"/chat"}>
              <Image src={PLUSSVG} alt="home" />
              <span>New Chat</span>
            </Link>
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
            {open && chats.length && (
              <div className="mt-4 space-y-2 pl-4 flex flex-col items-start justify-start">
                {chats.map((conversation: { id: string; title: string }) => (
                  <div className="flex w-full" key={conversation.id}>
                    <button
                      onClick={() => handleConversationClick(conversation.id)}
                      className="truncate hover:text-[#A2BCE4]"
                    >
                      {conversation.title}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {!open && <SidebarTrigger />}
        {isConnected && <span className="text-green-500">Connected</span>}
        {toolCalls[toolCalls.length - 1] && (
          <h1>{toolCalls[toolCalls.length - 1]}</h1>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
