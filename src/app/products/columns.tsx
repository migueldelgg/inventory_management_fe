import type { ColumnDef } from "@tanstack/react-table";

type Products = {
  id: string;
  barCode: string;
  description: string;
  stockQuantity: number;
  category: string;
  isActive: boolean;
  productValidity: string;
  imgUrl: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "barCode",
    header: "Código de Barras",
  },
  {
    accessorKey: "description",
    header: "Descrição",
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
    cell: ({ getValue }) => (getValue<boolean>() ? "Sim" : "Não"),
  },
  {
    accessorKey: "productValidity",
    header: "Validade",
  }
];
