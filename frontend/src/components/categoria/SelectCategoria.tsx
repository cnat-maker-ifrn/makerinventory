import { useState, useEffect } from "react";
import AddCategoriaModal, { type Categoria } from "./AddCategoriaModal";
import { getCategorias } from "../../api/categoriaApi";

export default function SelectCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let ativo = true;
    getCategorias()
      .then((data) => { if (ativo) setCategorias(data); })
      .catch(console.error);
    return () => { ativo = false; };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === "nova") setShowModal(true);
    else setCategoriaSelecionada(value);
  }

  return (
    <div className="p-4">
      <label className="block font-medium mb-2">Categoria:</label>
      <select
        value={categoriaSelecionada}
        onChange={handleChange}
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
        <AddCategoriaModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onCreated={(nova) => setCategorias([...categorias, nova])}
        />
      )}
    </div>
  );
}
