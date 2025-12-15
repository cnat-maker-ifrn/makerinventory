import { useState } from "react";

import SearchBar from "../components/utils/SearchBar";
import AddCategoriaButton from "../components/categoria/AddCategoriaButton";
import AddSubcategoriaButton from "../components/subcategoria/AddSubcategoriaButton";
import AddProdutoButton from "../components/produto/AddProdutoButton";
import AddItemButton from "../components/item/AddItemButton";
import AddLoteButton from "../components/lote/AddLoteButton";
import Filter from "../components/utils/Filter";
import TableProduto from "../components/produto/TableProduto";

export default function Produto() {
  const [busca, setBusca] = useState("");

  return (
    <>
      <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Produtos</h1>

      <SearchBar
        value={busca}
        onChange={setBusca}
        placeholder="Buscar produto..."
      />

      <div className="flex gap-4 mb-6">
        <AddCategoriaButton />
        <AddSubcategoriaButton />
        <AddProdutoButton />
        <AddItemButton />
        <AddLoteButton />
        <Filter />
      </div>

      <TableProduto search={busca} />
    </>
  );
}
