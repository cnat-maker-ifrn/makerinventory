import { useEffect, useState } from "react";

type CategoriaType = {
  id: number;
  nome: string;
};

export default function Categoria() {
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categorias/")
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar categorias:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando categorias...</p>;

  return (
    <div>
      <h1 className="text-[#00FF00]">Categorias</h1>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.nome}</li>
        ))}
      </ul>
    </div>
  );
}
