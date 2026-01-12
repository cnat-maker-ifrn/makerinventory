import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useItens } from "../../hooks/item/useItens";
import EditItemModal from "./EditItemModal";
import { type Item } from "../../types/item";

interface Props {
  search: string;
  data_inicio: string;
  data_fim: string;
}

export default function TableItem({ search, data_inicio, data_fim }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<Item | null>(null);

  const { 
    dados: itens, 
    loading, 
    erro, 
    page, 
    hasNext, 
    hasPrevious, 
    goToNextPage, 
    goToPreviousPage 
  } = useItens(search, data_inicio, data_fim);

  const handleEditClick = (item: Item) => {
    setItemSelecionado(item);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setItemSelecionado(null);
  };

  const handleEditSuccess = () => {
    goToPreviousPage();
    goToNextPage();
  };

  if (loading) return <div>Carregando itens...</div>;
  if (erro) return <div className="text-red-600">{erro}</div>;

  const itensFiltrados = itens.filter((item) => {
    const termo = search.toLowerCase();

    return (
      item.nome.toLowerCase().includes(termo) ||
      item.codigo.toLowerCase().includes(termo) ||
      item.produto_detalhes?.nome?.toLowerCase().includes(termo)
    );
  });

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead className="bg-[#1A955E] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Foto</th>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Código</th>
              <th className="px-4 py-2 text-left">Proprietário</th>
              <th className="px-4 py-2 text-left">Disponível</th>
              <th className="px-4 py-2 text-left">Quebrado</th>
              <th className="px-4 py-2 text-left">Emprestado</th>
              <th className="px-4 py-2 text-left">Unidade</th>
              <th className="px-4 py-2 text-left">Preço</th>
              <th className="px-4 py-2 text-left">Entrada</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {itensFiltrados.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  {item.foto ? (
                    <img
                      src={item.foto}
                      className="w-14 h-14 object-cover rounded-md"
                      alt={item.nome}
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
                      Foto
                    </div>
                  )}
                </td>

                <td className="px-4 py-2">{item.nome}</td>
                <td className="px-4 py-2">{item.codigo}</td>

                <td className="px-4 py-2">
                  {item.eh_do_cnatmaker ? "CNAT Maker" : "IFRN"}
                </td>

                <td className="px-4 py-2">
                  {item.disponibilidade ? "Sim" : "Não"}
                </td>

                <td className="px-4 py-2">
                  {item.eh_quebrado ? "Sim" : "Não"}
                </td>

                <td className="px-4 py-2">
                  {item.eh_emprestado ? "Sim" : "Não"}
                </td>

                <td className="px-4 py-2">un</td>

                <td className="px-4 py-2">R$ {item.preco}</td>

                <td className="px-4 py-2">
                  {new Date(item.data_entrada).toLocaleDateString()}
                </td>

                <td className="px-4 py-2">
                  <button 
                    onClick={() => handleEditClick(item)}
                    className="text-blue-600 hover:bg-gray-300 rounded-md cursor-pointer p-1"
                  >
                    <MdEdit size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {itensFiltrados.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            Nenhum item encontrado
          </p>
        )}
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

      <EditItemModal
        open={editOpen}
        item={itemSelecionado}
        onClose={handleEditClose}
        onSuccess={handleEditSuccess}
      />
    </>
  );
}
