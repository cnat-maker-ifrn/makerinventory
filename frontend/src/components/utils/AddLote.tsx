import { MdAdd } from "react-icons/md";

export default function AddLote() {
    return(
        <>
            <button className="bg-[#29854A] text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-[#246f3f] transition cursor-pointer">
              <MdAdd size={22} />
              Novo Lote
            </button>
        </>
    )
}