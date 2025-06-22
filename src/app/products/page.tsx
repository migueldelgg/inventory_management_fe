import type { Products } from "@/http/ProductSchema"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function DemoPage({ data, loading }: { data: Products[]; loading: boolean }) {
  return (
    <div className="container mx-auto py-10">
      {loading ? <p>Carregando produtos...</p> : <DataTable columns={columns} data={data} />}
    </div>
  )
}
