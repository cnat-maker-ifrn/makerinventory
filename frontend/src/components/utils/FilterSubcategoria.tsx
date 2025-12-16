import { useSubcategorias } from "../../hooks/subcategoria/useSubcategorias";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSubcategoria({ value, onChange }: Props) {
  const { dados: subcategorias, loading, erro } = useSubcategorias();

  if (loading) {
    return (
      <select className="bg-white border rounded-lg px-4 py-2 shadow text-gray-400">
        <option>Carregando...</option>
      </select>
    );
  }

  if (erro) {
    return (
      <select className="bg-white border rounded-lg px-4 py-2 shadow text-red-500">
        <option>Erro ao carregar</option>
      </select>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border rounded-lg px-4 py-2 shadow text-gray-700"
    >
      <option value="todas">Todas as subcategorias</option>

      {subcategorias.map((sub) => (
        <option key={sub.id} value={sub.nome}>
          {sub.nome}
        </option>
      ))}
    </select>
  );
}
