import type { Products } from "@/http/ProductSchema"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"

async function getData(): Promise<Products[]> {
  console.log("Chamando API...")

  const res = await fetch("http://localhost:8080/products/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  })

  if (!res.ok) {
    console.error("Erro na resposta da API:", res.status)
    throw new Error("Erro ao buscar produtos")
  }

  const json = await res.json()
  console.log("Dados recebidos:", json)
  return json as Products[]
}

export default function DemoPage() {
  const [data, setData] = useState<Products[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
      .then(setData)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container mx-auto py-10">
      {loading ? <p>Carregando produtos...</p> : <DataTable columns={columns} data={data} />}
    </div>
  )
}
