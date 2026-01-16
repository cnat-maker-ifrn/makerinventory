import { useState } from "react";
import { useAuth } from "../hooks/autenticacao/useAuth";

import SearchBar from "../components/utils/SearchBar";
import TableEmprestimo from "../components/emprestimo/TableEmprestimo";
import AddSolicitanteButton from "../components/solicitante/AddSolicitanteButton";
import AddEmprestimoButton from "../components/emprestimo/AddEmprestimoButton";
import { useEmprestimos } from "../hooks/emprestimo/useEmprestimos";

export default function Emprestimo() {
  const { isAuthenticated } = useAuth();
  const [busca, setBusca] = useState("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");

  const {
    dados: emprestimos,
    loading,
    erro,
    page,
    hasNext,
    hasPrevious,
    goToNextPage,
    goToPreviousPage,
  } = useEmprestimos(busca, dataInicio, dataFim);

  if (loading) return <div>Carregando empréstimos...</div>;
  if (erro) return <div className="text-red-600">{erro}</div>;

  return (
    <>
      <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Empréstimos</h1>

      <SearchBar
        value={busca}
        onChange={setBusca}
        placeholder="Buscar empréstimo..."
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
        <div className="flex gap-4 mb-4">
          <AddSolicitanteButton />
          <AddEmprestimoButton />
        </div>
      )}

      <TableEmprestimo
        emprestimos={emprestimos}
        search={busca}
        page={page}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
      />
    </>
  );
}
