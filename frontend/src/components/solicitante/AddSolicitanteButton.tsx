import { useState } from "react";
import AddSolicitanteModal from "./AddSolicitanteModal";

export default function AddSolicitanteButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
        onClick={() => setOpen(true)}
      >
        Adicionar Solicitante
      </button>

      <AddSolicitanteModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
