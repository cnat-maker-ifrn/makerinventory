import { useState } from "react";
import { MdAdd } from "react-icons/md";
import AddLoteModal from "./AddLoteModal";

export default function AddLoteButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#29854A] text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-[#246f3f] transition cursor-pointer"
      >
        <MdAdd size={22} />
        Novo Lote
      </button>

      <AddLoteModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
