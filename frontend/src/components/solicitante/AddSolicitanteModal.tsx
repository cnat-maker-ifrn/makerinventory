import { useState } from "react";
import { useCreateSolicitante } from "../../hooks/solicitante/useCreateSolicitante";

interface AddSolicitanteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddSolicitanteModal({ open, onClose }: AddSolicitanteModalProps) {
  const [form, setForm] = useState({ nome: "", matricula: "", telefone: "" });
  const { criar, loading, erro } = useCreateSolicitante();

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sucesso = await criar({
      nome: form.nome,
      matricula: form.matricula,
      telefone: form.telefone || undefined,
    });
    if (sucesso) {
      setForm({ nome: "", matricula: "", telefone: "" });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Adicionar Solicitante</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-semibold">Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Matrícula</label>
            <input
              type="text"
              name="matricula"
              value={form.matricula}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          {erro && <div className="text-red-600">{erro}</div>}

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">
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
