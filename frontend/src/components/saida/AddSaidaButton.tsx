import { useState } from "react";
import AddSaidaModal from "./AddSaidaModal";

export default function AddSaidaButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="px-4 py-2 bg-[#29854A] text-white rounded-md hover:bg-[#246f3f]"
        onClick={() => setOpen(true)}
      >
        Registrar Saída
      </button>

      <AddSaidaModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
