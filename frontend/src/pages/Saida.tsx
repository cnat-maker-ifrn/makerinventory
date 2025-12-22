import { useState } from "react";
import { useAuth } from "../hooks/autenticacao/useAuth";

import SearchBar from "../components/utils/SearchBar";
import AddSaidaButton from "../components/saida/AddSaidaButton";
import TableSaida from "../components/saida/TableSaida";

export default function Saida() {
  const { isAuthenticated } = useAuth();
  const [busca, setBusca] = useState("");

  return (
    <>
      <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Saídas</h1>

      <SearchBar
        value={busca}
        onChange={setBusca}
        placeholder="Buscar saída..."
      />

      {isAuthenticated && (
        <div className="mb-4">
          <AddSaidaButton />
        </div>
      )}

      <TableSaida search={busca} />
    </>
  );
}
