import { MdFilterAlt } from "react-icons/md";

interface FiltroButtonProps {
  onClick?: () => void;
  label?: string;
}

export default function FiltroButton({ onClick, label = "Filtrar" }: FiltroButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#F5F5F5] rounded-md px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
    >
      <MdFilterAlt size={20} />
      <span>{label}</span>
    </button>
  );
}
