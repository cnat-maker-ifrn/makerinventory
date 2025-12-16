import { useState } from "react";

import SearchBar from "../components/utils/SearchBar";
import FilterTipoProduto from "../components/utils/FilterTipoProduto";
import FilterSubcategoria from "../components/utils/FilterSubcategoria";

import AddCategoriaButton from "../components/categoria/AddCategoriaButton";
import AddSubcategoriaButton from "../components/subcategoria/AddSubcategoriaButton";
import AddProdutoButton from "../components/produto/AddProdutoButton";
import AddItemButton from "../components/item/AddItemButton";
import AddLoteButton from "../components/lote/AddLoteButton";

import TableProduto from "../components/produto/TableProduto";

export default function Produto() {
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<"todos" | "unitario" | "fracionado">("todos");
  const [subcategoria, setSubcategoria] = useState<string>("todas");

  return (
    <>
      <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Produtos</h1>

      {/* 🔍 Busca */}
      <SearchBar
        value={busca}
        onChange={setBusca}
        placeholder="Buscar produto..."
      />

      {/* 🎯 Filtros */}
      <div className="flex gap-4 mb-4">
        <FilterTipoProduto value={tipo} onChange={setTipo} />
        <FilterSubcategoria value={subcategoria} onChange={setSubcategoria} />
      </div>

      {/* ➕ Botões de ação */}
      <div className="flex gap-4 mb-6">
        <AddCategoriaButton />
        <AddSubcategoriaButton />
        <AddProdutoButton />
        <AddItemButton />
        <AddLoteButton />
      </div>

      {/* 📊 Tabela */}
      <TableProduto
        search={busca}
        tipo={tipo}
        subcategoria={subcategoria}
      />
    </>
  );
}
