import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useLotes } from "../../hooks/lote/useLotes";
import EditLoteModal from "./EditLoteModal";

interface Props {
  search: string;
  data_inicio: string;
  data_fim: string;
}

export default function TableLotes({ search, data_inicio, data_fim }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [loteSelecionado, setLoteSelecionado] = useState<any>(null);

  const { 
    dados: lotes, 
    loading, 
    erro, 
    page, 
    hasNext, 
    hasPrevious, 
    goToNextPage, 
    goToPreviousPage 
  } = useLotes(search, data_inicio, data_fim);

  const handleEditClick = (lote: any) => {
    setLoteSelecionado(lote);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setLoteSelecionado(null);
  };

  const handleEditSuccess = () => {
    goToPreviousPage();
    goToNextPage();
  };

  if (loading) return <div>Carregando lotes...</div>;
  if (erro) return <div className="text-red-600">{erro}</div>;

  const termo = search.toLowerCase();

  const lotesFiltrados = lotes.filter((lote) =>
    (
      lote.produto?.nome?.toLowerCase().includes(termo) ||
      lote.codigo?.toLowerCase().includes(termo) ||
      lote.fornecedor?.toLowerCase().includes(termo)
    )
  );

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead className="bg-[#1A955E] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Foto</th>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Código</th>
              <th className="px-4 py-2 text-left">Fornecedor</th>
              <th className="px-4 py-2 text-left">Quantidade</th>
              <th className="px-4 py-2 text-left">Preço</th>
              <th className="px-4 py-2 text-left">Validade</th>
              <th className="px-4 py-2 text-left">Entrada</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {lotesFiltrados.map((lote) => (
              <tr key={lote.id} className="hover:bg-gray-50">
                {/* Foto */}
                <td className="px-4 py-2">
                  {lote.foto ? (
                    <img
                      src={lote.foto}
                      className="w-14 h-14 object-cover rounded-md"
                      alt={lote.produto?.nome ?? "Produto"}
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
                      Foto
                    </div>
                  )}
                </td>

                {/* Produto */}
                <td className="px-4 py-2">{lote.produto?.nome ?? "-"}</td>

                {/* Código */}
                <td className="px-4 py-2">{lote.codigo}</td>

                {/* Fornecedor */}
                <td className="px-4 py-2">{lote.fornecedor ?? "-"}</td>

                {/* Quantidade */}
                <td className="px-4 py-2">{lote.quantidade}</td>

                {/* Preço */}
                <td className="px-4 py-2">
                  R$ {Number(lote.preco).toFixed(2).replace(".", ",")}
                </td>

                {/* Validade */}
                <td className="px-4 py-2">
                  {lote.data_validade
                    ? lote.data_validade.split("T")[0].split("-").reverse().join("/")
                    : "-"}
                </td>

                {/* Entrada */}
                <td className="px-4 py-2">
                  {new Date(lote.data_entrada).toLocaleDateString()}
                </td>

                {/* Ações */}
                <td className="px-4 py-2">
                  <button 
                    onClick={() => handleEditClick(lote)}
                    className="text-blue-600 hover:bg-gray-300 rounded-md cursor-pointer p-1"
                  >
                    <MdEdit size={24} />
                  </button>
                </td>
              </tr>
            ))}

            {lotesFiltrados.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  Nenhum lote encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔽 PAGINAÇÃO */}
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

      <EditLoteModal
        open={editOpen}
        lote={loteSelecionado}
        onClose={handleEditClose}
        onSuccess={handleEditSuccess}
      />
    </>
  );
}
