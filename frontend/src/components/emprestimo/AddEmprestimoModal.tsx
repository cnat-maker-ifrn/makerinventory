import { useEffect, useState } from "react";
import { useCreateEmprestimo } from "../../hooks/emprestimo/useCreateEmprestimo";
import { getSolicitantes } from "../../api/solicitanteApi";
import { getItens } from "../../api/itemApi";
import { type Item } from "../../types/item";
import { type Solicitante } from "../../types/solicitante";

interface AddEmprestimoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddEmprestimoModal({ open, onClose }: AddEmprestimoModalProps) {
  const [solicitantes, setSolicitantes] = useState<Solicitante[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Estados do formulário
  const [solicitanteId, setSolicitanteId] = useState<number | "">("");
  const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);
  const [previsaoEntrega, setPrevisaoEntrega] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const { criar, loading, erro } = useCreateEmprestimo();
  const isBusy = loading || loadingData;

  // Resetar formulário ao abrir
  useEffect(() => {
    if (open) {
      setSolicitanteId("");
      setItensSelecionados([]);
      setPrevisaoEntrega("");
      setResponsavel("");
    }
  }, [open]);

  // Carregar solicitantes e itens ao abrir
  useEffect(() => {
    if (!open) return;

    async function fetchData() {
      setLoadingData(true);
      try {
        const [solicitantesData, itensData] = await Promise.all([
          getSolicitantes(),
          getItens(),
        ]);
        setSolicitantes(solicitantesData);
        setItens(itensData.filter((i) => i.disponibilidade)); // apenas itens disponíveis
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, [open]);

  // Função para marcar/desmarcar itens
  function toggleItem(id: number) {
    setItensSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  // Submit do formulário
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (solicitanteId === "") {
      alert("Selecione um solicitante.");
      return;
    }
    if (itensSelecionados.length === 0) {
      alert("Selecione ao menos um item.");
      return;
    }
    if (!responsavel) {
      alert("Informe o responsável.");
      return;
    }
    if (!previsaoEntrega) {
      alert("Informe a previsão de entrega.");
      return;
    }

    // Preencher data_emprestimo automaticamente com agora
    const dataEmprestimoISO = new Date().toISOString();

    // Converter a data e hora da previsão de entrega para ISO
    const previsaoEntregaISO = new Date(previsaoEntrega).toISOString();

    const sucesso = await criar({
      solicitante: Number(solicitanteId),
      itens: itensSelecionados,
      previsao_entrega: previsaoEntregaISO,
      responsavel,
      data_emprestimo: dataEmprestimoISO, // necessário para não dar 400
    });

    if (sucesso) {
      onClose();
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center px-4 z-50 transition ${
        open ? "bg-black/40 visible" : "invisible"
      }`}
    >
      {open && (
        <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Cadastrar novo empréstimo</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Solicitante */}
            <div>
              <label className="block mb-1 font-semibold">Solicitante</label>
              <select
                required
                className="w-full border rounded-md p-2"
                value={solicitanteId}
                onChange={(e) => setSolicitanteId(Number(e.target.value))}
                disabled={isBusy}
              >
                <option value="">Selecione...</option>
                {solicitantes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Itens */}
            <div>
              <label className="block mb-1 font-semibold">Itens</label>
              <div className="max-h-48 overflow-y-auto border rounded-md p-2">
                {loadingData ? (
                  <div className="text-gray-500">Carregando...</div>
                ) : itens.length === 0 ? (
                  <div className="text-gray-500">Nenhum item disponível</div>
                ) : (
                  itens.map((i) => (
                    <label key={i.id} className="flex items-center gap-2 mb-1">
                      <input
                        type="checkbox"
                        checked={itensSelecionados.includes(i.id)}
                        onChange={() => toggleItem(i.id)}
                        disabled={isBusy}
                      />
                      {i.nome} ({i.codigo})
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Previsão de Entrega */}
            <div>
              <label className="block mb-1 font-semibold">Previsão de Entrega</label>
              <input
                type="datetime-local"
                required
                className="w-full border rounded-md p-2"
                value={previsaoEntrega}
                onChange={(e) => setPrevisaoEntrega(e.target.value)}
                disabled={isBusy}
              />
            </div>

            {/* Responsável */}
            <div>
              <label className="block mb-1 font-semibold">Responsável</label>
              <input
                type="text"
                required
                className="w-full border rounded-md p-2"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                disabled={isBusy}
              />
            </div>

            {/* Erro */}
            {erro && <p className="text-red-600 text-sm">{erro}</p>}

            {/* Botões */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md"
                disabled={isBusy}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
                disabled={isBusy}
              >
                {isBusy ? "Processando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
