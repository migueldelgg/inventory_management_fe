import type { Products } from "@/http/ProductSchema"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"

function getData(): Promise<Products[]> {
  return Promise.resolve([
    {
      id: "1a2b3c4d",
      barCode: "7891000055123",
      description: "Arroz Branco Tipo 1 - 5kg",
      stockQuantity: 120,
      category: "Alimentos",
      isActive: true,
      productValidity: "2025-03-10",
      imgUrl: "https://example.com/images/arroz.jpg",
    },
    {
      id: "2b3c4d5e",
      barCode: "7891000023445",
      description: "Detergente Líquido Neutro - 500ml",
      stockQuantity: 85,
      category: "Limpeza",
      isActive: true,
      productValidity: "2026-01-15",
      imgUrl: "https://example.com/images/detergente.jpg",
    },
    {
      id: "3c4d5e6f",
      barCode: "7891000076543",
      description: "Chocolate ao Leite 90g",
      stockQuantity: 45,
      category: "Doces",
      isActive: false,
      productValidity: "2024-10-20",
      imgUrl: "https://example.com/images/chocolate.jpg",
    },
    {
      id: "4d5e6f7g",
      barCode: "7891000088888",
      description: "Leite Integral 1L",
      stockQuantity: 200,
      category: "Bebidas",
      isActive: true,
      productValidity: "2025-01-01",
      imgUrl: "https://example.com/images/leite.jpg",
    },
    {
      id: "5e6f7g8h",
      barCode: "7891000032123",
      description: "Sabonete em Barra Neutro - 90g",
      stockQuantity: 300,
      category: "Higiene",
      isActive: true,
      productValidity: "2026-06-30",
      imgUrl: "https://example.com/images/sabonete.jpg",
    }
  ])
}

export default function DemoPage() {
  const [data, setData] = useState<Products[]>([])

  useEffect(() => {
    getData().then(setData)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
