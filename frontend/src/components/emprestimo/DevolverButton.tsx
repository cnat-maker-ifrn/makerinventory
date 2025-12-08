import { MdAssignmentReturn } from "react-icons/md";
import { useCreateDevolucao } from "../../hooks/devolucao/useCreateDevolucao";

interface Props {
  emprestimoId: number;
  itensIds: number[];
  dataEntrega?: string | null; // <- novo prop
  onSuccess?: () => void;
}

export default function DevolverButton({ emprestimoId, itensIds, dataEntrega, onSuccess }: Props) {
  const { criar, loading } = useCreateDevolucao();

  const jaDevolvido = !!dataEntrega; // se dataEntrega existir, já foi devolvido

  async function handleDevolver() {
    if (jaDevolvido) return; // não faz nada

    try {
      await criar({
        emprestimo: emprestimoId,
        itens: itensIds,
        observacao: null,
      });

      alert("Devolução registrada com sucesso!");
      onSuccess?.();
    } catch (e) {
      console.error(e);
      alert("Erro ao registrar devolução.");
    }
  }

  return (
    <button
      onClick={handleDevolver}
      disabled={loading || jaDevolvido}
      className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
    >
      <MdAssignmentReturn size={28} className="text-[#29854A]" />
    </button>
  );
}
