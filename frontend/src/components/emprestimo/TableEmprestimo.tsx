import { MdVisibility, MdAssignmentReturn } from "react-icons/md";

interface Emprestimo {
  id: number;
  solicitante: string;
  data_emprestimo: string;
  previsao_entrega: string;
  data_entrega?: string | null;
}

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
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#1A955E] text-white text-[18px]">
          <tr>
            <th className="p-4">Solicitante</th>
            <th className="p-4">Empréstimo</th>
            <th className="p-4">Previsão Entrega</th>
            <th className="p-4">Devolução</th>
            <th className="p-4 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {emprestimos.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-100 transition">
              <td className="p-4">{emp.solicitante}</td>
              <td className="p-4">{safeDate(emp.data_emprestimo)}</td>
              <td className="p-4">{safeDate(emp.previsao_entrega)}</td>
              <td className="p-4">{safeDate(emp.data_entrega)}</td>

              <td className="p-4 flex justify-center gap-4">
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

        {emprestimos.length === 0 && (
          <tfoot>
            <tr>
              <td colSpan={5} className="text-center p-6 text-gray-600">
                Nenhum empréstimo encontrado.
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
