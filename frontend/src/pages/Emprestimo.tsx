import { useState } from "react";

import SearchBar from "../components/utils/SearchBar";
import TableEmprestimo from "../components/emprestimo/TableEmprestimo";
import AddSolicitanteButton from "../components/solicitante/AddSolicitanteButton";
import AddEmprestimoButton from "../components/emprestimo/AddEmprestimoButton";
import { useEmprestimos } from "../hooks/emprestimo/useEmprestimos";

export default function Emprestimo() {
  const { dados: emprestimos, loading, erro } = useEmprestimos();
  const [busca, setBusca] = useState("");

  if (loading) return <div>Carregando empréstimos...</div>;
  if (erro) return <div className="text-red-600">{erro}</div>;

  return (
    <>
      <h1 className="text-3xl font-bold text-[#1A955E] mb-6">Empréstimos</h1>

      <SearchBar
        value={busca}
        onChange={setBusca}
        placeholder="Buscar empréstimo..."
      />

      <div className="flex gap-4 mb-4">
        <AddSolicitanteButton />
        <AddEmprestimoButton />
      </div>

      <TableEmprestimo emprestimos={emprestimos} search={busca} />
    </>
  );
}
