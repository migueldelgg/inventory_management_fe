import { useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menu_items = [
  {
    title: "Fornecedores",
    url: "/fornecedores",
  },
  {
    title: "Produtos",
    url: "/produtos",
  },
  {
    title: "Produtos/Fornecedores",
    url: "/produtos-fornecedores",
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarHeader>
          <div className="p-4 text-2xl font-bold text-[var(--custom-blue)]">Cataline</div>
        </SidebarHeader>
        <SidebarMenu className="p-3.5">
          {menu_items.map((item) => {
            const isActive = location.pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className={`block p-2 rounded text-[16px] font-normal
                      ${isActive
                        ? "text-[var(--sidebar-link-active)] bg-[var(--sidebar-link-hover-bg)]"
                        : "text-[var(--sidebar-link)] hover:bg-[var(--sidebar-link-hover-bg)]"
                      }
                    `}
                  >
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
