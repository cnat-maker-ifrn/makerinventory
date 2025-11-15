import {
    MdDashboard,
    MdInventory,
    MdExitToApp,
    MdAssignmentReturn,
    MdCompareArrows
} from "react-icons/md";

import { NavLink } from "react-router-dom";

export default function Aside() {
    return (
        <aside className="w-[279px] h-screen bg-[#29854A] rounded-md shadow-md">
            <nav>
                <ul className="text-white text-[25px]">

                    <NavLink 
                        to="/" 
                        end
                        className="p-8 flex items-center gap-4 cursor-pointer hover:bg-[#246f3f]"
                    >
                        <MdDashboard size={28} />
                        Dashboard
                    </NavLink>

                    <NavLink 
                        to="/produtos"
                        className="p-8 flex items-center gap-4 cursor-pointer hover:bg-[#246f3f]"
                    >
                        <MdInventory size={28} />
                        Produtos
                    </NavLink>

                    <NavLink 
                        to="/saidas"
                        className="p-8 flex items-center gap-4 cursor-pointer hover:bg-[#246f3f]"
                    >
                        <MdExitToApp size={28} />
                        Saídas
                    </NavLink>

                    <NavLink 
                        to="/emprestimos"
                        className="p-8 flex items-center gap-4 cursor-pointer hover:bg-[#246f3f]"
                    >
                        <MdAssignmentReturn size={28} />
                        Empréstimos
                    </NavLink>

                    <NavLink 
                        to="/movimentacoes"
                        className="p-8 flex items-center gap-4 cursor-pointer hover:bg-[#246f3f]"
                    >
                        <MdCompareArrows size={28} />
                        Movimentações
                    </NavLink>

                </ul>
            </nav>
        </aside>
    );
}
