// src/components/ModalCadastro.tsx
import { useState, type FormEvent } from "react";

interface ModalCadastroProps {
  tipo: "categoria" | "subcategoria";
  categorias?: { id: number; nome: string }[]; // só precisa se for subcategoria
  onClose: () => void;
  onCreated: (novoItem: any) => void;
}

export default function ModalCadastro({
  tipo,
  categorias,
  onClose,
  onCreated,
}: ModalCadastroProps) {
  const [nome, setNome] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const url =
      tipo === "categoria"
        ? "http://localhost:8000/api/categorias/"
        : "http://localhost:8000/api/subcategorias/";

    const body =
      tipo === "categoria"
        ? { nome }
        : { nome, categoria: parseInt(categoriaId) };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const novoItem = await response.json();
      onCreated(novoItem);
      onClose();
    } else {
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-3">
          Nova {tipo === "categoria" ? "Categoria" : "Subcategoria"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder={`Nome da ${tipo}`}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 w-full rounded"
          />

          {tipo === "subcategoria" && categorias && (
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="border p-2 w-full rounded"
              required
            >
              <option value="">Selecione a categoria...</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
