import { useEffect, useState } from "react";
import { useCreateLote } from "../../hooks/lote/useCreateLote";
import { type ProdutoFracionado } from "../../types/produtofracionado";

interface AddLoteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddLoteModal({ open, onClose }: AddLoteModalProps) {
  const [produtos, setProdutos] = useState<ProdutoFracionado[]>([]);
  const { criar, loading, erro } = useCreateLote();

  const [form, setForm] = useState({
    produto: "",
    quantidade: "",
    preco: "",
    fornecedor: "",
    validade: "",
    foto: null as File | null,
  });

  // Buscar produtos fracionados quando o modal abre
  useEffect(() => {
    if (open) {
      fetch("http://127.0.0.1:8000/api/produtos-fracionados/")
        .then((res) => res.json())
        .then((data) => setProdutos(data))
        .catch(() => console.error("Erro ao buscar produtos fracionados"));
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, foto: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await criar({
      produto: Number(form.produto),
      quantidade: form.quantidade,
      preco: form.preco,
      fornecedor: form.fornecedor,
      data_validade: form.validade,
      foto: form.foto,
    });

    if (ok) {
      alert("Lote cadastrado com sucesso!");
      setForm({
        produto: "",
        quantidade: "",
        preco: "",
        fornecedor: "",
        validade: "",
        foto: null,
      });
      onClose();
    } else {
      alert("Erro ao cadastrar o lote");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center px-4 z-50 bg-black/30">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">

        <h2 className="text-xl font-semibold mb-4">Cadastrar novo lote</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Produto fracionado */}
          <div>
            <label className="block mb-1 font-semibold">Produto fracionado</label>
            <select
              name="produto"
              value={form.produto}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Selecione...</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Quantidade */}
          <div>
            <label className="block mb-1 font-semibold">Quantidade</label>
            <input
              type="number"
              name="quantidade"
              step="0.01"
              value={form.quantidade}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Preço */}
          <div>
            <label className="block mb-1 font-semibold">Preço</label>
            <input
              type="number"
              name="preco"
              step="0.01"
              value={form.preco}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Fornecedor */}
          <div>
            <label className="block mb-1 font-semibold">Fornecedor</label>
            <input
              type="text"
              name="fornecedor"
              value={form.fornecedor}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Data de validade */}
          <div>
            <label className="block mb-1 font-semibold">Data de validade</label>
            <input
              type="date"
              name="validade"
              value={form.validade}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Foto */}
          <div>
            <label className="block mb-1 font-semibold">Foto (opcional)</label>
            <input type="file" onChange={handleFile} />
          </div>

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
              className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>

        </form>

        {erro && (
          <p className="text-red-600 text-sm mt-2">
            {erro}
          </p>
        )}
      </div>
    </div>
  );
}
