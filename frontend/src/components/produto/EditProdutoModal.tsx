import { useState, useEffect } from "react";
import { useUpdateProduto } from "../../hooks/produto/useUpdateProduto";
import { type ProdutoUnificado } from "../../types/produtounificado";

interface EditProdutoModalProps {
  open: boolean;
  produto: ProdutoUnificado | null;
  tipo: "unitario" | "fracionado";
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditProdutoModal({
  open,
  produto,
  tipo,
  onClose,
  onSuccess,
}: EditProdutoModalProps) {
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { atualizar, loading, erro } = useUpdateProduto();

  useEffect(() => {
    if (open && produto) {
      setNome(produto.nome);
      setFoto(null);
      setPreview(produto.foto);
    }
  }, [open, produto]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!produto) return;

    const form = new FormData();
    form.append("nome", nome);
    if (foto) {
      form.append("foto", foto);
    }

    try {
      await atualizar(produto.id, form, tipo);
      if (onSuccess) onSuccess();
      onClose();
    } catch (e) {
      console.error("Erro ao atualizar:", e);
    }
  }

  if (!open || !produto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Editar Produto</h2>

        {erro && (
          <p className="text-red-600 text-sm mb-3">{erro}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block font-medium mb-1">Nome</label>
            <input
              type="text"
              required
              className="w-full border rounded px-3 py-2"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Foto */}
          <div>
            <label className="block font-medium mb-1">Foto</label>
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
              onChange={handleFotoChange}
              disabled={loading}
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
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
