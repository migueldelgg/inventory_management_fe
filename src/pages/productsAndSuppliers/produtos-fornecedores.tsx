import Header from "@/components/own/Header"
import { useEffect, useState } from "react"
import { getAllProductsWithSuppliers } from "@/handlers/productSupplierHandler"
import DemoPage from "@/app/produtosFornecedorTable/page"
import type { ProductSupplierAssociation } from "@/http/SuppliersSchema copy"

export default function ProdutosFornecedores() {
  const [data, setData] = useState<ProductSupplierAssociation[]>([])
  const [loading, setLoading] = useState(true)

  async function reloadData() {
    try {
      setLoading(true)
      const produtos = await getAllProductsWithSuppliers()
      setData(produtos)
    } catch (err) {
      console.error("Erro ao carregar produtos:", err)
      alert("Erro ao carregar dados de produtos com fornecedores.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reloadData()
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header
        title="Produtos x Fornecedores"
        actionText="Associar fornecedor"
        onActionClick={() => alert("Você pode usar um modal para associar fornecedor")}
        deleteText="Desvincular fornecedor"
        onDeleteClick={() => alert("Use o ID dos itens para desvincular")}
        realodText="Recarregar tabela"
        onRealodClick={reloadData}
      />

      <DemoPage data={data} loading={loading} />
    </div>
  )
}
