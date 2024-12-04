import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarTrigger className="md:hidden" />
        {children}
      </SidebarProvider>
    </div>
  );
}
