import { useState } from "react";
import { MdAdd } from "react-icons/md";
import AddProdutoModal from "./AddProdutoModal";

export default function AddProdutoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#1A955E] text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-[#1A855E] transition cursor-pointer"
      >
        <MdAdd size={22} />
        Novo Produto
      </button>

      <AddProdutoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
