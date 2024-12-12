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
import LIBRARYSVG from "@/assets/icons/library.svg";
import PLUSSVG from "@/assets/icons/plus.svg";
import AGENTSVG from "@/assets/icons/agent.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getChats } from "@/utils/apiFunctions";
import { useChatStore } from "@/zustand/chat";
// import { ApiSDK } from "@/utils/apiSDK";

export function AppSidebar() {
  const router = useRouter();
  // const [chats, setChats] = useState<Chat[]>([]);
  const { sidebarChats: chats, addSidebarChats } = useChatStore();
  const { open, toggleSidebar } = useSidebar();
  const handleLibraryClick = () => {
    if (!open) toggleSidebar();
  };

  const agents = [
    { name: "MnA Agent", id: "1", slug: "mergers-acquisitions" },
    { name: "Flag Agent", id: "2", slug: "terms-and-conditions" },
    { name: "CA Agent", id: "3", slug: "ca-agent" },
    { name: "Market Analysis Agent", id: "4", slug: "market-analysis" },
  ];

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
          <Image
            src={CHATSVG}
            alt="chat"
            width={32}
            height={32}
            className="self-center"
          />

          {open && <SidebarTrigger />}
        </div>

        <SidebarMenuItem>
          <SidebarMenuButton
            className="p-6 bg-transparent border border-black dark:border-slate-600 dark:text-white text-black rounded-lg  transform  transition duration-400"
            asChild
          >
            <Link
              href={"/chat"}
              // className=""
            >
              <Image src={PLUSSVG} alt="home" />
              <span className="text-[1.5rem]  w-full pl-8">New Chat</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={handleLibraryClick}>
              <div className="text-xl">
                <Image src={LIBRARYSVG} alt="home" />
                <span>History</span>
              </div>
            </SidebarMenuButton>
            {open && chats.length && (
              <div className="mt-2 pl-4 flex flex-col items-start justify-start">
                {chats.map((conversation: { id: string; title: string }) => (
                  <div
                    className="flex text-lg py-1 w-full border-l-2 pl-4 border-[##313131]"
                    key={conversation.id}
                  >
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
          <SidebarMenuItem className="mt-4">
            <SidebarMenuButton asChild onClick={handleLibraryClick}>
              <div className="text-xl">
                <Image src={AGENTSVG} alt="agents" />
                <span>Agents</span>
              </div>
            </SidebarMenuButton>
            {open && chats.length && (
              <div className="mt-2 space-y-2 pl-4 flex flex-col items-start justify-start">
                {agents.map((agent) => {
                  return (
                    <Link key={agent.id} href={`/${agent.slug}`}>
                      {agent.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{!open && <SidebarTrigger />}</SidebarFooter>
    </Sidebar>
  );
}
