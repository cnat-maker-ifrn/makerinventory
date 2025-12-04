import { useState, useEffect } from "react";
import { useCreateSaida } from "../../hooks/saida/useCreateSaida";
import { getItens } from "../../api/itemApi";
import { getLotes } from "../../api/loteApi";

interface AddSaidaModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddSaidaModal({ open, onClose }: AddSaidaModalProps) {
  const { createSaida, loading, error } = useCreateSaida();

  const [tipo, setTipo] = useState<"item" | "lote">("item");
  const [item, setItem] = useState<number | null>(null);
  const [lote, setLote] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [responsavel, setResponsavel] = useState("");
  const [itens, setItens] = useState<any[]>([]);
  const [lotes, setLotes] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const itensResp = await getItens();
      const lotesResp = await getLotes();
      setItens(itensResp);
      setLotes(lotesResp);
    }
    if (open) loadData();
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (tipo === "item" && !item) {
      alert("Selecione um item.");
      return;
    }

    if (tipo === "lote" && !lote) {
      alert("Selecione um lote.");
      return;
    }

    const payload: any = {
      responsavel
    };

    if (tipo === "item") {
      payload.item = item!;
    } else {
      payload.lote = lote!;
      payload.quantidade = quantidade;
    }

    const result = await createSaida(payload);

    if (result) {
      onClose();
      setItem(null);
      setLote(null);
      setQuantidade(1);
      setResponsavel("");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Registrar Saída</h2>

        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo */}
          <div>
            <label className="font-medium mb-1 block">Tipo de Saída</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "item" | "lote")}
            >
              <option value="item">Item (unitário)</option>
              <option value="lote">Lote (fracionado)</option>
            </select>
          </div>

          {/* Item */}
          {tipo === "item" && (
            <div>
              <label className="font-medium mb-1 block">Item</label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={item ?? ""}
                onChange={(e) => setItem(Number(e.target.value))}
              >
                <option value="">Selecione um item</option>
                {itens.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.nome} — {it.codigo}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Lote */}
          {tipo === "lote" && (
            <>
              <div>
                <label className="font-medium mb-1 block">Lote</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={lote ?? ""}
                  onChange={(e) => setLote(Number(e.target.value))}
                >
                  <option value="">Selecione um lote</option>
                  {lotes.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.codigo} — {l.produto_nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantidade */}
              <div>
                <label className="font-medium mb-1 block">Quantidade</label>
                <input
                  type="number"
                  min={0.01}
                  step="0.01"
                  className="border rounded px-3 py-2 w-full"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                />
              </div>
            </>
          )}

          {/* Responsável */}
          <div>
            <label className="font-medium mb-1 block">Responsável</label>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              required
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#29854A] text-white rounded hover:bg-[#246f3f]"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
