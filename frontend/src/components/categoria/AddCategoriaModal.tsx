import { type FormEvent } from "react";
import { useCreateCategoria } from "../../hooks/categoria/useCreateCategoria";

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
  const { criar, loading, erro } = useCreateCategoria();

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const nome = form.get("nome")?.toString() ?? "";

    if (!nome.trim()) return;

    try {
      const novaCategoria = await criar(nome); // ✔ chama o hook

      onCreated?.(novaCategoria); // notifica o pai
      onClose();                  // fecha o modal

    } catch {
      // erro já está no hook → nada a fazer aqui
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
