import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 font-bold">Minha App</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <ul>
            <li>
              <Link to="/fornecedores" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                Fornecedores
              </Link>
            </li>
            <li>
              <Link to="/produtos" className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                Produtos
              </Link>
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
