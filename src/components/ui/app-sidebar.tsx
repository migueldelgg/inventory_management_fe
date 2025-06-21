import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 text-2xl font-bold text-[var(--custom-blue)]">Cataline</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <ul>
            <li>
              <NavLink
                to="/fornecedores"
                className={({ isActive }) =>
                  `block p-2 rounded text-[16px] font-normal
                   ${isActive
                    ? 'text-[var(--sidebar-link-active)] bg-[var(--sidebar-link-hover-bg)]'
                    : 'text-[var(--sidebar-link)] hover:bg-[var(--sidebar-link-hover-bg)]'}`
                }
              >
                Fornecedores
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/produtos"
                className={({ isActive }) =>
                  `block p-2 rounded text-[16px] font-normal
                   ${isActive
                    ? 'text-[var(--sidebar-link-active)] bg-[var(--sidebar-link-hover-bg)]'
                    : 'text-[var(--sidebar-link)] hover:bg-[var(--sidebar-link-hover-bg)]'}`
                }
              >
                Produtos
              </NavLink>
            </li>
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-sm">© 2025</div>
      </SidebarFooter>
    </Sidebar>
  )
}
