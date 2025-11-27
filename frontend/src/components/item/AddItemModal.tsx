import { useEffect, useState } from "react";

interface ProdutoUnitario {
  id: number;
  nome: string;
}

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddItemModal({ open, onClose }: AddItemModalProps) {
  const [produtos, setProdutos] = useState<ProdutoUnitario[]>([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);

  // Estado do formulário
  const [nome, setNome] = useState("");
  const [produtoId, setProdutoId] = useState<number | "">("");
  const [preco, setPreco] = useState("");
  const [proprietario, setProprietario] = useState("true");
  const [foto, setFoto] = useState<File | null>(null);

  // 🔥 Hooks sempre executam – nunca dentro de if (!open)
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/produtos-unitarios/");
        const data = await response.json();
        setProdutos(data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoadingProdutos(false);
      }
    }

    fetchProdutos();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (produtoId === "") {
      alert("Selecione um produto válido.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("produto", String(produtoId));
    formData.append("preco", preco);
    formData.append("proprietario_cnat", proprietario);
    if (foto) formData.append("imagem", foto);

    try {
      await fetch("http://127.0.0.1:8000/api/itens/", {
        method: "POST",
        body: formData,
      });

      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar item:", error);
      alert("Erro ao cadastrar item");
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center px-4 z-50 transition ${
        open ? "bg-black/40 visible" : "invisible"
      }`}
    >
      {open && (
        <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">

          <h2 className="text-xl font-semibold mb-4">Cadastrar novo item</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Nome */}
            <div>
              <label className="block mb-1 font-semibold">Nome</label>
              <input
                type="text"
                required
                className="w-full border rounded-md p-2"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

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
                >
                  <option value="">Selecione...</option>

                  {produtos.map((p) => (
                    <option key={`produto-${p.id}`} value={p.id}>
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
              />
            </div>

            {/* Proprietário */}
            <div>
              <label className="block mb-1 font-semibold">Proprietário</label>
              <select
                className="w-full border rounded-md p-2"
                value={proprietario}
                onChange={(e) => setProprietario(e.target.value)}
              >
                <option value="true">CNAT Maker</option>
                <option value="false">IFRN</option>
              </select>
            </div>

            {/* Foto */}
            <div>
              <label className="block mb-1 font-semibold">Foto</label>
              <input
                type="file"
                onChange={(e) =>
                  e.target.files && setFoto(e.target.files[0])
                }
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
              >
                Salvar
              </button>
            </div>

          </form>

        </div>
      )}
    </div>
  );
}
