/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Suppliers } from "@/http/SuppliersSchema"
import Header from "../../components/own/Header"
import DemoPage from "@/app/fornecedoresTable/page"
import { useEffect, useState } from "react"
import { createSupplier, deleteSupplierById, updateSupplierById } from "@/handlers/supplierHandlers"
import { FormModal } from "@/components/modal"

// Função para buscar fornecedores
async function getData(): Promise<Suppliers[]> {
  console.log("Chamando API...")

  const res = await fetch("http://localhost:8080/suppliers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  if (!res.ok) {
    console.error("Erro na resposta da API:", res.status)
    throw new Error("Erro ao buscar fornecedores")
  }

  const json = await res.json()
  console.log("Dados recebidos:", json)
  return json as Suppliers[]
}

// === Field Maps ===
const createSupplierFieldMap: Record<string, keyof Omit<Suppliers, "id">> = {
  "Nome da Empresa": "companyName",
  "Cnpj": "cnpj",
  "Endereço": "address",
  "Telefone": "phone",
  "Email": "email",
  "Contato": "mainContact"
}

const updateSupplierFieldMap: Record<string, keyof Suppliers> = {
  "ID": "id",
  "Nome da Empresa": "companyName",
  "Cnpj": "cnpj",
  "Endereço": "address",
  "Telefone": "phone",
  "Email": "email",
  "Contato": "mainContact"
}

const deleteSupplierFieldMap: Record<string, keyof Suppliers> = {
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
    result[key] = value
  }
  return result as T
}

// === Geração dos campos visíveis ===
const createSupplierVisibleFields = Object.keys(createSupplierFieldMap).reduce((acc, label) => {
  acc[label] = ""
  return acc
}, {} as Record<string, string>)

const deleteSupplierVisibleFields = Object.keys(deleteSupplierFieldMap).reduce((acc, label) => {
  acc[label] = ""
  return acc
}, {} as Record<string, string>)

const updateSupplierVisibleFields = Object.keys(updateSupplierFieldMap).reduce((acc, label) => {
  acc[label] = ""
  return acc
}, {} as Record<string, string>)

function removeEmptyFields<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (typeof value === "string") return value.trim() !== ""
      return value !== undefined && value !== null
    })
  ) as Partial<T>
}

export default function Fornecedores() {
  const [data, setData] = useState<Suppliers[]>([])
  const [loading, setLoading] = useState(true)

  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [updateModalVisible, setUpdateModalVisible] = useState(false)

  async function reloadData() {
    setLoading(true)
    try {
      const suppliers = await getData()
      setData(suppliers)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reloadData()
  }, [])

  const handleAddSupplier = () => setModalVisible(true)
  const handleDeleteSupplier = () => setDeleteModalVisible(true)
  const handleUpdateSupplier = () => setUpdateModalVisible(true)

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      const apiData = transformFormData<Omit<Suppliers, "id">>(formData, createSupplierFieldMap)
      await createSupplier(apiData)
      console.log("Fornecedor criado com sucesso")
      setModalVisible(false)
      await reloadData()
    } catch (err) {
      console.error("Erro ao criar fornecedor:", err)
    }
  }

  const handleDelete = async (formData: Record<string, string>) => {
    try {
      const apiData = transformFormData<Suppliers>(formData, deleteSupplierFieldMap)
      await deleteSupplierById(apiData.id)
      console.log("Fornecedor deletado com sucesso")
      setDeleteModalVisible(false)
      await reloadData()
    } catch (err) {
      console.error("Erro ao deletar fornecedor:", err)
    }
  }

  const handleSubmitUpdate = async (formData: Record<string, string>) => {
    try {
      const apiData = transformFormData<Suppliers>(formData, updateSupplierFieldMap)
      const { id, ...rest } = apiData
      const filtered = removeEmptyFields(rest)
      await updateSupplierById(id, filtered)
      console.log("Fornecedor atualizado com sucesso")
      setUpdateModalVisible(false)
      await reloadData()
    } catch (err) {
      console.error("Erro ao atualizar fornecedor:", err)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header
        title="Fornecedores"
        actionText="+ Adicionar fornecedor"
        onActionClick={handleAddSupplier}
        deleteText="Excluir fornecedor"
        onDeleteClick={handleDeleteSupplier}
        updateText="Atualizar fornecedor"
        onUpdateClick={handleUpdateSupplier}
        realodText="Recarregar tabela"
        onRealodClick={reloadData}
      />

      <DemoPage data={data} loading={loading} />

      <FormModal
        visible={modalVisible}
        title="Novo Fornecedor"
        fields={createSupplierVisibleFields}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
      <FormModal
        visible={deleteModalVisible}
        title="Excluir Fornecedor"
        submitLabel="Excluir"
        fields={deleteSupplierVisibleFields}
        onClose={() => setDeleteModalVisible(false)}
        onSubmit={handleDelete}
      />
      <FormModal
        visible={updateModalVisible}
        title="Atualizar Fornecedor"
        submitLabel="Atualizar"
        fields={updateSupplierVisibleFields}
        onClose={() => setUpdateModalVisible(false)}
        onSubmit={handleSubmitUpdate}
      />
    </div>
  )
}
