import { useState, useEffect } from "react";
import ModalCadastro from "../utils/ModalCadastro";

interface Categoria {
  id: number;
  nome: string;
}

export default function SelectCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/categorias/")
      .then((res) => res.json())
      .then((data: Categoria[]) => setCategorias(data));
  }, []);

  return (
    <div className="p-4">
      <label className="block font-medium mb-2">Categoria:</label>
      <select
        value={categoriaSelecionada}
        onChange={(e) =>
          e.target.value === "nova"
            ? setShowModal(true)
            : setCategoriaSelecionada(e.target.value)
        }
        className="border rounded p-2 w-64"
      >
        <option value="">Selecione...</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nome}
          </option>
        ))}
        <option value="nova">+ Nova categoria...</option>
      </select>

      {showModal && (
        <ModalCadastro
          tipo="categoria"
          onClose={() => setShowModal(false)}
          onCreated={(nova) => setCategorias([...categorias, nova])}
        />
      )}
    </div>
  );
}
