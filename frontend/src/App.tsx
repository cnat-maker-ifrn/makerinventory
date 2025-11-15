import { BrowserRouter, Routes, Route } from "react-router-dom";
import Produtos from "./routes/Produto";

import Base from "./components/base/Base"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route path="produtos" element={<Produtos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

