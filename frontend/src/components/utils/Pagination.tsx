interface Props {
  page: number;
  total: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  total,
  pageSize = 20,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-end mt-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Anterior
      </button>

      <span className="px-3 py-1">
        Página {page} de {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}
