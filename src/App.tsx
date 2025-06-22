import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./app/layout"
import Fornecedores from "./pages/fornecedores/fornecedores"
import Produtos from "./pages/produtos/produtos"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="fornecedores" element={<Fornecedores />} />
            <Route path="produtos" element={<Produtos />} />
            <Route path="produtos-fornecedores" element={<Produtos />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Toast container do Sonner */}
      <Toaster position="bottom-right" richColors />
    </>
  )
}

export default App
