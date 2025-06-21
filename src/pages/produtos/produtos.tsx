import Header from "../../components/own/Header"

export default function Produtos() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header title="Produtos" actionText="+ Adicionar produto" onActionClick={() => { }} />
      {/* Aqui entra a tabela, lista, etc. */}
    </div>
  )
}
