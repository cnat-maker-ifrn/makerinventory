import { useState } from "react";
import { MdFilterList, MdClose } from "react-icons/md";

interface Props {
  value: "todos" | "unitario" | "fracionado";
  onChange: (value: "todos" | "unitario" | "fracionado") => void;
}

export default function FilterTipoProduto({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  function handleSelect(v: Props["value"]) {
    onChange(v);
    setOpen(false);
  }

  function label() {
    if (value === "unitario") return "Unitários";
    if (value === "fracionado") return "Fracionados";
    return "Todos";
  }

  return (
    <>
      {/* Botão */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
      >
        <MdFilterList size={22} />
        <span>{label()}</span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-72 relative">

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h2 className="font-semibold">Filtrar produtos</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Opções */}
            <div className="flex flex-col p-4 gap-2">
              <button
                onClick={() => handleSelect("todos")}
                className={`px-3 py-2 rounded-md text-left ${
                  value === "todos"
                    ? "bg-[#1A955E] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Todos
              </button>

              <button
                onClick={() => handleSelect("unitario")}
                className={`px-3 py-2 rounded-md text-left ${
                  value === "unitario"
                    ? "bg-[#1A955E] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Unitários
              </button>

              <button
                onClick={() => handleSelect("fracionado")}
                className={`px-3 py-2 rounded-md text-left ${
                  value === "fracionado"
                    ? "bg-[#1A955E] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Fracionados
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
