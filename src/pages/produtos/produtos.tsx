import { useState } from "react"
import { FormModal } from "../../components/modal/index"
import Header from "@/components/own/Header"
import DemoPage from "@/app/products/page"
import type { Products } from "@/http/ProductSchema"

// Mapeamento de labels legíveis → chaves da API
const createProductFieldMap: Record<string, keyof Products> = {
  "Nome": "name",
  "Código de Barras": "barCode",
  "Descrição": "description",
  "Quantidade em Estoque": "stockQuantity",
  "Categoria": "category",
  "Validade do Produto": "productValidity",
  "URL da Imagem": "imgUrl",
}

// Função que transforma os dados do formulário para a API
function transformFormData(input: Record<string, string>): Products {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {}

  for (const [label, value] of Object.entries(input)) {
    const key = createProductFieldMap[label]
    if (!key) continue
    result[key] = key === "stockQuantity" ? Number(value) : value
  }

  return result
}

// Geração dos campos visíveis a partir dos labels
const visibleFields = Object.keys(createProductFieldMap).reduce((acc, label) => {
  acc[label] = ""
  return acc
}, {} as Record<string, string>)

export default function Produtos() {
  const [modalVisible, setModalVisible] = useState(false)

  const handleAddProduct = () => setModalVisible(true)

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const apiData = transformFormData(data)

      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      })

      // sucesso, etc
    } catch (err) {
      console.error("Erro ao salvar:", err)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header
        title="Produtos"
        actionText="+ Adicionar produto"
        onActionClick={handleAddProduct}
        deleteText="Excluir produto"
        onDeleteClick={() => { }}
        updateText="Atualizar produto"
        onUpdateClick={() => { }}
        realodText="Recarregar tabela"
        onRealodClick={() => { }}
      />
      <DemoPage />

      <FormModal
        visible={modalVisible}
        title="Novo Produto"
        fields={visibleFields}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
