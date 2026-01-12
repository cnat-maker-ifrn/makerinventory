import { useState, useMemo } from "react";
import { MdVisibility, MdClose } from "react-icons/md";
import { type Emprestimo } from "../../types/emprestimo";
import { type Item } from "../../types/item";
import DevolverButton from "./DevolverButton";
import { useItens } from "../../hooks/item/useItens";

function safeDate(dateString?: string | null) {
  if (!dateString) return "—";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
}

interface TableEmprestimoProps {
  emprestimos: Emprestimo[];
  search: string;
  page: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onRefresh?: () => void;
}

interface ModalItem {
  id: number;
  nome: string;
  foto?: string | null;
}

export default function TableEmprestimo({
  emprestimos,
  search,
  page,
  hasNext,
  hasPrevious,
  onNextPage,
  onPreviousPage,
  onRefresh,
}: TableEmprestimoProps) {
  const [modalItem, setModalItem] = useState<ModalItem[] | null>(null);

  // Todos os itens carregados
  const { dados: itens } = useItens();

  // 🔍 FILTRO
  const emprestimosFiltrados = useMemo(() => {
    const termo = search.toLowerCase();

    return emprestimos.filter((emp) => {
      const solicitante = emp.solicitante_nome?.toLowerCase() || "";

      const nomesItens = itens
        .filter((i) => emp.itens.includes(i.id))
        .map((i) => i.nome.toLowerCase())
        .join(" ");

      return (
        solicitante.includes(termo) ||
        nomesItens.includes(termo)
      );
    });
  }, [emprestimos, itens, search]);

  if (emprestimosFiltrados.length === 0) {
    return (
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <div className="p-6 text-center text-gray-600">
          Nenhum empréstimo encontrado.
        </div>
      </div>
    );
  }

  function handleVisualizar(itensIds: number[]) {
    const itensCompleto: ModalItem[] = itens
      .filter((item) => itensIds.includes(item.id))
      .map((item: Item) => ({
        id: item.id,
        nome: item.nome,
        foto: item.foto ?? null,
      }));

    setModalItem(itensCompleto);
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead className="bg-[#1A955E] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Solicitante</th>
              <th className="px-4 py-2 text-left">Empréstimo</th>
              <th className="px-4 py-2 text-left">Previsão Entrega</th>
              <th className="px-4 py-2 text-left">Devolução</th>
              <th className="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {emprestimosFiltrados.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{emp.solicitante_nome}</td>
                <td className="px-4 py-2">
                  {safeDate(emp.data_emprestimo)}
                </td>
                <td className="px-4 py-2">
                  {safeDate(emp.previsao_entrega)}
                </td>
                <td className="px-4 py-2">
                  {safeDate(emp.data_entrega)}
                </td>

                <td className="px-4 py-2 flex gap-4">
                  <button
                    className="p-2 rounded-full hover:bg-gray-200"
                    onClick={() => handleVisualizar(emp.itens)}
                  >
                    <MdVisibility size={28} className="text-[#29854A]" />
                  </button>

                  <DevolverButton
                    emprestimoId={emp.id}
                    itensIds={emp.itens}
                    dataEntrega={emp.data_entrega}
                    onSuccess={onRefresh}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modalItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              onClick={() => setModalItem(null)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <MdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Itens do Empréstimo
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {modalItem.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  {item.foto ? (
                    <img
                      src={item.foto}
                      alt={item.nome}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center text-sm text-gray-600">
                      Foto
                    </div>
                  )}
                  <span className="mt-2 text-center text-sm">
                    {item.nome}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔽 PAGINAÇÃO */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onPreviousPage}
          disabled={!hasPrevious}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="flex items-center">
          Página {page}
        </span>

        <button
          onClick={onNextPage}
          disabled={!hasNext}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </>
  );
}
