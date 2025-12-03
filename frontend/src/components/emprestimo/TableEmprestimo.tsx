import { MdVisibility, MdAssignmentReturn } from "react-icons/md";
import { type Emprestimo } from "../../types/emprestimo";

function safeDate(dateString?: string | null) {
  if (!dateString) return "—";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
}

interface TableEmprestimoProps {
  emprestimos: Emprestimo[];
}

export default function TableEmprestimo({ emprestimos }: TableEmprestimoProps) {
  if (emprestimos.length === 0) {
    return (
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <div className="p-6 text-center text-gray-600">
          Nenhum empréstimo encontrado.
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full rounded-lg overflow-hidden">
        <thead className="bg-[#1A955E] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Solicitante</th>
            <th className="px-4 py-2 text-left">Empréstimo</th>
            <th className="px-4 py-2 text-left">Previsão Entrega</th>
            <th className="px-4 py-2 text-left">Devolução</th>
            <th className="px-4 py-2 text-left">Ações</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {emprestimos.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{emp.solicitante_nome}</td>
              <td className="px-4 py-2">{safeDate(emp.data_emprestimo)}</td>
              <td className="px-4 py-2">{safeDate(emp.previsao_entrega)}</td>
              <td className="px-4 py-2">{safeDate(emp.data_entrega)}</td>

              <td className="px-4 py-2 flex gap-4">
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <MdVisibility size={28} className="text-[#29854A]" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <MdAssignmentReturn size={28} className="text-[#29854A]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
