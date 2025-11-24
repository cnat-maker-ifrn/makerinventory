import { useEffect, useState } from "react";

interface Categoria {
  id: number;
  nome: string;
}

interface AddSubcategoriaModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddSubcategoriaModal({ open, onClose }: AddSubcategoriaModalProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Carrega categorias do backend
  useEffect(() => {
    if (!open) return; // só faz a requisição quando abrir
    async function fetchCategorias() {
      try {
        const resp = await fetch("http://localhost:8000/api/categorias/");
        const data = await resp.json();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }
    fetchCategorias();
  }, [open]);

  if (!open) return null; // <-- agora este return só vem DEPOIS dos hooks

  // Enviar dados
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      nome: form.get("nome"),
      categoria: form.get("categoria"),
    };

    try {
      const resp = await fetch("http://localhost:8000/api/subcategorias/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const msg = await resp.text();
        throw new Error(msg || "Erro ao salvar subcategoria");
      }

      onClose();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">

        <h2 className="text-xl font-semibold mb-4">Cadastrar subcategoria</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block mb-1 font-semibold">Categoria</label>
            <select name="categoria" required className="w-full border rounded-md p-2">
              <option value="">Selecione...</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nome da subcategoria</label>
            <input
              type="text"
              name="nome"
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <div className="flex justify-end mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
