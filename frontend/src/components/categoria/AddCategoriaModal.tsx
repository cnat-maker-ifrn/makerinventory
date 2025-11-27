import { useState } from "react";

interface AddCategoriaModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (novaCategoria: Categoria) => void;
}

export interface Categoria {
  id: number;
  nome: string;
}

export default function AddCategoriaModal({ open, onClose, onCreated }: AddCategoriaModalProps) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = { nome: form.get("nome") };

    try {
      const resp = await fetch("http://localhost:8000/api/categorias/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const msg = await resp.text();
        throw new Error(msg || "Erro ao salvar categoria");
      }

      const novaCategoria: Categoria = await resp.json();
      onCreated?.(novaCategoria); // chama callback se houver
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
        <h2 className="text-xl font-semibold mb-4">Cadastrar nova categoria</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Nome da categoria</label>
            <input
              type="text"
              name="nome"
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <div className="flex justify-end gap-2 mt-4">
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
              disabled={loading}
              className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
