import { useEffect, useState, useRef, useCallback } from "react";
import { useCreateEmprestimo } from "../../hooks/emprestimo/useCreateEmprestimo";
import { getSolicitantes } from "../../api/solicitanteApi";
import { getItens } from "../../api/itemApi";
import { type Item } from "../../types/item";
import { type Solicitante } from "../../types/solicitante";

interface AddEmprestimoModalProps {
  open: boolean;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

export default function AddEmprestimoModal({ open, onClose }: AddEmprestimoModalProps) {
  const [solicitantes, setSolicitantes] = useState<Solicitante[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Input fields
  const [inputSolicitante, setInputSolicitante] = useState("");
  const [inputItens, setInputItens] = useState("");

  // Paginação
  const [pageSolicitante, setPageSolicitante] = useState(0);
  const [pageItens, setPageItens] = useState(0);

  // Dropdown visibility
  const [showSolicitanteDropdown, setShowSolicitanteDropdown] = useState(false);
  const [showItensDropdown, setShowItensDropdown] = useState(false);

  // Estados do formulário
  const [solicitanteId, setSolicitanteId] = useState<number | "">("");
  const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);
  const [previsaoEntrega, setPrevisaoEntrega] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const scrollRefSolicitantes = useRef<HTMLDivElement>(null);
  const scrollRefItens = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { criar, loading, erro } = useCreateEmprestimo();
  const isBusy = loading || loadingData;

  // Resetar formulário ao abrir
  useEffect(() => {
    if (open) {
      setSolicitanteId("");
      setItensSelecionados([]);
      setPrevisaoEntrega("");
      setResponsavel("");
      setInputSolicitante("");
      setInputItens("");
      setPageSolicitante(0);
      setPageItens(0);
      setShowSolicitanteDropdown(false);
      setShowItensDropdown(false);
    }
  }, [open]);

  // Carregar dados ao abrir
  useEffect(() => {
    if (!open) return;

    async function fetchData() {
      setLoadingData(true);
      try {
        const [solicitantesData, itensData] = await Promise.all([
          getSolicitantes(),
          getItens(),
        ]);
        
        const solicitantesList = Array.isArray(solicitantesData) 
          ? solicitantesData 
          : (solicitantesData as any)?.results || [];
          
        const itensList = Array.isArray(itensData) 
          ? itensData 
          : (itensData as any)?.results || [];
        
        setSolicitantes(solicitantesList);
        setItens(itensList.filter((i:any) => i.disponibilidade));
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, [open]);

  // Filtrar solicitantes
  const solicitantesFiltrados = useCallback(() => {
    return solicitantes.filter((s) =>
      s.nome.toLowerCase().includes(inputSolicitante.toLowerCase())
    );
  }, [solicitantes, inputSolicitante]);

  // Filtrar itens
  const itensFiltrados = useCallback(() => {
    return itens.filter((i) =>
      i.nome.toLowerCase().includes(inputItens.toLowerCase()) ||
      i.codigo.toLowerCase().includes(inputItens.toLowerCase())
    );
  }, [itens, inputItens]);

  // Solicitantes paginados
  const solicitantesPaginados = useCallback(() => {
    const filtered = solicitantesFiltrados();
    return filtered.slice(0, (pageSolicitante + 1) * ITEMS_PER_PAGE);
  }, [solicitantesFiltrados, pageSolicitante]);

  // Itens paginados
  const itensPaginados = useCallback(() => {
    const filtered = itensFiltrados();
    return filtered.slice(0, (pageItens + 1) * ITEMS_PER_PAGE);
  }, [itensFiltrados, pageItens]);

  // Handler scroll solicitantes
  const handleScrollSolicitantes = useCallback(() => {
    if (!scrollRefSolicitantes.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRefSolicitantes.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (solicitantesPaginados().length < solicitantesFiltrados().length) {
        setPageSolicitante((prev) => prev + 1);
      }
    }
  }, [solicitantesPaginados, solicitantesFiltrados]);

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
    setPageSolicitante(0);
  }, [inputSolicitante]);

  useEffect(() => {
    setPageItens(0);
  }, [inputItens]);

  // Handler para selecionar solicitante
  const handleSelectSolicitante = (s: Solicitante) => {
    setSolicitanteId(s.id);
    setInputSolicitante(s.nome);
    setShowSolicitanteDropdown(false);
  };

  // Handler para marcar/desmarcar itens
  const handleToggleItem = (id: number) => {
    setItensSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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

    const dataEmprestimoISO = new Date().toISOString();
    const previsaoEntregaISO = new Date(previsaoEntrega).toISOString();

    const sucesso = await criar({
      solicitante: Number(solicitanteId),
      itens: itensSelecionados,
      previsao_entrega: previsaoEntregaISO,
      responsavel,
      data_emprestimo: dataEmprestimoISO, 
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
        <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg" ref={containerRef}>
          <h2 className="text-xl font-semibold mb-4">Cadastrar novo empréstimo</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Solicitante */}
            <div className="relative">
              <label className="block mb-1 font-semibold">Solicitante</label>
              <input
                type="text"
                placeholder="Digite o nome do solicitante..."
                className="w-full border rounded-md p-2"
                value={inputSolicitante}
                onChange={(e) => {
                  setInputSolicitante(e.target.value);
                  if (e.target.value.length > 0) {
                    setShowSolicitanteDropdown(true);
                  }
                }}
                onFocus={() => inputSolicitante.length > 0 && setShowSolicitanteDropdown(true)}
                disabled={isBusy}
              />

              {showSolicitanteDropdown && inputSolicitante.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 border rounded-md bg-white shadow-lg z-10"
                >
                  <div
                    className="max-h-48 overflow-y-auto"
                    ref={scrollRefSolicitantes}
                    onScroll={handleScrollSolicitantes}
                  >
                    {loadingData ? (
                      <div className="p-2 text-gray-500">Carregando...</div>
                    ) : solicitantesPaginados().length === 0 ? (
                      <div className="p-2 text-gray-500">Nenhum solicitante encontrado</div>
                    ) : (
                      solicitantesPaginados().map((s) => (
                        <div
                          key={s.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleSelectSolicitante(s)}
                        >
                          <div className="font-semibold">{s.nome}</div>
                          {s.matricula && (
                            <div className="text-xs text-gray-600">Matrícula: {s.matricula}</div>
                          )}
                        </div>
                      ))
                    )}
                    {solicitantesFiltrados().length > solicitantesPaginados().length && (
                      <div className="p-2 text-xs text-gray-500 text-center bg-gray-50">
                        Scroll para carregar mais
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Itens Selecionados */}
            {itensSelecionados.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <div className="text-sm font-semibold text-blue-900 mb-2">
                  Itens selecionados ({itensSelecionados.length})
                </div>
                <div className="space-y-1">
                  {itens
                    .filter((i) => itensSelecionados.includes(i.id))
                    .map((i) => (
                      <div key={i.id} className="flex items-center justify-between text-sm bg-white p-2 rounded border border-blue-100">
                        <span>{i.nome} ({i.codigo})</span>
                        <button
                          type="button"
                          onClick={() => handleToggleItem(i.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Itens */}
            <div className="relative">
              <label className="block mb-1 font-semibold">Itens</label>
              <input
                type="text"
                placeholder="Digite o nome ou código do item..."
                className="w-full border rounded-md p-2"
                value={inputItens}
                onChange={(e) => {
                  setInputItens(e.target.value);
                  if (e.target.value.length > 0) {
                    setShowItensDropdown(true);
                  }
                }}
                onFocus={() => inputItens.length > 0 && setShowItensDropdown(true)}
                disabled={isBusy}
              />

              {showItensDropdown && inputItens.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 border rounded-md bg-white shadow-lg z-10"
                >
                  <div
                    className="max-h-48 overflow-y-auto"
                    ref={scrollRefItens}
                    onScroll={handleScrollItens}
                  >
                    {loadingData ? (
                      <div className="p-2 text-gray-500">Carregando...</div>
                    ) : itensPaginados().length === 0 ? (
                      <div className="p-2 text-gray-500">Nenhum item encontrado</div>
                    ) : (
                      itensPaginados().map((i) => (
                        <label
                          key={i.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        >
                          <input
                            type="checkbox"
                            checked={itensSelecionados.includes(i.id)}
                            onChange={() => handleToggleItem(i.id)}
                            disabled={isBusy}
                          />
                          <div>
                            <div className="font-semibold text-sm">{i.nome}</div>
                            <div className="text-xs text-gray-600">{i.codigo}</div>
                          </div>
                        </label>
                      ))
                    )}
                    {itensFiltrados().length > itensPaginados().length && (
                      <div className="p-2 text-xs text-gray-500 text-center bg-gray-50">
                        Scroll para carregar mais
                      </div>
                    )}
                  </div>
                </div>
              )}
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
