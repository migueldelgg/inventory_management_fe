import { AppSidebar } from "../components/ui/app-sidebar"

import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
