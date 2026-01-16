import { useState } from "react";
import { useAuth } from "../hooks/autenticacao/useAuth";

import SearchBar from "../components/utils/SearchBar";
import AddSaidaButton from "../components/saida/AddSaidaButton";
import TableSaida from "../components/saida/TableSaida";
import { useSaidas } from "../hooks/saida/useSaidas";

export default function Saida() {
  const { isAuthenticated } = useAuth();
  const [busca, setBusca] = useState("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");

  const {
    dados,
    loading,
    erro,
    page,
    hasNext,
    hasPrevious,
    goToNextPage,
    goToPreviousPage,
  } = useSaidas(busca, dataInicio, dataFim);

  return (
    <>
      <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Saídas</h1>

      <SearchBar
        value={busca}
        onChange={setBusca}
        placeholder="Buscar saída..."
      />

      <div className="flex flex-col gap-4 mt-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Data Início</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Data Fim</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <div className="mb-4">
          <AddSaidaButton />
        </div>
      )}

      <TableSaida
        search={busca}
        dados={dados}
        loading={loading}
        erro={erro}
        page={page}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
      />
    </>
  );
}
