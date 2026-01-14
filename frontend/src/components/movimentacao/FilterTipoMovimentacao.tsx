interface Props {
  tipoMovimentacao: string;
  onChangeTipo: (value: string) => void;
}

export default function FilterTipoMovimentacao({
  tipoMovimentacao,
  onChangeTipo,
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">
        Tipo de Movimentação
      </label>
      <select
        value={tipoMovimentacao}
        onChange={(e) => onChangeTipo(e.target.value)}
        className="bg-white border rounded-lg px-4 py-2 shadow text-gray-700 cursor-pointer"
      >
        <option value="">Todos</option>
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
        <option value="emprestimo">Empréstimo</option>
        <option value="devolucao">Devolução</option>
      </select>
    </div>
  );
}
