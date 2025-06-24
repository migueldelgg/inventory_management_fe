import Header from "@/components/own/Header"
import { useEffect, useState } from "react"
import { getAllProductsWithSuppliers, linkSupplierToProduct, unlinkSupplierFromProduct } from "@/handlers/productSupplierHandler"
import DemoPage from "@/app/produtosFornecedorTable/page"
import type { ProductSupplierAssociation } from "@/http/SuppliersSchema copy"
import { FormModal } from "@/components/modal"

const linkSupplierFieldMap: Record<string, "productId" | "supplierId"> = {
  "ID do Produto": "productId",
  "ID do Fornecedor": "supplierId",
}

const unlinkSupplierFieldMap: Record<string, "productId" | "supplierId"> = {
  "ID do Produto": "productId",
  "ID do Fornecedor": "supplierId",
}

const linkSupplierVisibleFields = Object.keys(linkSupplierFieldMap).reduce((acc, label) => {
  acc[label] = ""
  return acc
}, {} as Record<string, string>)

const unlinkSupplierVisibleFields = Object.keys(unlinkSupplierFieldMap).reduce((acc, label) => {
  acc[label] = ""
  return acc
}, {} as Record<string, string>)


export default function ProdutosFornecedores() {
  const [data, setData] = useState<ProductSupplierAssociation[]>([])
  const [loading, setLoading] = useState(true)

  const [linkModalVisible, setLinkModalVisible] = useState(false)
  const [unlinkModalVisible, setUnlinkModalVisible] = useState(false)

  const handleLinkSupplier = () => setLinkModalVisible(true)
  const handleUnlinkSupplier = () => setUnlinkModalVisible(true)

  const handleSubmitLink = async (formData: Record<string, string>) => {
    try {
      const { productId, supplierId } = transformFormData(formData, linkSupplierFieldMap)
      await linkSupplierToProduct(productId, supplierId)
      console.log("Fornecedor associado com sucesso")
      setLinkModalVisible(false)
      await reloadData()
    } catch (err) {
      console.error("Erro ao associar fornecedor:", err)
    }
  }

  const handleSubmitUnlink = async (formData: Record<string, string>) => {
    try {
      const { productId, supplierId } = transformFormData(formData, unlinkSupplierFieldMap)
      await unlinkSupplierFromProduct(productId, supplierId)
      console.log("Fornecedor desvinculado com sucesso")
      setUnlinkModalVisible(false)
      await reloadData()
    } catch (err) {
      console.error("Erro ao desvincular fornecedor:", err)
    }
  }

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
        onActionClick={handleLinkSupplier}
        deleteText="Desvincular fornecedor"
        onDeleteClick={handleUnlinkSupplier}
        realodText="Recarregar tabela"
        onRealodClick={reloadData}
      />


      <DemoPage data={data} loading={loading} />

      <FormModal
        visible={linkModalVisible}
        title="Associar Fornecedor ao Produto"
        submitLabel="Associar"
        fields={linkSupplierVisibleFields}
        onClose={() => setLinkModalVisible(false)}
        onSubmit={handleSubmitLink}
      />

      <FormModal
        visible={unlinkModalVisible}
        title="Desvincular Fornecedor de Produto"
        submitLabel="Desvincular"
        fields={unlinkSupplierVisibleFields}
        onClose={() => setUnlinkModalVisible(false)}
        onSubmit={handleSubmitUnlink}
      />
    </div>
  )
}
function transformFormData<T>(
  input: Record<string, string>,
  fieldMap: Record<string, keyof T>
): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {}
  for (const [label, value] of Object.entries(input)) {
    const key = fieldMap[label]
    if (!key) continue
    result[key] = value
  }
  return result as T
}

