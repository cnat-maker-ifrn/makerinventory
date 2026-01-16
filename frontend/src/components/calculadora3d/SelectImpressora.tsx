import { useState } from "react";
import type { Impressora } from "../../types/calculadora3d";
import { MdArrowDropDown } from "react-icons/md";

interface SelectImpressoraProps {
    impressoras: Impressora[];
    selecionada: Impressora;
    onChange: (impressora: Impressora) => void;
}

export default function SelectImpressora({
    impressoras,
    selecionada,
    onChange,
}: SelectImpressoraProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white hover:border-gray-400 transition-colors flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    <span className="text-gray-800">{selecionada.nome}</span>
                </div>
                <MdArrowDropDown
                    size={24}
                    className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 border border-gray-300 rounded-lg bg-white shadow-lg z-10 max-h-80 overflow-y-auto">
                    {impressoras.map((imp) => (
                        <button
                            key={imp.id}
                            onClick={() => {
                                onChange(imp);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-teal-50 border-b border-gray-100 last:border-b-0 transition-colors ${selecionada.id === imp.id ? "bg-teal-50" : ""
                                }`}
                        >

                            <div className="flex-1 text-left">
                                <p className="font-medium text-gray-800">{imp.nome}</p>
                                <p className="text-sm text-gray-600">
                                    R$ {imp.precoCompra.toLocaleString("pt-BR")} | {imp.consumoWatts}W
                                </p>
                            </div>
                            {selecionada.id === imp.id && (
                                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
