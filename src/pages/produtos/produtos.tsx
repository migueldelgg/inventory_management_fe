import Header from "../../components/own/Header"
import DemoPage from "@/app/products/page"

export default function Produtos() {

  const handleAddProduct = () => {
    console.log("Adicionar produto")
    // Sua lógica aqui
  }

  const handleUpdateProducts = () => {
    console.log("Adicionar produto")
    // Sua lógica aqui
  }

  const handleDeleteProducts = () => {
    console.log("Deletar selecionados")
    // Sua lógica para deletar os itens selecionados
  }

  const handleRealodProducts = () => {
    console.log("Deletar selecionados")
    // Sua lógica para deletar os itens selecionados
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header
        title="Produtos"
        actionText="+ Adicionar produto"
        onActionClick={handleAddProduct}
        deleteText="Excluir produto"
        onDeleteClick={handleDeleteProducts}
        updateText="Atualizar produto"
        onUpdateClick={handleUpdateProducts}
        realodText="Recarregar tabela"
        onRealodClick={handleRealodProducts}
      />
      <DemoPage />
    </div>
  )
}
