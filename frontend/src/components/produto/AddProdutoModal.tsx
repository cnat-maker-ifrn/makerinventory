import { useEffect, useState, type FormEvent } from "react";
import { getSubcategorias } from "../../api/subcategoriaApi";
import { useCreateProduto } from "../../hooks/produto/useCreateProduto";
import { type Subcategoria } from "../../types/subcategoria";

interface AddProdutoModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (produto: any) => void;
}

export default function AddProdutoModal({
  open,
  onClose,
  onCreated,
}: AddProdutoModalProps) {
  const [tipo, setTipo] = useState<"unitario" | "fracionado">("unitario");
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { criar, loading, erro } = useCreateProduto();

  useEffect(() => {
    if (!open) {
      setFoto(null);
      setPreview(null);
    }

    getSubcategorias()
      .then((res) => setSubcategorias(res))
      .catch(console.error);
  }, [open]);

  if (!open) return null;

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const nome = form.get("nome");
    const subcategoria = form.get("subcategoria");

    if (!nome || !subcategoria) return;

    if (foto) {
      form.append("foto", foto);
    }

    try {
      const novo = await criar(form, tipo);

      if (novo && onCreated) onCreated(novo);

      setFoto(null);
      setPreview(null);
      onClose();
    } catch {
      // erro já está no hook e exibido na tela
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Cadastrar produto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ------------------ TIPO ------------------ */}
          <div>
            <label className="font-medium">Tipo do produto</label>
            <select
              className="border px-3 py-2 rounded-md w-full"
              value={tipo}
              onChange={(e) =>
                setTipo(e.target.value as "unitario" | "fracionado")
              }
            >
              <option value="unitario">Unitário</option>
              <option value="fracionado">Fracionado</option>
            </select>
          </div>

          {/* ------------------ NOME ------------------ */}
          <div>
            <label className="font-medium">Nome</label>
            <input
              name="nome"
              required
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>

          {/* ------------------ SUBCATEGORIA ------------------ */}
          <div>
            <label className="font-medium">Subcategoria</label>
            <select
              name="subcategoria"
              required
              className="border px-3 py-2 rounded-md w-full"
            >
              <option value="">Selecione...</option>
              {subcategorias.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome}
                </option>
              ))}
            </select>
          </div>
          {/* ------------------ UNIDADE DE MEDIDA (APENAS PARA FRACIONADO) ------------------ */}
          {tipo === "fracionado" && (
            <div>
              <label className="font-medium">Unidade de Medida</label>
              <select
                name="unidade_de_medida"
                required={tipo === "fracionado"}
                className="border px-3 py-2 rounded-md w-full"
              >
                <option value="">Selecione...</option>
                <option value="kg">Quilograma (kg)</option>
                <option value="g">Grama (g)</option>
                <option value="l">Litro (l)</option>
                <option value="ml">Mililitro (ml)</option>
                <option value="m">Metro (m)</option>
                <option value="cm">Centímetro (cm)</option>
              </select>
            </div>
          )}


          {/* ------------------ QUANTIDADE MÍNIMA ------------------ */}
          <div>
            <label className="font-medium">Quantidade mínima</label>
            <input
              type="number"
              name="quantidade_minima"
              required
              min={0}
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>

          {/* ------------------ IMAGEM ------------------ */}
          <div>
            <label className="block font-medium mb-1">Imagem</label>
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

          {/* ------------------ ERRO ------------------ */}
          {erro && <p className="text-red-600">{erro}</p>}

          {/* ------------------ AÇÕES ------------------ */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-70"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
