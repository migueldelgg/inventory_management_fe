import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { ColumnDef } from "@tanstack/react-table"
import type { ProductSupplierAssociation } from "@/http/SuppliersSchema copy"

export const columns: ColumnDef<ProductSupplierAssociation>[] = [
  {
    accessorKey: "productId",
    header: "ID do Produto",
    cell: ({ getValue }) => {
      const id = getValue<string>()
      const shortId = `${id.slice(0, 6)}...`

      const handleCopy = () => {
        navigator.clipboard.writeText(id)
        toast.success("ID do produto copiado!")
      }

      return (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{shortId}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="hover:bg-transparent"
          >
            <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
        </div>
      )
    }
  },
  {
    accessorKey: "productName",
    header: "Nome do Produto",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "isActive",
    header: "Produto Ativo",
    cell: ({ getValue }) => (getValue<boolean>() ? "✅" : "⛔"),
  },
  {
    accessorKey: "supplierId",
    header: "ID do Fornecedor",
    cell: ({ getValue }) => {
      const id = getValue<string>()
      const shortId = `${id.slice(0, 6)}...`

      const handleCopy = () => {
        navigator.clipboard.writeText(id)
        toast.success("ID do fornecedor copiado!")
      }

      return (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{shortId}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="hover:bg-transparent"
          >
            <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
        </div>
      )
    }
  },
  {
    accessorKey: "supplierName",
    header: "Empresa Fornecedora",
  },
]
