import { useEffect, useState } from "react";
import { getCategorias, type Categoria } from "../../api/categoriaApi";
import { createSubcategoria, type Subcategoria } from "../../api/subcategoriaApi";

interface AddSubcategoriaModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (nova: Subcategoria) => void;
}

export default function AddSubcategoriaModal({ open, onClose, onCreated }: AddSubcategoriaModalProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!open) return;
    let ativo = true;

    getCategorias()
      .then((data) => { if (ativo) setCategorias(data); })
      .catch(console.error);

    return () => { ativo = false; };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const nome = form.get("nome");
    const categoria = form.get("categoria");

    if (!nome || !categoria) {
      setErro("Todos os campos são obrigatórios");
      setLoading(false);
      return;
    }

    try {
      const novaSubcategoria = await createSubcategoria({ nome, categoria });

      if (onCreated) onCreated(novaSubcategoria);

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
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Nome da subcategoria</label>
            <input type="text" name="nome" required className="w-full border rounded-md p-2" />
          </div>

          {erro && <p className="text-red-600 text-sm">{erro}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md" disabled={loading}>
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]">
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
