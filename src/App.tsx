import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./app/layout"
import Fornecedores from "./pages/fornecedores"
import Produtos from "./pages/produtos"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="fornecedores" element={<Fornecedores />} />
          <Route path="produtos" element={<Produtos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
