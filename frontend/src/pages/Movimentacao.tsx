import { useState } from "react";
import SearchBar from "../components/utils/SearchBar";
import { TableMovimentacao } from "../components/movimentacao/TableMovimentacao";
import FilterDataMovimentacao from "../components/movimentacao/FilterDataMovimentacao";
import { useMovimentacoes } from "../hooks/movimentacao/useMovimentacoes";

export default function Movimentacao() {
  const [busca, setBusca] = useState<string>("");
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
  } = useMovimentacoes(busca, dataInicio, dataFim);

  return (
    <>
      <h1 className="text-3xl font-bold text-[#1A955E] mb-6">
        Movimentações
      </h1>

      <div className="flex flex-col gap-4 mb-6">
        <SearchBar
          value={busca}
          onChange={setBusca}
          placeholder="Buscar movimentação..."
        />

        <FilterDataMovimentacao
          dataInicio={dataInicio}
          dataFim={dataFim}
          onChangeInicio={setDataInicio}
          onChangeFim={setDataFim}
        />
      </div>

      {loading && <p>Carregando...</p>}
      {erro && <p className="text-red-500">{erro}</p>}

      {!loading && !erro && (
        <>
          <TableMovimentacao dados={dados} />

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={goToPreviousPage}
              disabled={!hasPrevious}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="flex items-center">
              Página {page}
            </span>

            <button
              onClick={goToNextPage}
              disabled={!hasNext}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </>
  );
}
