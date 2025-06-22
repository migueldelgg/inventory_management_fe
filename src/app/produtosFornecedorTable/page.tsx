import type { ProductSupplierAssociation } from "@/http/SuppliersSchema copy";
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function DemoPage({ data, loading }: { data: ProductSupplierAssociation[]; loading: boolean }) {
  return (
    <div className="container mx-auto py-10">
      {loading ? <p>Carregando associacoes...</p> : <DataTable columns={columns} data={data} />}
    </div>
  )
}
