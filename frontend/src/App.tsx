import { BrowserRouter, Routes, Route } from "react-router-dom";

import Base from "./components/base/Base";

import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produto";
import Item from "./pages/Item";
import Lote from "./pages/Lote";
import Emprestimo from "./pages/Emprestimo";
import Saida from "./pages/Saida";
import Movimentacao from "./pages/Movimentacao";
import Calculadora3D from "./pages/Calculadora3D";
import Manual from "./pages/Manual";
import Login from "./pages/Login";
import QRCodeScanner from "./pages/QRCodeScanner";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/qrcode-scanner/:codigo" element={<QRCodeScanner />} />

        <Route path="/" element={<Base />}>

          <Route index element={<Dashboard />} />

          <Route path="produtos" element={<Produtos />} />
          <Route path="produtos/itens" element={<Item />} />
          <Route path="produtos/lotes" element={<Lote />} />

          <Route path="emprestimos" element={<Emprestimo />} />
          <Route path="saidas" element={<Saida />} />
          <Route path="movimentacoes" element={<Movimentacao />} />
          <Route path="calculadora-3d" element={<Calculadora3D />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
