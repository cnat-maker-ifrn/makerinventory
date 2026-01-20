import { useEffect, useState } from "react";
import { useCreateItem } from "../../hooks/item/useCreateItem";
import { getProdutosUnitarios } from "../../api/produtoApi";
import { type ProdutoUnitario } from "../../types/produtounitario";

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddItemModal({ open, onClose }: AddItemModalProps) {
  const [produtos, setProdutos] = useState<ProdutoUnitario[]>([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);

  // Form states
  const [produtoId, setProdutoId] = useState<number | "">("");
  const [preco, setPreco] = useState("");
  const [proprietario, setProprietario] = useState<boolean>(true);
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { criar, loading, erro } = useCreateItem();

  const isBusy = loading || loadingProdutos;

  // Resetar formulário sempre que abrir o modal
  useEffect(() => {
    if (open) {
      setProdutoId("");
      setPreco("");
      setProprietario(true);
      setFoto(null);
      setPreview(null);
    }
  }, [open]);

  // Carregar produtos unitários ao abrir
  useEffect(() => {
    if (!open) return;

    async function fetchProdutos() {
      setLoadingProdutos(true);

      try {
        const data = await getProdutosUnitarios();

        // Lidar com resposta que pode ser array ou PaginatedResponse
        const produtosList = Array.isArray(data)
          ? data
          : data.results || [];

        setProdutos(produtosList);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoadingProdutos(false);
      }
    }

    fetchProdutos();
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (produtoId === "") {
      alert("Selecione um produto válido.");
      return;
    }

    const produtoSelecionado = produtos.find(p => p.id === produtoId);
    const nomeProduto = produtoSelecionado?.nome || "";

    const sucesso = await criar({
      nome: nomeProduto,
      produto: Number(produtoId),
      preco,
      eh_do_cnatmaker: proprietario,
      imagem: foto,
    });

    if (sucesso) {
      onClose();
    }
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center px-4 z-50 transition ${open ? "bg-black/40 visible" : "invisible"
        }`}
    >
      {open && (
        <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Cadastrar novo item</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Produto Unitário */}
            <div>
              <label className="block mb-1 font-semibold">Produto (unitário)</label>

              {loadingProdutos ? (
                <div className="text-gray-500">Carregando...</div>
              ) : (
                <select
                  required
                  className="w-full border rounded-md p-2"
                  value={produtoId}
                  onChange={(e) => setProdutoId(Number(e.target.value))}
                  disabled={isBusy}
                >
                  <option value="">Selecione...</option>

                  {produtos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Preço */}
            <div>
              <label className="block mb-1 font-semibold">Preço</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full border rounded-md p-2"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                disabled={isBusy}
              />
            </div>

            {/* Proprietário */}
            <div>
              <label className="block mb-1 font-semibold">Proprietário</label>
              <select
                className="w-full border rounded-md p-2"
                value={proprietario ? "true" : "false"}
                onChange={(e) => setProprietario(e.target.value === "true")}
                disabled={isBusy}
              >
                <option value="true">CNAT Maker</option>
                <option value="false">IFRN</option>
              </select>
            </div>

            {/* Foto */}
            <div>
              <label className="block mb-1 font-semibold">Foto</label>
              {preview && (
                <div className="bg-gray-100 rounded mb-2 p-2 flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 object-contain"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded px-3 py-2 
             file:mr-5 file:py-1 file:px-4 
             file:rounded-border file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100"
                disabled={isBusy}
                onChange={handleFotoChange}
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
