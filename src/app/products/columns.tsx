import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { ColumnDef } from "@tanstack/react-table"

type Products = {
  id: string
  barCode: string
  description: string
  stockQuantity: number
  category: string
  isActive: boolean
  productValidity: string
  imgUrl: string
}

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => {
      const fullId = getValue<string>()
      const shortId = `${fullId.slice(0, 6)}...`

      const handleCopy = () => {
        navigator.clipboard.writeText(fullId)
        toast.success("ID copiado com sucesso!")
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
    },
  },
  {
    accessorKey: "barCode",
    header: "Código de Barras",
    cell: ({ getValue }) => {
      const barCode = getValue<string>()

      return (
        <span
          className="inline-block max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm"
          title={barCode}
        >
          {barCode}
        </span>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ getValue }) => {
      const description = getValue<string>()

      return (
        <span
          className="inline-block max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-sm"
          title={description}
        >
          {description}
        </span>
      )
    },
  },
  {
    accessorKey: "stockQuantity",
    header: "Estoque",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "isActive",
    header: "Ativo",
    cell: ({ getValue }) => (getValue<boolean>() ? "✅" : "⛔"),
  },
  {
    accessorKey: "productValidity",
    header: "Validade",
  },
]
