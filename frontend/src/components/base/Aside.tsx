import { useState } from "react";

import {
    MdDashboard,
    MdInventory,
    MdExitToApp,
    MdAssignmentReturn,
    MdCompareArrows,
    MdArrowDropDown,
} from "react-icons/md";

import { NavLink } from "react-router-dom";

export default function Aside() {

    const [openProdutos, setOpenProdutos] = useState(false);

    const baseStyle =
        "p-8 flex items-center gap-4 cursor-pointer hover:bg-[#1A855E]";

    return (
        <aside className="w-[279px] min-h-screen bg-[#1A955E] rounded-md shadow-md">
            <nav>
                <ul className="text-white text-[25px]">

                    <NavLink to="/" end className={baseStyle}>
                        <MdDashboard size={28} />
                        Dashboard
                    </NavLink>

                    {/* Produtos + seta */}
                    <li className="relative">

                        <div className="flex items-center">

                            {/* Link principal */}
                            <NavLink
                                to="/produtos"
                                className={`${baseStyle} flex-1`}
                            >
                                <MdInventory size={28} />
                                Produtos
                            </NavLink>

                            {/* BOTÃO DA SETA */}
                            <button
                                onClick={() => setOpenProdutos(!openProdutos)}
                                className="w-10 h-10 flex items-center justify-center mr-6
                                hover:bg-[#1A855E] rounded-full transition-colors cursor-pointer"
                            >
                                <MdArrowDropDown
                                    size={32}
                                    className={`transition-transform duration-300 ${
                                        openProdutos ? "rotate-180" : "rotate-0"
                                    }`}
                                />
                            </button>
                        </div>

                        {/* DROPDOWN */}
                        {openProdutos && (
                            <ul className="text-[20px] bg-[#1A855E] overflow-hidden">

                                <NavLink
                                    to="/produtos/itens"
                                    className="block px-16 py-4 hover:bg-[#1A755E]"
                                >
                                    Itens
                                </NavLink>

                                <NavLink
                                    to="/produtos/lotes"
                                    className="block px-16 py-4 hover:bg-[#1A755E]"
                                >
                                    Lotes
                                </NavLink>

                            </ul>
                        )}
                    </li>

                    {/* Saídas */}
                    <NavLink to="/saidas" className={baseStyle}>
                        <MdExitToApp size={28} />
                        Saídas
                    </NavLink>

                    {/* Empréstimos */}
                    <NavLink to="/emprestimos" className={baseStyle}>
                        <MdAssignmentReturn size={28} />
                        Empréstimos
                    </NavLink>

                    {/* Movimentações */}
                    <NavLink to="/movimentacoes" className={baseStyle}>
                        <MdCompareArrows size={28} />
                        Movimentações
                    </NavLink>

                </ul>
            </nav>
        </aside>
    );
}
