import { BrowserRouter, Routes, Route } from "react-router-dom";

import Base from "./components/base/Base";

import Dashboard from "./routes/Dashboard"
import Produtos from "./routes/Produto";
import Item from "./routes/Item";
import Lote from "./routes/Lote";
import Emprestimo from "./routes/Emprestimo"
import Saida from "./routes/Saida"
import Movimentacao from "./routes/Movimentacao"



export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Base />}>

          {/* Página inicial (dashboard ou o que você quiser) */}
          <Route index element={<Dashboard />} />

          {/* Página principal de Produtos */}
          <Route path="produtos" element={<Produtos />} />

          {/* Subpáginas de Produtos */}
          <Route path="produtos/itens" element={<Item />} />
          <Route path="produtos/lotes" element={<Lote />} />

          <Route path="emprestimos" element={<Emprestimo />} />

          <Route path="saidas" element={<Saida />} />
          <Route path="movimentacoes" element={<Movimentacao />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
