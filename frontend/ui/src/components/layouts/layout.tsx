import { AppSidebar } from "./app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@incmix/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
