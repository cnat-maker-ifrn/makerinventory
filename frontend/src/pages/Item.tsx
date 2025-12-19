import { useState } from "react";
import { useAuth } from "../hooks/autenticacao/useAuth";

import SearchBar from "../components/utils/SearchBar";
import TableItem from "../components/item/TableItem";
import AddItemButton from "../components/item/AddItemButton";

export default function Item() {
  const { isAuthenticated } = useAuth();
  const [busca, setBusca] = useState("");

  return (
    <>
      <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Itens</h1>

      <SearchBar
        value={busca}
        onChange={setBusca}
        placeholder="Buscar item..."
      />

      {isAuthenticated && (
        <div className="flex mb-4">
          <AddItemButton />
        </div>
      )}

      <TableItem search={busca} />
    </>
  );
}
