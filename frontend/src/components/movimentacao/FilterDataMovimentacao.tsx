interface Props {
  dataInicio: string;
  dataFim: string;
  onChangeInicio: (value: string) => void;
  onChangeFim: (value: string) => void;
}

export default function FilterDataMovimentacao({
  dataInicio,
  dataFim,
  onChangeInicio,
  onChangeFim,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">
          Data inicial
        </label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => onChangeInicio(e.target.value)}
          className="bg-white border rounded-lg px-4 py-2 shadow text-gray-700"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">
          Data final
        </label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => onChangeFim(e.target.value)}
          className="bg-white border rounded-lg px-4 py-2 shadow text-gray-700"
        />
      </div>
    </div>
  );
}
