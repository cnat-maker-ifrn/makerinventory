import { useEffect, useState, type FormEvent } from "react";
import { getCategorias, type Categoria } from "../../api/categoriaApi";
import { type Subcategoria } from "../../api/subcategoriaApi";
import { useCreateSubcategoria } from "../../hooks/subcategoria/useCreateSubcategoria";

interface AddSubcategoriaModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (nova: Subcategoria) => void;
}

export default function AddSubcategoriaModal({ open, onClose, onCreated }: AddSubcategoriaModalProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // ✔ agora vem tudo do hook
  const { criar, loading, erro } = useCreateSubcategoria();

  useEffect(() => {
    if (!open) return;
    let ativo = true;

    getCategorias()
      .then((data) => ativo && setCategorias(data))
      .catch(console.error);

    return () => {
      ativo = false;
    };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const nome = form.get("nome");
    const categoria = form.get("categoria");

    if (!nome || !categoria) return;

    const nova = await criar({ nome, categoria });

    if (nova) {
      onCreated?.(nova);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Cadastrar subcategoria</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Categoria */}
          <div>
            <label className="block mb-1 font-semibold">Categoria</label>
            <select name="categoria" required className="w-full border rounded-md p-2">
              <option value="">Selecione...</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          {/* Nome */}
          <div>
            <label className="block mb-1 font-semibold">Nome da subcategoria</label>
            <input
              type="text"
              name="nome"
              required
              className="w-full border rounded-md p-2"
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
