import { useState, useEffect } from "react";
import { updateItem } from "../../api/itemApi";
import { type Item } from "../../types/item";

interface EditItemModalProps {
  open: boolean;
  item: Item | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditItemModal({
  open,
  item,
  onClose,
  onSuccess,
}: EditItemModalProps) {
  const [preco, setPreco] = useState("");
  const [proprietario, setProprietario] = useState("true");
  const [quebrado, setQuebrado] = useState(false);
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (open && item) {
      setPreco(String(item.preco));
      setProprietario(item.eh_do_cnatmaker ? "true" : "false");
      setQuebrado(item.eh_quebrado);
      setFoto(null);
      setPreview(item.foto);
      setErro("");
    }
  }, [open, item]);

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

    if (!item) return;

    setLoading(true);
    setErro("");

    try {
      const form = new FormData();
      form.append("preco", preco);
      form.append("eh_do_cnatmaker", proprietario);
      form.append("eh_quebrado", String(quebrado));

      if (foto) {
        form.append("imagem", foto);
      }

      await updateItem(item.id, form);
      if (onSuccess) onSuccess();
      onClose();
    } catch (e: any) {
      const data = e?.response?.data;
      let msg = "Erro ao atualizar item";

      if (data) {
        if (typeof data === "string") {
          msg = data;
        } else if (data.detail) {
          msg = data.detail;
        } else {
          const key = Object.keys(data)[0];
          msg = Array.isArray(data[key]) ? data[key][0] : data[key];
        }
      }

      setErro(msg);
    } finally {
      setLoading(false);
    }
  }

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Editar Item</h2>

        {erro && (
          <p className="text-red-600 text-sm mb-3">{erro}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Foto */}
          <div>
            <label className="block font-medium mb-1">Foto</label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded mb-2"
              />
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

          {/* Proprietário */}
          <div>
            <label className="block font-medium mb-1">Proprietário</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={proprietario}
              onChange={(e) => setProprietario(e.target.value)}
              disabled={loading}
            >
              <option value="true">CNAT Maker</option>
              <option value="false">IFRN</option>
            </select>
          </div>

          {/* Quebrado */}
          <div>
            <label className="block font-medium mb-1">Estado</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="estado"
                  value="bom"
                  checked={!quebrado}
                  onChange={() => setQuebrado(false)}
                  disabled={loading}
                />
                <span>Bom</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="estado"
                  value="quebrado"
                  checked={quebrado}
                  onChange={() => setQuebrado(true)}
                  disabled={loading}
                />
                <span>Quebrado</span>
              </label>
            </div>
          </div>

          {/* Preço */}
          <div>
            <label className="block font-medium mb-1">Preço</label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full border rounded px-3 py-2"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              disabled={loading}
            />
            <span className="absolute right-3 text-gray-500 pointer-events-none">
              R$
            </span>
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
