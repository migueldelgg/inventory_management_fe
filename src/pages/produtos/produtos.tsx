import Header from "../../components/own/Header"
import DemoPage from "@/app/products/page"
import { useState } from "react"

export default function Produtos() {
  // Aqui você poderia passar o estado dos selecionados de um contexto ou prop real
  // Vou colocar um exemplo com estado simulado
  const [selectedCount] = useState(0)

  const handleAddProduct = () => {
    console.log("Adicionar produto")
    // Sua lógica aqui
  }

  const handleDeleteProducts = () => {
    console.log("Deletar selecionados")
    // Sua lógica para deletar os itens selecionados
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header
        title="Produtos"
        actionText="+ Adicionar produto"
        onActionClick={handleAddProduct}
        deleteText="Deletar selecionados"
        onDeleteClick={handleDeleteProducts}
        disabledDelete={selectedCount === 0}
      />
      <DemoPage />
    </div>
  )
}
