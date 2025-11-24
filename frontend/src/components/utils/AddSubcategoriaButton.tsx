import { useState } from "react";
import { MdAdd } from "react-icons/md";
import AddSubcategoriaModal from "./AddSubcategoriaModal";

export default function AddSubcategoriaButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#29854A] text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-[#246f3f] transition cursor-pointer"
      >
        <MdAdd size={22} />
        Nova Subcategoria
      </button>

      <AddSubcategoriaModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
