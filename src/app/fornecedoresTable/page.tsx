import type { Suppliers } from "@/http/SuppliersSchema"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function DemoPage({ data, loading }: { data: Suppliers[]; loading: boolean }) {
  return (
    <div className="container mx-auto py-10">
      {loading ? <p>Carregando fornecedores...</p> : <DataTable columns={columns} data={data} />}
    </div>
  )
}
