import { useState, useEffect, useRef, useCallback } from "react";
import { useCreateSaida } from "../../hooks/saida/useCreateSaida";
import { getItens } from "../../api/itemApi";
import { getLotes } from "../../api/loteApi";
import { type Item } from "../../types/item";

interface AddSaidaModalProps {
  open: boolean;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

export default function AddSaidaModal({ open, onClose }: AddSaidaModalProps) {
  const { createSaida, loading, error } = useCreateSaida();

  const [tipo, setTipo] = useState<"item" | "lote">("item");
  const [item, setItem] = useState<number | null>(null);
  const [lote, setLote] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [responsavel, setResponsavel] = useState("");
  const [itens, setItens] = useState<Item[]>([]);
  const [lotes, setLotes] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Busca e paginação para itens
  const [inputItens, setInputItens] = useState("");
  const [pageItens, setPageItens] = useState(0);
  const [showItensDropdown, setShowItensDropdown] = useState(false);
  const scrollRefItens = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      setLoadingData(true);
      try {
        const itensResp = await getItens();
        const lotesResp = await getLotes();

        // Lidar com respostas que podem ser arrays ou PaginatedResponse
        const itensList = Array.isArray(itensResp)
          ? itensResp
          : itensResp.results || [];

        const lotesList = Array.isArray(lotesResp)
          ? lotesResp
          : lotesResp.results || [];

        setItens(itensList.filter((i: any) => i.disponibilidade));
        setLotes(lotesList);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoadingData(false);
      }
    }
    if (open) loadData();
  }, [open]);

  // Resetar formulário ao abrir
  useEffect(() => {
    if (open) {
      setItem(null);
      setLote(null);
      setQuantidade(1);
      setResponsavel("");
      setTipo("item");
      setInputItens("");
      setPageItens(0);
      setShowItensDropdown(false);
    }
  }, [open]);

  // Filtrar itens
  const itensFiltrados = useCallback(() => {
    return itens.filter((i) =>
      i.nome.toLowerCase().includes(inputItens.toLowerCase()) ||
      i.codigo.toLowerCase().includes(inputItens.toLowerCase())
    );
  }, [itens, inputItens]);

  // Itens paginados
  const itensPaginados = useCallback(() => {
    const filtered = itensFiltrados();
    return filtered.slice(0, (pageItens + 1) * ITEMS_PER_PAGE);
  }, [itensFiltrados, pageItens]);

  // Handler scroll itens
  const handleScrollItens = useCallback(() => {
    if (!scrollRefItens.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRefItens.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (itensPaginados().length < itensFiltrados().length) {
        setPageItens((prev) => prev + 1);
      }
    }
  }, [itensPaginados, itensFiltrados]);

  // Resetar página quando input mudar
  useEffect(() => {
    setPageItens(0);
  }, [inputItens]);

  // Handler para selecionar item
  const handleSelectItem = (selectedItem: Item) => {
    setItem(selectedItem.id);
    setInputItens(selectedItem.nome);
    setShowItensDropdown(false);
  };

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

    if (!responsavel) {
      alert("Informe o responsável.");
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

  if (loadingData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
          Carregando...
        </div>
      </div>
    );
  }

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
              onChange={(e) => {
                setTipo(e.target.value as "item" | "lote");
                setItem(null);
                setLote(null);
              }}
            >
              <option value="item">Item (unitário)</option>
              <option value="lote">Lote (fracionado)</option>
            </select>
          </div>

          {/* Item com busca */}
          {tipo === "item" && (
            <div className="relative">
              <label className="font-medium mb-1 block">Item</label>
              <input
                type="text"
                placeholder="Buscar por nome ou código..."
                className="border rounded px-3 py-2 w-full"
                value={inputItens}
                onChange={(e) => setInputItens(e.target.value)}
                onFocus={() => setShowItensDropdown(true)}
              />

              {showItensDropdown && (
                <div className="absolute top-full left-0 right-0 border rounded shadow-lg bg-white z-10 mt-1">
                  <div
                    ref={scrollRefItens}
                    onScroll={handleScrollItens}
                    className="max-h-48 overflow-y-auto"
                  >
                    {itensPaginados().length > 0 ? (
                      itensPaginados().map((it) => (
                        <div
                          key={it.id}
                          onClick={() => handleSelectItem(it)}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${item === it.id ? "bg-blue-100" : ""
                            }`}
                        >
                          <div className="font-medium">{it.nome}</div>
                          <div className="text-sm text-gray-500">{it.codigo}</div>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-500 text-sm">
                        Nenhum item encontrado
                      </div>
                    )}
                  </div>
                </div>
              )}

              {item && (
                <div className="text-sm text-gray-600 mt-1">
                  Selecionado: {itens.find((i) => i.id === item)?.nome}
                </div>
              )}
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
                      {l.nome} - {l.codigo}
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
