import { useState } from "react";
import { MdAdd } from "react-icons/md";
import AddSubcategoriaModal from "./AddSubcategoriaModal";

export default function AddSubcategoriaButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#1A955E] text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-[#1A855E] transition cursor-pointer"
      >
        <MdAdd size={22} />
        Nova Subcategoria
      </button>

      <AddSubcategoriaModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
