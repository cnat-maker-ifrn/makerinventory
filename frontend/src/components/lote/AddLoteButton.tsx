import { useState } from "react";
import { MdAdd } from "react-icons/md";
import AddLoteModal from "../lote/AddLoteModal";

interface AddLoteButtonProps {
  onCreated?: () => void;
}

export default function AddLoteButton({ onCreated }: AddLoteButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    handleClose();
    onCreated?.();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#1A955E] text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-[#1A855E] transition cursor-pointer"
      >
        <MdAdd size={22} />
        Novo Lote
      </button>

      <AddLoteModal open={open} onClose={handleClose} onSuccess={handleSuccess} />
    </>
  );
}
