import { useState } from "react"
import { FormModal } from "../../components/modal/index"
import Header from "@/components/own/Header"
import DemoPage from "@/app/products/page"
import type { Products } from "@/http/ProductSchema"
import { deleteProductById, updateProductById } from "@/handlers/productHandlers"

// === Field Maps ===
const createProductFieldMap: Record<string, keyof Products> = {
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

export default function Produtos() {
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [updateModalVisible, setUpdateModalVisible] = useState(false)

  const handleAddProduct = () => setModalVisible(true)
  const handleDeleteProduct = () => setDeleteModalVisible(true)
  const handleUpdateProduct = () => setUpdateModalVisible(true)

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const apiData = transformFormData<Products>(data, createProductFieldMap)

      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      })

      // sucesso, recarregar dados, etc
    } catch (err) {
      console.error("Erro ao salvar:", err)
    }
  }

  const handleSubmitDelete = async (data: Record<string, string>) => {
    try {
      const apiData = transformFormData<Products>(data, deleteProductFieldMap)
      await deleteProductById(apiData.id)
      // sucesso, recarregar dados, etc
    } catch (err) {
      console.error("Erro ao deletar:", err)
    }
  }

  const handleSubmitUpdate = async (data: Record<string, string>) => {
    try {
      const apiData = transformFormData<Products>(data, updateProductFieldMap)
      const { id, ...rest } = apiData

      await updateProductById(id, rest)
      // sucesso, recarregar dados, etc
    } catch (err) {
      console.error("Erro ao atualizar:", err)
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
        onRealodClick={() => { }}
      />

      <DemoPage />

      {/* Modal de criação */}
      <FormModal
        visible={modalVisible}
        title="Novo Produto"
        fields={createProductVisibleFields}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />

      {/* Modal de exclusão */}
      <FormModal
        visible={deleteModalVisible}
        title="Excluir Produto"
        submitLabel="Excluir"
        fields={deleteProductVisibleFields}
        onClose={() => setDeleteModalVisible(false)}
        onSubmit={handleSubmitDelete}
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
