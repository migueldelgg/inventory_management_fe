import { useEffect, useState } from "react"
import { FormModal } from "../../components/modal/index"
import Header from "@/components/own/Header"
import DemoPage from "@/app/products/page"
import type { Products } from "@/http/ProductSchema"
import { createProduct, deleteProductById, updateProductById } from "@/handlers/productHandlers"

// Função para buscar produtos (copiada e adaptada)
async function getData(): Promise<Products[]> {
  console.log("Chamando API...")

  const res = await fetch("http://localhost:8080/products/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  if (!res.ok) {
    console.error("Erro na resposta da API:", res.status)
    throw new Error("Erro ao buscar produtos")
  }

  const json = await res.json()
  console.log("Dados recebidos:", json)
  return json as Products[]
}

// === Field Maps ===
const createProductFieldMap: Record<string, keyof Omit<Products, "id">> = {
  "Nome": "name",
  "Código de Barras": "barCode",
  "Descrição": "description",
  "Quantidade em Estoque": "stockQuantity",
  "Categoria": "category",
  "Validade do Produto": "productValidity",
  "URL da Imagem": "imgUrl",
}

const updateProductFieldMap: Record<string, keyof Products> = {
  "ID": "id",
  "Nome": "name",
  "Descrição": "description",
  "Quantidade em Estoque": "stockQuantity",
  "Categoria": "category",
  "Validade do Produto": "productValidity",
  "URL da Imagem": "imgUrl",
}

const deleteProductFieldMap: Record<string, keyof Products> = {
  "ID": "id"
}

// === Função de transformação ===
function transformFormData<T>(
  input: Record<string, string>,
  fieldMap: Record<string, keyof T>
): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {}
  for (const [label, value] of Object.entries(input)) {
    const key = fieldMap[label]
    if (!key) continue
    result[key] = key === "stockQuantity" ? Number(value) : value
  }
  return result as T
}

// === Geração dos campos visíveis ===
const createProductVisibleFields = Object.keys(createProductFieldMap).reduce((acc, label) => {
  acc[label] = ""
  return acc
}, {} as Record<string, string>)

const deleteProductVisibleFields = Object.keys(deleteProductFieldMap).reduce((acc, label) => {
  acc[label] = ""
  return acc
}, {} as Record<string, string>)

const updateProductVisibleFields = Object.keys(updateProductFieldMap).reduce((acc, label) => {
  acc[label] = ""
  return acc
}, {} as Record<string, string>)

function removeEmptyFields<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(obj).filter(([_, value]) => {
      if (typeof value === "string") return value.trim() !== ""
      if (typeof value === "number") return !isNaN(value)
      return value !== undefined && value !== null
    })
  ) as Partial<T>
}

export default function Produtos() {
  const [data, setData] = useState<Products[]>([])
  const [loading, setLoading] = useState(true)

  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [updateModalVisible, setUpdateModalVisible] = useState(false)

  async function reloadData() {
    setLoading(true)
    try {
      const produtos = await getData()
      setData(produtos)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Carregar dados ao montar
  useEffect(() => {
    reloadData()
  }, [])

  const handleAddProduct = () => setModalVisible(true)
  const handleDeleteProduct = () => setDeleteModalVisible(true)
  const handleUpdateProduct = () => setUpdateModalVisible(true)

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      const apiData = transformFormData<Omit<Products, "id">>(formData, createProductFieldMap)
      await createProduct(apiData)
      console.log("Produto criado com sucesso")
      setModalVisible(false)
      await reloadData() // Atualiza a tabela
    } catch (err) {
      console.error("Erro ao criar produto:", err)
    }
  }

  const handleDelete = async (formData: Record<string, string>) => {
    try {
      const apiData = transformFormData<Products>(formData, deleteProductFieldMap)
      await deleteProductById(apiData.id)
      console.log("Produto deletado com sucesso")
      setDeleteModalVisible(false)
      await reloadData() // Atualiza a tabela
    } catch (err) {
      console.error("Erro ao deletar:", err)
    }
  }

  const handleSubmitUpdate = async (formData: Record<string, string>) => {
    try {
      const apiData = transformFormData<Products>(formData, updateProductFieldMap)
      const { id, ...rest } = apiData
      const filtered = removeEmptyFields(rest)
      await updateProductById(id, filtered)
      console.log("Produto atualizado com sucesso")
      setUpdateModalVisible(false)
      await reloadData() // Atualiza a tabela
    } catch (err) {
      console.error("Erro ao atualizar produto:", err)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header
        title="Produtos"
        actionText="+ Adicionar produto"
        onActionClick={handleAddProduct}
        deleteText="Excluir produto"
        onDeleteClick={handleDeleteProduct}
        updateText="Atualizar produto"
        onUpdateClick={handleUpdateProduct}
        realodText="Recarregar tabela"
        onRealodClick={reloadData} // opção para recarregar manualmente
      />

      <DemoPage data={data} loading={loading} />

      {/* Modais */}
      <FormModal
        visible={modalVisible}
        title="Novo Produto"
        fields={createProductVisibleFields}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
      <FormModal
        visible={deleteModalVisible}
        title="Excluir Produto"
        submitLabel="Excluir"
        fields={deleteProductVisibleFields}
        onClose={() => setDeleteModalVisible(false)}
        onSubmit={handleDelete}
      />
      <FormModal
        visible={updateModalVisible}
        title="Atualizar Produto"
        submitLabel="Atualizar"
        fields={updateProductVisibleFields}
        onClose={() => setUpdateModalVisible(false)}
        onSubmit={handleSubmitUpdate}
      />
    </div>
  )
}