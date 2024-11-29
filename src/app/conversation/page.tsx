"use client";
import { AppSidebar } from "@/components/app-sidebar";
import ChatInput from "@/components/chat/chatInput";
import { SidebarProvider } from "@/components/ui/sidebar";

const ChatPage: React.FC = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full justify-center items-center gap-10">
          <h1 className="text-4xl text-[#ABC3FF]"> What can I dig up?</h1>
          <ChatInput />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default ChatPage;
